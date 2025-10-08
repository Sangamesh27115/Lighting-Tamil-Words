# Admin System & Word Approval Workflow

## Overview
This document describes the admin system, permissions, and word approval workflow for the Tamil Words Learning Application.

## Admin Credentials

### Default Admin Account
```
Email:    admin@tamilwords.com
Password: Admin@123Tamil
Username: superadmin
```

**⚠️ IMPORTANT:** Change the password immediately after first login!

## Creating the Admin Account

Run this command in the backend directory:
```bash
npm run seed:admin
```

This will create the admin account in the database. If the admin already exists, it will display the existing credentials.

## User Roles & Permissions

### 1. **Student** (`role: 'student'`)
- Play games
- View own statistics
- View leaderboard
- Browse word library
- **Cannot** add words or suggestions

### 2. **Teacher** (`role: 'teacher'`)
- All student permissions
- Submit word suggestions (requests to add words)
- View own submitted suggestions and their status
- Edit/delete pending suggestions
- View student progress
- **Cannot** directly add words to database
- **Cannot** view all users or manage system

### 3. **Admin** (`role: 'admin'`)
- **Full system access**
- View all users (students, teachers, admins)
- Modify user roles and details
- Delete users
- View all words in database
- Add/edit/delete words directly
- **Approve or reject** word suggestions from teachers
- View all game sessions
- Access system statistics and analytics
- Manage entire application

## Word Approval Workflow

### Step 1: Teacher Submits Suggestion
```
Teacher → Submit Word → Database (status: 'pending')
```

**API Endpoint:** `POST /api/teachers/suggestions`
```json
{
  "word": "தமிழ்",
  "meaning_ta": "இனிமையான மொழி",
  "meaning_en": "Sweet language",
  "level": 1,
  "domain": "Language",
  "period": "Ancient",
  "notes": "Classical language"
}
```

### Step 2: Admin Reviews Suggestion
Admin can see all pending suggestions in the admin dashboard.

**API Endpoint:** `GET /api/admin/suggestions?status=pending`

### Step 3: Admin Takes Action

#### Option A: Approve
```
Admin → Approve → Word added to database + Suggestion marked 'approved'
```

**API Endpoint:** `POST /api/admin/suggestions/:suggestionId/approve`

Result:
- Word is added to `words` collection
- Suggestion status changes to `'approved'`
- `reviewedBy` field set to admin ID
- `reviewedAt` timestamp recorded

#### Option B: Reject
```
Admin → Reject (with reason) → Suggestion marked 'rejected'
```

**API Endpoint:** `POST /api/admin/suggestions/:suggestionId/reject`
```json
{
  "reason": "Word already exists in database"
}
```

## Database Schema

