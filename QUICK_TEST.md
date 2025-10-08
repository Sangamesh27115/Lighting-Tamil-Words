# Quick Test Guide - Fixed Request Workflow

## 🚀 Start the Application

### Terminal 1: MongoDB
```powershell
mongod
```

### Terminal 2: Backend
```powershell
cd backend
npm start
```

### Terminal 3: Frontend
```powershell
cd web-frontend
npm start
```

---

## 🧪 Test Scenario: Complete Request Flow

### Step 1: Teacher Submits Word Suggestion

1. **Login as Teacher**
   - Navigate to http://localhost:3000/login
   - Email: teacher@example.com
   - Password: (your password)

2. **Add New Word**
   - Click "📚 Word Library" tab
   - Click "➕ Add New Word" button
   - Fill form:
     ```
     Word: செம்மல்
     Tamil Meaning: சிறந்தவர்
     English Meaning: Excellent person
     Level: 2
     Domain: Character
     Period: Ancient
     Notes: Test word for workflow
     ```
   - Click "Add Word"

3. **✅ Expected Result:**
   - Alert: "✅ Word suggestion submitted for admin approval!"
   - Modal closes

4. **Check "My Requests" Tab**
   - Click "📝 My Requests"
   - See new suggestion card
   - Status badge: **pending** (yellow)
   - All word details visible

---

### Step 2: Admin Approves Suggestion

1. **Logout and Login as Admin**
   - Email: admin@example.com
   - Password: (your password)

2. **View Pending Suggestions**
   - Navigate to Admin Dashboard
   - See "Word Suggestions" tab with badge (1)
   - Click "Word Suggestions" tab

3. **Approve the Suggestion**
   - See table with pending suggestion
   - Word: செம்மல்
   - Teacher: (teacher's username)
   - Click "Approve" button

4. **✅ Expected Result:**
   - Success message: "Word suggestion approved and added to database!"
   - Suggestion disappears from pending list
   - Badge count decreases

5. **Verify in Database**
   - Click "Words" tab
   - See செம்மல் in the words list
   - **✅ WORD ADDED TO DATABASE**

---

### Step 3: Teacher Sees Approved Status

1. **Login as Teacher Again**

2. **Check "My Requests" Tab**
   - Click "📝 My Requests"
   - Find செம்மல் suggestion
   - Status badge: **approved** (green)
   - See reviewed date

---

### Step 4: Teacher Submits Update Request

1. **Edit Existing Word**
   - Go to "📚 Word Library"
   - Find செம்மல் (or any word)
   - Click "Edit" button

2. **Modify Word**
   - Change English Meaning to: "Outstanding leader"
   - Change Level to: 3

3. **Prompted for Reason**
   - Enter: "Improved translation accuracy"
   - Click OK

4. **Submit Update**
   - Click "Update Word"

5. **✅ Expected Result:**
   - Alert: "✅ Word update request submitted for admin approval!"
   - Modal closes

6. **Check "My Requests" Tab**
   - See update request card
   - Type: **✏️ Update Request**
   - Status: **pending** (yellow)
   - Comparison grid shows:
     - Original: "Excellent person" | Level 2
     - Updated: "Outstanding leader" | Level 3
   - Reason: "Improved translation accuracy"

---

### Step 5: Admin Approves Update

1. **Login as Admin**

2. **View Modification Requests**
   - See "Word Modifications" tab with badge
   - Click "Word Modifications"

3. **Review Update Request**
   - See modification card
   - Badge: **UPDATE**
   - Requested by: (teacher's username)
   - Reason: "Improved translation accuracy"
   - Comparison:
     - Original → Proposed Update
     - Side-by-side view

4. **Approve Update**
   - Click "Approve Update" button

5. **✅ Expected Result:**
   - Success message: "Modification request approved!"
   - Request disappears
   - **✅ WORD UPDATED IN DATABASE**

6. **Verify Update**
   - Click "Words" tab
   - Find செம்மல்
   - English meaning: "Outstanding leader"
   - Level: 3

---

### Step 6: Teacher Submits Delete Request

1. **Login as Teacher**

2. **Delete Word**
   - Go to "📚 Word Library"
   - Find செம்மல் (or test word)
   - Click "Delete" button

3. **Prompted for Reason**
   - Enter: "Duplicate word exists"
   - Click OK

4. **✅ Expected Result:**
   - Alert: "✅ Word deletion request submitted for admin approval!"

5. **Check "My Requests" Tab**
   - See delete request card
   - Type: **🗑️ Delete Request**
   - Status: **pending** (yellow)
   - Shows word details
   - Reason: "Duplicate word exists"

---

### Step 7: Admin Approves Delete

1. **Login as Admin**

2. **View Modification Requests**
   - Click "Word Modifications" tab

3. **Review Delete Request**
   - Badge: **DELETE**
   - See word details
   - Reason: "Duplicate word exists"

4. **Approve Deletion**
   - Click "Approve Deletion" button

5. **✅ Expected Result:**
   - Success message: "Word deletion approved and removed from database"
   - Request disappears
   - **✅ WORD DELETED FROM DATABASE**

6. **Verify Deletion**
   - Click "Words" tab
   - செம்மல் no longer in list

---

### Step 8: Test Rejection

1. **Teacher Submits Another Suggestion**
   - Add word: கதம்பு
   - Tamil: மரத்தின் பெயர்
   - English: Name of a tree

2. **Admin Rejects**
   - Go to "Word Suggestions"
   - Click "Reject"
   - Enter reason: "Please provide more specific details about the tree species"
   - Click OK

3. **✅ Expected Result:**
   - Success: "Word suggestion rejected"
   - Suggestion disappears

4. **Teacher Checks Status**
   - Login as teacher
   - Go to "📝 My Requests"
   - Find கதம்பு suggestion
   - Status: **rejected** (red)
   - Yellow rejection box shows: "Please provide more specific details about the tree species"

---

## ✅ Verification Points

### Database Integration
- [ ] Approved suggestions → New words in database
- [ ] Approved updates → Words modified in database
- [ ] Approved deletes → Words removed from database
- [ ] Rejected requests → No database changes

### Teacher Experience
- [ ] No errors shown (only success messages)
- [ ] All requests tracked in "My Requests"
- [ ] Status badges correct (pending/approved/rejected)
- [ ] Rejection reasons visible
- [ ] Comparison view for updates

### Admin Experience
- [ ] Badge counts on tabs
- [ ] All requests visible
- [ ] Comparison view for updates
- [ ] Word details for deletes
- [ ] Approve/Reject buttons work

---

## 🐛 Troubleshooting

### "Failed to fetch"
**Solution:** Check backend is running on port 5000
```powershell
cd backend
npm start
```

### "Unauthorized"
**Solution:** Login again (token expired)

### Requests not showing
**Solution:** Refresh page or switch tabs

### Database not updating
**Solution:** 
1. Check MongoDB is running: `mongod`
2. Check backend console for errors
3. Verify admin clicked "Approve" not "Reject"

---

## 📊 Success Criteria

All of these should work:
- ✅ Teacher submits suggestion → Admin sees it
- ✅ Admin approves → Word added to database
- ✅ Teacher submits update → Admin sees original vs updated
- ✅ Admin approves → Word updated in database  
- ✅ Teacher submits delete → Admin sees word and reason
- ✅ Admin approves → Word deleted from database
- ✅ Admin rejects → Reason shown to teacher
- ✅ All statuses update correctly
- ✅ No errors shown to teachers

---

**Time Required:** 10-15 minutes for complete flow  
**Status:** Ready to Test  
**Last Updated:** October 8, 2025
