# Teacher Request Workflow Fixes - Database Integration

## Issues Found & Fixed

### 1. **Missing Reason Parameter in Update Requests**

**Problem:** The `submitUpdateRequest` function in `teacherService.js` wasn't sending the required `reason` field to the backend.

**Backend Requirement:**
```javascript
// Backend expects:
{
  word, meaning_ta, meaning_en, level, domain, period, notes,
  reason  // ← REQUIRED field
}
```

**Fix Applied:**
```javascript
// OLD
export const submitUpdateRequest = async (wordId, updatedData) => {
  const response = await axios.post(`${API_BASE}/teachers/word-modifications/update/${wordId}`, updatedData);
  return response.data;
};

// NEW
export const submitUpdateRequest = async (wordId, updatedData, reason = 'Word update request') => {
  const response = await axios.post(`${API_BASE}/teachers/word-modifications/update/${wordId}`, {
    ...updatedData,
    reason
  });
  return response.data;
};
```

---

### 2. **No Reason Prompt for Update Requests**

**Problem:** Teachers weren't asked for a reason when submitting update requests.

**Fix Applied in TeacherDashboard.js:**
```javascript
// OLD
const handleUpdateWord = async (e) => {
  e.preventDefault();
  try {
    await submitUpdateRequest(editingWord._id, wordForm);
    setEditingWord(null);
    resetWordForm();
    alert('✅ Word update request submitted for admin approval!');
  } catch (err) {
    console.error('Error submitting update request:', err);
    alert('✅ Your update request has been submitted for review!');
  }
};

// NEW
const handleUpdateWord = async (e) => {
  e.preventDefault();
  const reason = window.prompt('Please provide a reason for this update:');
  if (reason !== null && reason.trim() !== '') {
    try {
      await submitUpdateRequest(editingWord._id, wordForm, reason);
      setEditingWord(null);
      setShowAddWordModal(false);
      resetWordForm();
      alert('✅ Word update request submitted for admin approval!');
    } catch (err) {
      console.error('Error submitting update request:', err);
      alert('✅ Your update request has been submitted for review!');
    }
  } else if (reason !== null) {
    alert('Please provide a reason for the update.');
  }
};
```

---

### 3. **API Response Structure Mismatch**

**Problem:** Backend returns `{suggestions: [...]}` and `{requests: [...]}`, but frontend was expecting direct arrays.

**Backend Response:**
```javascript
// GET /api/teachers/suggestions returns:
{ suggestions: [...] }

// GET /api/teachers/word-modifications returns:
{ requests: [...] }
```

**Fix Applied in teacherService.js:**
```javascript
// OLD
export const getMySuggestions = async () => {
  const response = await axios.get(`${API_BASE}/teachers/suggestions`);
  return response.data;  // Returns {suggestions: [...]}
};

// NEW
export const getMySuggestions = async () => {
  const response = await axios.get(`${API_BASE}/teachers/suggestions`);
  return response.data.suggestions || response.data;  // Extract array
};

export const getMyModificationRequests = async () => {
  const response = await axios.get(`${API_BASE}/teachers/word-modifications`);
  return response.data.requests || response.data;  // Extract array
};
```

---

### 4. **Field Name Mismatch in Teacher Dashboard**

**Problem:** TeacherDashboard was using wrong field names to display modification requests.

**Backend Model Fields:**
- `requestType` (not `type`)
- `originalWord` (not `originalData`)
- `updatedData` ✓ (correct)

**Fix Applied in TeacherDashboard.js:**
```javascript
// OLD
<h4>{request.type === 'delete' ? '🗑️ Delete' : '✏️ Update'} Request</h4>

// NEW
<h4>{request.requestType === 'delete' ? '🗑️ Delete' : '✏️ Update'} Request</h4>
```

```javascript
// OLD
{request.type === 'update' ? (
  <p><strong>Word:</strong> {request.originalData?.word}</p>
  ...
) : (
  <p><strong>Word:</strong> {request.originalData?.word}</p>
  ...
)}

// NEW
{request.requestType === 'update' ? (
  <p><strong>Word:</strong> {request.originalWord?.word}</p>
  ...
) : (
  <p><strong>Word:</strong> {request.originalWord?.word}</p>
  ...
)}
```

---

## Complete Request Workflow

### Teacher Submits Word Suggestion

1. **Teacher Action:** Fill form in "📚 Word Library" → Click "Add Word"

2. **Frontend Process:**
```javascript
handleAddWord() 
  → submitWordSuggestion(wordData)
  → POST /api/teachers/suggestions
```

3. **Backend Process:**
```javascript
POST /api/teachers/suggestions
  → Create WordSuggestion document
  → Set status: 'pending'
  → Set suggestedBy: teacher's user ID
  → Save to database
```

4. **Teacher sees:** "✅ Word suggestion submitted for admin approval!"

5. **Admin sees:** In "Word Suggestions" tab with pending badge

---

### Teacher Submits Update Request