### WordSuggestion Model
```javascript
{
  word: String (required),
  meaning_ta: String (required),
  meaning_en: String,
  level: Number (default: 1),
  domain: String,
  period: String,
  notes: String,
  suggestedBy: ObjectId (ref: 'User'),
  status: 'pending' | 'approved' | 'rejected' (default: 'pending'),
  reviewedBy: ObjectId (ref: 'User'),
  reviewedAt: Date,
  rejectionReason: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### User Model (Updated)
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: 'student' | 'teacher' | 'admin' (required),
  points: Number (default: 0),
  rewards: Number (default: 0),
  level: Number (default: 1),
  fullName: String,
  avatar_url: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## API Endpoints

### Admin Endpoints (require `role: 'admin'`)

#### User Management
- `GET /api/admin/users` - Get all users with pagination
- `PUT /api/admin/users/:userId` - Update user details/role
- `DELETE /api/admin/users/:userId` - Delete user

#### Word Management
- `GET /api/admin/words` - Get all words with filters and pagination

#### Suggestion Management
- `GET /api/admin/suggestions` - Get all suggestions (pending/approved/rejected)
- `POST /api/admin/suggestions/:suggestionId/approve` - Approve suggestion
- `POST /api/admin/suggestions/:suggestionId/reject` - Reject suggestion

#### Analytics
- `GET /api/admin/game-sessions` - Get all game sessions
- `GET /api/admin/statistics` - Get system-wide statistics

### Teacher Endpoints (require `role: 'teacher'`)

#### Word Suggestions
- `POST /api/teachers/suggestions` - Submit word suggestion
- `GET /api/teachers/suggestions` - Get own suggestions
- `GET /api/teachers/suggestions/stats` - Get suggestion statistics
- `PUT /api/teachers/suggestions/:suggestionId` - Edit pending suggestion
- `DELETE /api/teachers/suggestions/:suggestionId` - Delete pending suggestion

## Example Workflows

### Workflow 1: Teacher Adds New Word

1. Teacher logs in
2. Goes to "Add Word" section
3. Fills in word details
4. Clicks "Submit for Approval"
5. System creates WordSuggestion with `status: 'pending'`
6. Teacher sees "Pending Approval" badge on the word
7. Admin receives notification of new suggestion
8. Admin reviews and approves
9. Word is added to database
10. Teacher sees "Approved" status
11. Word is now available in games

### Workflow 2: Admin Manages System

1. Admin logs in with special credentials
2. Dashboard shows:
   - Total users by role
   - Pending suggestions count
   - System statistics
   - Recent activity
3. Admin navigates to "Pending Suggestions"
4. Reviews each suggestion
5. Approves good suggestions → Words added automatically
6. Rejects invalid suggestions with reason
7. Teacher can see rejection reason and resubmit

### Workflow 3: Admin User Management

1. Admin goes to "User Management"
2. Sees list of all users
3. Can filter by role (student/teacher/admin)
4. Can search by username/email
5. Can:
   - Change user role (promote teacher to admin, etc.)
   - Reset points/level
   - Delete inactive accounts
   - View user's game history

## Security Features

### Authentication
- JWT tokens for all authenticated requests
- Role-based access control middleware
- Password hashing with bcrypt

### Authorization Checks
```javascript
// Only admins can access
authenticateToken, authorizeRoles('admin')

// Teachers and admins can access
authenticateToken, authorizeRoles('teacher', 'admin')

// All authenticated users
authenticateToken
```

### Data Protection
- Admins cannot delete their own account
- Teachers can only edit/delete their own pending suggestions
- Approved/rejected suggestions cannot be modified
- Sensitive fields (passwords) never returned in API responses

## Testing the System

### 1. Create Admin Account
```bash
cd backend
npm run seed:admin
```

### 2. Login as Admin
```
POST /api/auth/login
{
  "email": "admin@tamilwords.com",
  "password": "Admin@123Tamil"
}
```

### 3. Create Teacher Account
```
POST /api/auth/register
{
  "username": "teacher1",
  "email": "teacher1@test.com",
  "password": "teacher123",
  "role": "teacher"
}
```

### 4. Teacher Submits Word
```
POST /api/teachers/suggestions
Authorization: Bearer <teacher_token>
{
  "word": "வானம்",
  "meaning_ta": "விண்",
  "meaning_en": "Sky",
  "level": 1
}
```

### 5. Admin Approves Word
```
POST /api/admin/suggestions/<suggestionId>/approve
Authorization: Bearer <admin_token>
```

### 6. Verify Word in Database
```
GET /api/words
```

## Monitoring & Logs

The system logs important events:
- Admin login attempts
- Word approvals/rejections
- User role changes
- Suggestion submissions

Check console output for:
```
✅ Word suggestion approved: <word>
❌ Word suggestion rejected: <word>
👤 User role changed: <username> → <newRole>
```

## Future Enhancements

- Email notifications for suggestion approvals/rejections
- Bulk approval/rejection
- Word edit history tracking
- Admin activity audit log
- Teacher performance metrics (approval rate)
- Word suggestion templates
- Duplicate detection for word suggestions
