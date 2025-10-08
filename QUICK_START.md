# 🚀 QUICK START GUIDE

## Step 1: Start MongoDB
```powershell
mongod
```
Leave this terminal running.

## Step 2: Seed Admin Account & Start Backend
Open a new terminal:
```powershell
cd backend
npm run seed:admin
npm run dev
```

You should see:
- "Admin account created successfully"
- "Connected to MongoDB"
- "Server running on port 5000"

## Step 3: Start Frontend
Open another new terminal:
```powershell
cd web-frontend
npm start
```

Browser will open automatically at `http://localhost:3000`

## Step 4: Navigate the Application

### 🏠 Homepage (`/`)
You'll see:
- Beautiful hero section
- "Start Learning" and "Login" buttons
- Features and game modes

### 🔐 Login as Admin
1. Click "Login" button
2. Enter:
   - Email: `admin@tamilwords.com`
   - Password: `Admin@123Tamil`
3. Click Login

### 📊 Admin Dashboard
You'll be redirected to the Admin Dashboard with **6 tabs**:

1. **Overview** - System statistics with pending counts
2. **Teacher Requests** - Approve teacher signups (with badge count)
3. **Word Suggestions** - Approve new words (with badge count)
4. **Word Modifications** - Approve updates/deletes (with badge count)
5. **Users** - View all users
6. **Words** - View all words

### ✅ Test Approval Workflows:

#### Test Teacher Signup:
1. Logout from admin
2. Click "Start Learning" → Register
3. Fill form, select role: **Teacher**
4. Submit → "Request submitted, wait for approval"
5. Login back as admin
6. Go to "Teacher Requests" tab → You'll see badge with count "1"
7. Click "Approve" → Teacher can now login!

#### Test Word Suggestion:
1. Login as teacher (after approval)
2. Submit a word suggestion
3. Login as admin
4. "Word Suggestions" tab shows badge "1"
5. Click "Approve" → Word added to database!

#### Test Word Modification:
1. Login as teacher
2. Request to update or delete a word
3. Login as admin
4. "Word Modifications" tab shows badge "1"
5. See comparison of old vs new
6. Click "Approve" → Word modified!

---

## 🎯 All Features Working:

✅ Homepage with navigation
✅ User registration (student=direct, teacher=approval required)
✅ Login system
✅ Admin Dashboard with 6 tabs
✅ Real-time pending counts with badges
✅ Teacher signup approval workflow
✅ Word suggestion approval workflow
✅ Word modification approval workflow (update/delete)
✅ Complete admin control
✅ Responsive design

---

## 🔥 You're all set! Start your servers and test the complete system!