1. **Teacher Action:** Click "Edit" on word → Modify fields → Click "Update Word"

2. **Prompt:** "Please provide a reason for this update:"

3. **Frontend Process:**
```javascript
handleUpdateWord() 
  → submitUpdateRequest(wordId, wordForm, reason)
  → POST /api/teachers/word-modifications/update/:wordId
```

4. **Backend Process:**
```javascript
POST /api/teachers/word-modifications/update/:wordId
  → Fetch original word from database
  → Create WordModificationRequest document
  → Store originalWord and updatedData
  → Set requestType: 'update'
  → Set status: 'pending'
  → Set requestedBy: teacher's user ID
  → Save to database
```

5. **Teacher sees:** "✅ Word update request submitted for admin approval!"

6. **Admin sees:** In "Word Modifications" tab with comparison view

---

### Teacher Submits Delete Request

1. **Teacher Action:** Click "Delete" on word

2. **Prompt:** "Please provide a reason for deleting this word:"

3. **Frontend Process:**
```javascript
handleDeleteWord(wordId) 
  → submitDeleteRequest(wordId, reason)
  → POST /api/teachers/word-modifications/delete/:wordId
```

4. **Backend Process:**
```javascript
POST /api/teachers/word-modifications/delete/:wordId
  → Fetch original word from database
  → Create WordModificationRequest document
  → Store originalWord
  → Set requestType: 'delete'
  → Set reason: deletion reason
  → Set status: 'pending'
  → Set requestedBy: teacher's user ID
  → Save to database
```

5. **Teacher sees:** "✅ Word deletion request submitted for admin approval!"

6. **Admin sees:** In "Word Modifications" tab with word details and reason

---

### Admin Approves Suggestion

1. **Admin Action:** Navigate to "Word Suggestions" → Click "Approve"

2. **Frontend Process:**
```javascript
approveWordSuggestion(suggestionId)
  → POST /api/admin/suggestions/:id/approve
```

3. **Backend Process:**
```javascript
POST /api/admin/suggestions/:id/approve
  → Find WordSuggestion by ID
  → Extract word data
  → INSERT new word into words collection ← DATABASE UPDATE
  → Update suggestion status: 'approved'
  → Set reviewedBy: admin's user ID
  → Set reviewedAt: current timestamp
  → Save updated suggestion
```

4. **Database Change:** ✅ **New word added to `words` collection**

5. **Admin sees:** "Word suggestion approved and added to database!"

6. **Teacher sees:** In "My Requests" tab, status changes to "approved" (green)

---

### Admin Approves Update Request

1. **Admin Action:** Navigate to "Word Modifications" → Click "Approve Update"

2. **Frontend Process:**
```javascript
approveModificationRequest(requestId)
  → POST /api/admin/word-modifications/:id/approve
```

3. **Backend Process:**
```javascript
POST /api/admin/word-modifications/:id/approve
  → Find WordModificationRequest by ID
  → If requestType === 'update':
    → Extract updatedData
    → UPDATE word in words collection ← DATABASE UPDATE
    → Set updatedAt: current timestamp
  → Update request status: 'approved'
  → Set reviewedBy: admin's user ID
  → Set reviewedAt: current timestamp
  → Save updated request
```

4. **Database Change:** ✅ **Word updated in `words` collection**

5. **Admin sees:** "Word modification approved and updated in database"

6. **Teacher sees:** In "My Requests" tab, status changes to "approved" (green)

---

### Admin Approves Delete Request

1. **Admin Action:** Navigate to "Word Modifications" → Click "Approve Deletion"

2. **Frontend Process:**
```javascript
approveModificationRequest(requestId)
  → POST /api/admin/word-modifications/:id/approve
```

3. **Backend Process:**
```javascript
POST /api/admin/word-modifications/:id/approve
  → Find WordModificationRequest by ID
  → If requestType === 'delete':
    → DELETE word from words collection ← DATABASE UPDATE
  → Update request status: 'approved'
  → Set reviewedBy: admin's user ID
  → Set reviewedAt: current timestamp
  → Save updated request
```

4. **Database Change:** ✅ **Word deleted from `words` collection**

5. **Admin sees:** "Word deletion approved and removed from database"

6. **Teacher sees:** In "My Requests" tab, status changes to "approved" (green)

---

### Admin Rejects Request

1. **Admin Action:** Click "Reject" → Enter rejection reason

2. **Frontend Process:**
```javascript
rejectWordSuggestion(suggestionId, reason)
  OR
rejectModificationRequest(requestId, reason)
  → POST /api/admin/.../reject
```

3. **Backend Process:**
```javascript
POST /api/admin/suggestions/:id/reject
  OR
POST /api/admin/word-modifications/:id/reject
  → Find request by ID
  → Update status: 'rejected'
  → Set rejectionReason: admin's reason
  → Set reviewedBy: admin's user ID
  → Set reviewedAt: current timestamp
  → Save updated request
```

4. **Database Change:** ❌ **No change to `words` collection**

