# Teacher Permissions - RESTRICTED

## ✅ What Teachers CAN Do

### 1. View Words
- Browse the word library
- Search and filter words
- View word details

**Endpoints:**
- `GET /api/words` - View all words (read-only)
- `GET /api/words/:id` - View single word (read-only)

### 2. Submit Word Suggestions
- Request to add new words
- Submit word with all details
- Wait for admin approval

**Endpoints:**
- `POST /api/teachers/suggestions` - Submit new word suggestion

**Example:**
```json
POST /api/teachers/suggestions
{
  "word": "வானம்",
  "meaning_ta": "விண்",
  "meaning_en": "Sky",
  "level": 1,
  "domain": "Nature",
  "period": "Ancient",
  "notes": "Common Tamil word"
}
```

### 3. Manage Own Suggestions
- View status of submitted suggestions (pending/approved/rejected)
- Edit pending suggestions
- Delete pending suggestions
- Cannot modify approved or rejected suggestions

**Endpoints:**
- `GET /api/teachers/suggestions` - View all own suggestions
- `GET /api/teachers/suggestions?status=pending` - Filter by status
- `GET /api/teachers/suggestions/stats` - Get statistics
- `PUT /api/teachers/suggestions/:id` - Edit pending suggestion
- `DELETE /api/teachers/suggestions/:id` - Delete pending suggestion

### 4. View Student Progress
- See student game sessions
- View student statistics
- Monitor student performance

## ❌ What Teachers CANNOT Do

### Direct Word Database Access
Teachers **CANNOT**:
- ❌ Add words directly to the database
- ❌ Edit existing words in the database
- ❌ Delete words from the database
- ❌ Modify word attributes (level, domain, etc.)

### System Management
Teachers **CANNOT**:
- ❌ View all users
- ❌ Change user roles
- ❌ Delete users
- ❌ Access system statistics
- ❌ Approve/reject other teachers' suggestions
- ❌ View admin dashboard

## 🔒 Permission Flow

```
┌──────────────────────────────────────────────────────┐
│                   TEACHER ACTIONS                     │
└──────────────────────────────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              ↓                       ↓
      ┌───────────────┐       ┌──────────────┐
      │  View Words   │       │ Submit Word  │
      │  (Read-Only)  │       │ Suggestion   │
      └───────────────┘       └──────────────┘
              ↓                       ↓
      ┌───────────────┐       ┌──────────────┐
      │ /api/words    │       │ /api/teachers│
      │ GET only      │       │ /suggestions │
      └───────────────┘       └──────────────┘
                                      ↓
                              ┌──────────────┐
                              │   Status:    │
                              │   PENDING    │
                              └──────────────┘
                                      ↓
                              ┌──────────────┐
                              │ Admin Review │
                              └──────────────┘
                                      │
                        ┌─────────────┴─────────────┐
                        ↓                           ↓
                  ┌──────────┐              ┌──────────┐
                  │ APPROVED │              │ REJECTED │
                  └──────────┘              └──────────┘
                        ↓                           ↓
              ┌──────────────────┐        ┌──────────────┐
              │ Word Added to DB │        │ Reason Given │
              │ Available in     │        │ Can Resubmit │
              │ Games            │        └──────────────┘
              └──────────────────┘
```

## 📊 API Endpoint Comparison

### /api/words (Read-Only for All)
| Method | Endpoint | Teacher | Student | Admin |
|--------|----------|---------|---------|-------|
| GET    | /words   | ✅ View  | ✅ View  | ✅ View |
| GET    | /words/:id | ✅ View | ✅ View | ✅ View |
| POST   | /words   | ❌      | ❌      | ❌     |
| PUT    | /words/:id | ❌    | ❌      | ❌     |
| DELETE | /words/:id | ❌    | ❌      | ❌     |

### /api/admin/words (Admin ONLY)
| Method | Endpoint | Teacher | Student | Admin |
|--------|----------|---------|---------|-------|
| GET    | /admin/words | ❌  | ❌      | ✅     |
| POST   | /admin/words | ❌  | ❌      | ✅     |
| PUT    | /admin/words/:id | ❌ | ❌   | ✅     |
| DELETE | /admin/words/:id | ❌ | ❌   | ✅     |

