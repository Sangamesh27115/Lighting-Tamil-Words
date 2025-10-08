# Teacher Approval Workflow - Complete Guide

## Overview
Teachers cannot self-register. They must submit a request that is reviewed and approved by an admin before they can access the system.

## 🔄 Complete Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                   TEACHER SIGNUP PROCESS                         │
└─────────────────────────────────────────────────────────────────┘

Step 1: User Submits Teacher Registration
   │
   ├─→ POST /api/auth/register
   │   {
   │     "username": "teacher1",
   │     "email": "teacher@example.com",
   │     "password": "password123",
   │     "role": "teacher",
   │     "fullName": "John Doe"
   │   }
   │
   ↓
   
Step 2: System Creates TeacherRequest (status: 'pending')
   │
   ├─→ TeacherRequest saved to database
   │   - Password is hashed
   │   - Status: 'pending'
   │   - NOT added to Users collection yet
   │
   ↓

Step 3: User Receives Confirmation
   │
   ├─→ Response: "Teacher signup request submitted! 
   │             Please wait for admin approval."
   │
   ↓

Step 4: Admin Reviews Request
   │
   ├─→ Admin logs in and views pending requests
   │   GET /api/admin/teacher-requests?status=pending
   │
   ↓
   
Step 5: Admin Makes Decision
   │
   ├─────────────┬─────────────┐
   ↓             ↓             ↓
APPROVE      REJECT        IGNORE
   │             │             │
   │             │             └─→ Stays pending
   │             │
   │             └─→ POST /api/admin/teacher-requests/:id/reject
   │                 { "reason": "Reason here" }
   │                 - Status → 'rejected'
   │                 - User can see rejection reason
   │                 - Can submit new request later
   │
   └─→ POST /api/admin/teacher-requests/:id/approve
       - Creates User account with role: 'teacher'
       - Status → 'approved'
       - User can now login
       
Step 6: Teacher Can Login
   │
   └─→ POST /api/auth/login
       {
         "email": "teacher@example.com",
         "password": "password123"
       }
       → Success! Gets JWT token