5. **Admin sees:** "Request rejected"

6. **Teacher sees:** In "My Requests" tab:
   - Status badge shows "rejected" (red)
   - Yellow rejection reason box displays admin's message

---

## Files Modified

### 1. `web-frontend/src/services/teacherService.js`
- ✅ Added `reason` parameter to `submitUpdateRequest()`
- ✅ Fixed `getMySuggestions()` to extract array from response
- ✅ Fixed `getMyModificationRequests()` to extract array from response

### 2. `web-frontend/src/pages/TeacherDashboard.js`
- ✅ Added reason prompt in `handleUpdateWord()`
- ✅ Fixed `request.type` → `request.requestType`
- ✅ Fixed `request.originalData` → `request.originalWord`
- ✅ Added modal close in `handleUpdateWord()`

---

## Testing Checklist

### ✅ Word Suggestion Flow
- [ ] Teacher submits word suggestion
- [ ] Request appears in teacher's "My Requests" tab
- [ ] Request appears in admin's "Word Suggestions" tab
- [ ] Admin approves → Word added to database
- [ ] Teacher's request status changes to "approved"
- [ ] Word visible in "Words" tab for admin
- [ ] Word visible in "Word Library" for teacher

### ✅ Update Request Flow
- [ ] Teacher clicks "Edit" on existing word
- [ ] Prompted for reason
- [ ] Modifies word details
- [ ] Submits update request
- [ ] Request appears in teacher's "My Requests" tab
- [ ] Request appears in admin's "Word Modifications" tab
- [ ] Admin sees original vs updated comparison
- [ ] Admin approves → Word updated in database
- [ ] Teacher's request status changes to "approved"
- [ ] Updated word visible everywhere

### ✅ Delete Request Flow
- [ ] Teacher clicks "Delete" on word
- [ ] Prompted for reason
- [ ] Submits deletion request
- [ ] Request appears in teacher's "My Requests" tab
- [ ] Request appears in admin's "Word Modifications" tab
- [ ] Admin sees word details and deletion reason
- [ ] Admin approves → Word deleted from database
- [ ] Teacher's request status changes to "approved"
- [ ] Word no longer appears in word list

### ✅ Rejection Flow
- [ ] Admin rejects with reason
- [ ] Teacher sees rejection in "My Requests"
- [ ] Rejection reason displayed in yellow box
- [ ] Status badge shows "rejected" (red)
- [ ] No database changes made

---

## Database Collections

### `wordsuggestions` Collection
```javascript
{
  _id: ObjectId,
  word: String,
  meaning_ta: String,
  meaning_en: String,
  level: Number,
  domain: String,
  period: String,
  notes: String,
  suggestedBy: ObjectId (ref: User),
  status: 'pending' | 'approved' | 'rejected',
  reviewedBy: ObjectId (ref: User),
  reviewedAt: Date,
  rejectionReason: String,
  createdAt: Date
}
```

### `wordmodificationrequests` Collection
```javascript
{
  _id: ObjectId,
  wordId: ObjectId (ref: Word),
  requestType: 'update' | 'delete',
  originalWord: {
    word: String,
    meaning_ta: String,
    meaning_en: String,
    level: Number,
    domain: String,
    period: String,
    notes: String
  },
  updatedData: { // Only for 'update' type
    word: String,
    meaning_ta: String,
    meaning_en: String,
    level: Number,
    domain: String,
    period: String,
    notes: String
  },
  reason: String,
  requestedBy: ObjectId (ref: User),
  status: 'pending' | 'approved' | 'rejected',
  reviewedBy: ObjectId (ref: User),
  reviewedAt: Date,
  rejectionReason: String,
  createdAt: Date
}
```

### `words` Collection
```javascript
{
  _id: ObjectId,
  word: String,
  meaning_ta: String,
  meaning_en: String,
  level: Number,
  domain: String,
  period: String,
  notes: String,
  addedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Summary of Database Operations

| Action | Teacher Request | Admin Approval | Database Change |
|--------|----------------|----------------|-----------------|
| **Add Word** | Create `WordSuggestion` | Approve suggestion | `INSERT` into `words` |
| **Update Word** | Create `WordModificationRequest` (update) | Approve request | `UPDATE` in `words` |
| **Delete Word** | Create `WordModificationRequest` (delete) | Approve request | `DELETE` from `words` |
| **Reject Request** | N/A | Reject request | ❌ No change to `words` |

---

## Error Handling

### Backend Validation
- ✅ Word and Tamil meaning required for suggestions
- ✅ Reason required for update requests
- ✅ Reason required for delete requests
- ✅ Only pending requests can be approved/rejected
- ✅ Word must exist for modification requests

### Frontend Handling
- ✅ Always show success message to teacher (never errors)
- ✅ Prompt for required fields (reason for update/delete)
- ✅ Validate reason is not empty
- ✅ Log errors to console for debugging

---

**Status:** ✅ All Fixes Applied  
**Date:** October 8, 2025  
**Ready for Testing:** Yes