### /api/teachers/suggestions (Teacher Only)
| Method | Endpoint | Teacher | Student | Admin |
|--------|----------|---------|---------|-------|
| GET    | /suggestions | ✅    | ❌      | ✅*    |
| POST   | /suggestions | ✅    | ❌      | ✅     |
| PUT    | /suggestions/:id | ✅ | ❌    | ❌     |
| DELETE | /suggestions/:id | ✅ | ❌    | ❌     |

*Admin uses `/api/admin/suggestions` to see ALL suggestions

## 🛡️ Security Implementation

### Middleware Protection
```javascript
// Words routes - READ ONLY for all authenticated users
router.get('/', authenticateToken, async (req, res) => { ... });

// Teachers routes - Only authenticated teachers
router.post('/suggestions', authenticateToken, authorizeRoles('teacher'), ...);

// Admin routes - Only authenticated admins
router.post('/words', authenticateToken, authorizeRoles('admin'), ...);
```

### Ownership Checks
Teachers can only modify their OWN suggestions:
```javascript
if (suggestion.suggestedBy.toString() !== req.user.id) {
  return res.status(403).json({ error: 'Not authorized' });
}
```

### Status Checks
Teachers can only modify PENDING suggestions:
```javascript
if (suggestion.status !== 'pending') {
  return res.status(400).json({ error: 'Can only edit pending suggestions' });
}
```

## 📝 Teacher Workflow Example

### Step 1: Teacher Wants to Add a Word
```javascript
// Teacher submits suggestion
POST /api/teachers/suggestions
Authorization: Bearer <teacher_token>
{
  "word": "கடல்",
  "meaning_ta": "பெரிய நீர்நிலை",
  "meaning_en": "Ocean",
  "level": 1,
  "domain": "Nature"
}

// Response
{
  "message": "Word suggestion submitted. Waiting for admin approval.",
  "suggestion": {
    "_id": "...",
    "word": "கடல்",
    "status": "pending",
    ...
  }
}
```

### Step 2: Teacher Checks Status
```javascript
GET /api/teachers/suggestions
Authorization: Bearer <teacher_token>

// Response shows all their suggestions
{
  "suggestions": [
    {
      "_id": "...",
      "word": "கடல்",
      "status": "pending",  // Still waiting
      "createdAt": "2025-10-07T..."
    }
  ]
}
```

### Step 3: Teacher Tries to Add Directly (BLOCKED)
```javascript
POST /api/words
Authorization: Bearer <teacher_token>
{
  "word": "மலை",
  "meaning_ta": "பெரிய குன்று"
}

// Response: 404 Not Found
// This endpoint doesn't exist for direct word addition!
```

### Step 4: Admin Approves
```javascript
// Admin approves the suggestion
POST /api/admin/suggestions/:suggestionId/approve
Authorization: Bearer <admin_token>

// Word is now added to database
// Teacher can see status changed to "approved"
```

## 🎯 Key Differences from Old System

### OLD System (WRONG ❌)
- Teachers could add words directly
- Teachers could edit/delete any word
- No approval workflow
- No tracking of who added words

### NEW System (CORRECT ✅)
- Teachers submit suggestions only
- Admin approves/rejects suggestions
- Full audit trail (who suggested, who approved, when)
- Pending suggestions can be edited by teacher
- Approved suggestions become permanent words

## 🔍 Checking Your Permissions

### As a Teacher, Test These:
```bash
# ✅ SHOULD WORK
GET /api/words
GET /api/teachers/suggestions
POST /api/teachers/suggestions

# ❌ SHOULD FAIL (403 Forbidden or 404 Not Found)
POST /api/words
PUT /api/words/:id
DELETE /api/words/:id
POST /api/admin/words
GET /api/admin/users
```

## 📚 Summary

**Teachers are CONTRIBUTORS, not ADMINISTRATORS.**

- They suggest words for the learning platform
- Admin reviews and approves quality content
- This ensures word quality and prevents unauthorized changes
- Teachers get credit for approved suggestions
- System maintains data integrity