```

## 📋 Database Schema

### TeacherRequest Model
```javascript
{
  _id: ObjectId,
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  fullName: String,
  status: 'pending' | 'approved' | 'rejected' (default: 'pending'),
  reviewedBy: ObjectId → User (admin who reviewed),
  reviewedAt: Date,
  rejectionReason: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔐 Updated Permissions

| Action | Student | Teacher | Admin |
|--------|---------|---------|-------|
| Self-register | ✅ Direct | ❌ Must request | ✅ Direct |
| Login | ✅ | ✅ (after approval) | ✅ |
| Play games | ✅ | ✅ | ✅ |
| Submit word suggestions | ❌ | ✅ | ✅ |
| Add words directly | ❌ | ❌ | ✅ |
| Approve teacher requests | ❌ | ❌ | ✅ |
| Approve word suggestions | ❌ | ❌ | ✅ |
| View all users | ❌ | ❌ | ✅ |

## 🛠️ API Endpoints

### Registration (Updated)

#### Student/Admin Registration (Direct)
```bash
POST /api/auth/register
{
  "username": "student1",
  "email": "student@test.com",
  "password": "password123",
  "role": "student"  # or "admin"
}

Response: 201 Created
{
  "message": "Registered successfully!"
}
```

#### Teacher Registration (Request)
```bash
POST /api/auth/register
{
  "username": "teacher1",
  "email": "teacher@test.com",
  "password": "password123",
  "role": "teacher",
  "fullName": "John Doe"
}

Response: 201 Created
{
  "message": "Teacher signup request submitted successfully! Please wait for admin approval.",
  "status": "pending"
}
```

### Admin - Teacher Request Management

#### Get All Teacher Requests
```bash
GET /api/admin/teacher-requests?status=pending
Authorization: Bearer <admin_token>

Response:
{
  "requests": [
    {
      "_id": "...",
      "username": "teacher1",
      "email": "teacher@test.com",
      "fullName": "John Doe",
      "status": "pending",
      "createdAt": "2025-10-07T...",
      "reviewedBy": null,
      "reviewedAt": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```

#### Approve Teacher Request
```bash
POST /api/admin/teacher-requests/:requestId/approve
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "message": "Teacher request approved and account created",
  "teacher": {
    "id": "...",
    "username": "teacher1",
    "email": "teacher@test.com"
  }
}
```

#### Reject Teacher Request
```bash
POST /api/admin/teacher-requests/:requestId/reject
Authorization: Bearer <admin_token>
{
  "reason": "Insufficient qualifications"
}

Response: 200 OK
{
  "message": "Teacher request rejected"
}
```

### Statistics (Updated)
```bash
GET /api/admin/statistics
Authorization: Bearer <admin_token>

Response:
{
  "statistics": {
    "totalUsers": 50,
    "totalStudents": 45,
    "totalTeachers": 4,
    "totalWords": 200,
    "totalSessions": 1500,
    "pendingSuggestions": 3,
    "pendingTeacherRequests": 2  ← NEW
  },
  ...
}
```

## 🎯 User Experience

### For Prospective Teachers

1. **Sign Up**
   - Go to signup page
   - Select "Teacher" role
   - Fill in details
   - Submit

2. **Wait for Approval**
   - Receive confirmation message
   - Cannot login yet
   - Must wait for admin review

3. **After Approval**
   - Receive notification (future feature)
   - Can login with credentials
   - Full teacher access granted

4. **If Rejected**
   - See rejection reason
   - Can address issues
   - Can submit new request

### For Admins

1. **View Pending Requests**
   - Dashboard shows count of pending requests
   - Navigate to "Teacher Requests" section
   - See list with applicant details

2. **Review Application**
   - View username, email, full name
   - Check submission date
   - Verify credentials

3. **Make Decision**
   - **Approve**: Creates teacher account immediately
   - **Reject**: Provide reason for rejection
   - **Defer**: Leave as pending for later review

## 🔒 Security Features

### Password Handling
- Password is hashed before saving to TeacherRequest
- Same hashed password used when creating User account
- User doesn't need to reset password after approval

### Duplicate Prevention
```javascript
// Check 1: Email already registered as user
if (await User.findOne({ email })) {
  return "User already exists";
}

// Check 2: Pending request exists
if (await TeacherRequest.findOne({ email, status: 'pending' })) {
  return "Request already submitted. Waiting for approval.";
}

// Check 3: Previous request was rejected
if (await TeacherRequest.findOne({ email, status: 'rejected' })) {
  return "Previous request rejected: [reason]";
}
```

### Approval Validation
```javascript
// Cannot approve if:
- Request already reviewed
- User with email already exists
- Request not found

// Track who approved:
- reviewedBy: admin user ID
- reviewedAt: timestamp
```

## 🧪 Testing the Workflow

### Test 1: Teacher Request Submission
```bash
# Submit teacher request
POST /api/auth/register
{
  "username": "newteacher",
  "email": "newteacher@test.com",
  "password": "teacher123",
  "role": "teacher",
  "fullName": "New Teacher"
}

# Expected: 201 with pending status message
```

### Test 2: Cannot Login Before Approval
```bash
# Try to login
POST /api/auth/login
{
  "email": "newteacher@test.com",
  "password": "teacher123"
}

# Expected: 404 User not found
```

### Test 3: Admin Approves Request
```bash
# Get request ID from admin dashboard
GET /api/admin/teacher-requests?status=pending

# Approve the request
POST /api/admin/teacher-requests/<requestId>/approve

# Expected: 200 with success message
```

### Test 4: Teacher Can Now Login
```bash
# Login with same credentials
POST /api/auth/login
{
  "email": "newteacher@test.com",
  "password": "teacher123"
}

# Expected: 200 with JWT token and role: 'teacher'
```

### Test 5: Duplicate Prevention
```bash
# Try to submit another request with same email
POST /api/auth/register
{
  "username": "newteacher2",
  "email": "newteacher@test.com",  ← Same email
  "password": "password",
  "role": "teacher"
}

# Expected: 409 "User already exists"
```

## 📊 Admin Dashboard Integration

### Statistics Card
```
Pending Teacher Requests: 5
[View All] button → Navigate to teacher requests page
```

### Teacher Requests Page
```
┌──────────────────────────────────────────────────────┐
│ Teacher Requests                                      │
│ [Pending] [Approved] [Rejected] [All]               │
├──────────────────────────────────────────────────────┤
│ Username  │ Email           │ Submitted  │ Actions  │
├──────────────────────────────────────────────────────┤
│ teacher1  │ t1@test.com     │ 2 days ago │ ✓ ✗     │
│ teacher2  │ t2@test.com     │ 1 day ago  │ ✓ ✗     │
└──────────────────────────────────────────────────────┘
```

## 🚨 Error Handling

### Registration Errors
- **409 Conflict**: Email already exists
- **409 Conflict**: Request already pending
- **409 Conflict**: Previous request rejected

### Approval Errors
- **404 Not Found**: Request ID invalid
- **400 Bad Request**: Request already reviewed
- **409 Conflict**: User email already exists

### Rejection Errors
- **404 Not Found**: Request ID invalid
- **400 Bad Request**: Request already reviewed

## 📝 Migration Guide

### Existing Teachers
If you already have teachers in the system:
1. They can continue using their accounts
2. New teachers must go through approval process
3. No migration needed for existing accounts

### Admin Setup
1. Ensure admin account exists (`npm run seed:admin`)
2. Login as admin
3. Navigate to teacher requests section
4. Start approving/rejecting requests

## ✅ Summary

- ✅ Teachers cannot self-register directly
- ✅ Teacher signup creates pending request
- ✅ Admin must approve before account is created
- ✅ Passwords are securely hashed
- ✅ Duplicate prevention at multiple levels
- ✅ Full audit trail (who approved, when)
- ✅ Rejection reasons tracked
- ✅ Teachers can play games after approval
- ✅ Logout properly redirects to home page
- ✅ Admin has full system access

**The system is now fully secured with admin-controlled teacher access!** 🎉
