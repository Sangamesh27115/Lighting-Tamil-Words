# SYSTEM ARCHITECTURE AND PROCESS FLOW DIAGRAMS

## 1. SYSTEM ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                   Tamil Words Learning System                        │
│                    System Architecture Diagram                       │
│                      (Three-Tier Architecture)                       │
└─────────────────────────────────────────────────────────────────────┘


╔═══════════════════════════════════════════════════════════════════╗
║                      PRESENTATION TIER                             ║
║                     (Client-Side Layer)                            ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌──────────────────────────────────────────────────────────────┐║
║  │                    React Application                          │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               UI Components Layer                       │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │ │║
║  │  │ │  NavBar  │  │  Footer  │  │  Common Components   │ │ │║
║  │  │ └──────────┘  └──────────┘  └──────────────────────┘ │ │║
║  │  │                                                        │ │║
║  │  │ ┌──────────────────────────────────────────────────┐ │ │║
║  │  │ │           Page Components                        │ │ │║
║  │  │ ├──────────────────────────────────────────────────┤ │ │║
║  │  │ │ - Login.js                                       │ │ │║
║  │  │ │ - Dashboard.js (role router)                     │ │ │║
║  │  │ │ - StudentDashboard.js                            │ │ │║
║  │  │ │ - TeacherDashboard.js                            │ │ │║
║  │  │ │ - AdminDashboard.js                              │ │ │║
║  │  │ │ - Game.js                                        │ │ │║
║  │  │ └──────────────────────────────────────────────────┘ │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               Service Layer (API Client)                │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ - authService.js     (login, register, logout)         │ │║
║  │  │ - gameService.js     (play, results, leaderboard)      │ │║
║  │  │ - studentService.js  (profile, progress)               │ │║
║  │  │ - teacherService.js  (requests, suggestions, stats)    │ │║
║  │  │ - adminService.js    (approvals, user mgmt, words)     │ │║
║  │  │                                                         │ │║
║  │  │ HTTP Client: Axios with Interceptors                   │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               State Management                          │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ - React Context / useState / useEffect                 │ │║
║  │  │ - Local Storage (tokens, user data)                    │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  └──────────────────────────────────────────────────────────────┘║
║                                                                    ║
╚════════════════════════════╪═══════════════════════════════════════╝
                             │
                             │ REST API over HTTPS
                             │ JSON Payloads
                             │ JWT in Authorization Header
                             │
╔════════════════════════════▼═══════════════════════════════════════╗
║                      APPLICATION TIER                              ║
║                    (Business Logic Layer)                          ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌──────────────────────────────────────────────────────────────┐║
║  │                  Express.js Application                       │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               Routing Layer                             │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ API Routes:                                            │ │║
║  │  │ - /api/auth/*        → auth.js                         │ │║
║  │  │ - /api/students/*    → students.js                     │ │║
║  │  │ - /api/teachers/*    → teachers.js                     │ │║
║  │  │ - /api/admin/*       → admins.js                       │ │║
║  │  │ - /api/words/*       → words.js                        │ │║
║  │  │ - /api/games/*       → games.js                        │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               Middleware Layer                          │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ 1. CORS Handler                                        │ │║
║  │  │    - Allow origins, methods, headers                   │ │║
║  │  │                                                         │ │║
║  │  │ 2. Body Parser                                         │ │║
║  │  │    - Parse JSON requests                               │ │║
║  │  │                                                         │ │║
║  │  │ 3. JWT Authentication (authMiddleware.js)              │ │║
║  │  │    - Verify token                                      │ │║
║  │  │    - Extract user from token                           │ │║
║  │  │    - Attach req.user                                   │ │║
║  │  │                                                         │ │║
║  │  │ 4. Role Authorization                                  │ │║
║  │  │    - checkStudent(), checkTeacher(), checkAdmin()      │ │║
║  │  │                                                         │ │║
║  │  │ 5. Error Handler                                       │ │║
║  │  │    - Catch errors, format responses                    │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               Controller Layer                          │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ - authController.js                                    │ │║
║  │  │   * register(), login(), getMe()                       │ │║
║  │  │                                                         │ │║
║  │  │ - gameController.js                                    │ │║
║  │  │   * getWords(), playGame(), submitAnswers()            │ │║
║  │  │                                                         │ │║
║  │  │ - studentController.js                                 │ │║
║  │  │   * getProfile(), getProgress(), getLeaderboard()      │ │║
║  │  │                                                         │ │║
║  │  │ - teacherController.js                                 │ │║
║  │  │   * submitSuggestion(), requestModification()          │ │║
║  │  │   * getMySuggestions(), getStudentProgress()           │ │║
║  │  │                                                         │ │║
║  │  │ - adminController.js                                   │ │║
║  │  │   * approveRequest(), rejectRequest(), getStats()      │ │║
║  │  │   * manageUsers(), manageWords()                       │ │║
║  │  │                                                         │ │║
║  │  │ - wordController.js                                    │ │║
║  │  │   * addWord(), updateWord(), deleteWord()              │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               Business Logic Layer                      │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ - Password hashing (bcrypt)                            │ │║
║  │  │ - JWT token generation/verification                    │ │║
║  │  │ - Score calculation algorithms                         │ │║
║  │  │ - Level progression logic                              │ │║
║  │  │ - Request validation rules                             │ │║
║  │  │ - Word randomization                                   │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               Data Access Layer (Models)                │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ Mongoose Schemas & Models:                             │ │║
║  │  │ - User.js (base model)                                 │ │║
║  │  │ - Student.js (discriminator)                           │ │║
║  │  │ - Teacher.js (discriminator)                           │ │║
║  │  │ - Admin.js (discriminator)                             │ │║
║  │  │ - Word.js                                              │ │║
║  │  │ - GameSession.js                                       │ │║
║  │  │ - WordSuggestion.js                                    │ │║
║  │  │ - WordModificationRequest.js                           │ │║
║  │  │ - TeacherRequest.js                                    │ │║
║  │  │                                                         │ │║
║  │  │ Model Methods & Hooks:                                 │ │║
║  │  │ - Pre-save password hashing                            │ │║
║  │  │ - Password comparison                                  │ │║
║  │  │ - Virtual fields                                       │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  └──────────────────────────────────────────────────────────────┘║
║                                                                    ║
╚════════════════════════════╪═══════════════════════════════════════╝
                             │
                             │ MongoDB Wire Protocol
                             │ Mongoose ODM
                             │
╔════════════════════════════▼═══════════════════════════════════════╗
║                         DATA TIER                                  ║
║                    (Persistence Layer)                             ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌──────────────────────────────────────────────────────────────┐║
║  │                    MongoDB Database                           │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               Collections                               │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │                                                         │ │║
║  │  │  ┌─────────────────────────────────────────────────┐  │ │║
║  │  │  │ users                                           │  │ │║
║  │  │  │ - Stores all users (students, teachers, admins)│  │ │║
║  │  │  │ - Discriminator field for role                 │  │ │║
║  │  │  │ - Indexes: email (unique), username (unique)   │  │ │║
║  │  │  └─────────────────────────────────────────────────┘  │ │║
║  │  │                                                         │ │║
║  │  │  ┌─────────────────────────────────────────────────┐  │ │║
║  │  │  │ words                                           │  │ │║
║  │  │  │ - Tamil words with definitions                 │  │ │║
║  │  │  │ - Indexes: word + level (compound, unique)     │  │ │║
║  │  │  └─────────────────────────────────────────────────┘  │ │║
║  │  │                                                         │ │║
║  │  │  ┌─────────────────────────────────────────────────┐  │ │║
║  │  │  │ gamesessions                                    │  │ │║
║  │  │  │ - Game history and results                     │  │ │║
║  │  │  │ - Indexes: studentId, gameType, createdAt      │  │ │║
║  │  │  └─────────────────────────────────────────────────┘  │ │║
║  │  │                                                         │ │║
║  │  │  ┌─────────────────────────────────────────────────┐  │ │║
║  │  │  │ wordsuggestions                                 │  │ │║
║  │  │  │ - Teacher word suggestions                     │  │ │║
║  │  │  │ - Indexes: teacherId, status                   │  │ │║
║  │  │  └─────────────────────────────────────────────────┘  │ │║
║  │  │                                                         │ │║
║  │  │  ┌─────────────────────────────────────────────────┐  │ │║
║  │  │  │ wordmodificationrequests                        │  │ │║
║  │  │  │ - Teacher update/delete requests               │  │ │║
║  │  │  │ - Indexes: teacherId, status, originalWordId   │  │ │║
║  │  │  └─────────────────────────────────────────────────┘  │ │║
║  │  │                                                         │ │║
║  │  │  ┌─────────────────────────────────────────────────┐  │ │║
║  │  │  │ teacherrequests                                 │  │ │║
║  │  │  │ - Teacher account requests                     │  │ │║
║  │  │  │ - Indexes: email, status                       │  │ │║
║  │  │  └─────────────────────────────────────────────────┘  │ │║
║  │  │                                                         │ │║
║  │  └─────────────────────────────────────────────────────────┘ │║
║  │                                                               │║
║  │  ┌────────────────────────────────────────────────────────┐ │║
║  │  │               Database Features                         │ │║
║  │  ├────────────────────────────────────────────────────────┤ │║
║  │  │ - ACID transactions                                    │ │║
║  │  │ - Indexing for query optimization                      │ │║
║  │  │ - Schema validation                                    │ │║
║  │  │ - Aggregation pipelines                                │ │║
║  │  │ - Backup and recovery                                  │ │║
║  │  └────────────────────────────────────────────────────────┘ │║
║  └──────────────────────────────────────────────────────────────┘║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝


Cross-Cutting Concerns:
-----------------------
┌────────────────────────────────────────────────────────────────┐
│                     Security                                    │
│ - HTTPS/TLS encryption                                          │
│ - JWT token-based authentication                                │
│ - Role-based access control (RBAC)                              │
│ - Password hashing with bcrypt                                  │
│ - Input validation and sanitization                             │
│ - CORS policy configuration                                     │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                     Error Handling                              │
│ - Try-catch blocks in controllers                               │
│ - Error middleware for centralized handling                     │
│ - Consistent error response format                              │
│ - Logging of errors                                             │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                     Configuration                               │
│ - Environment variables (.env)                                  │
│ - Database connection strings                                   │
│ - API keys and secrets                                          │
│ - CORS allowed origins                                          │
│ - JWT secret and expiration                                     │
└────────────────────────────────────────────────────────────────┘
```

---

## 2. PROCESS FLOW DIAGRAMS

### 2.1 Student Registration and Game Play - End-to-End Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│              Student Journey: Registration to Game Play              │
└─────────────────────────────────────────────────────────────────────┘

START
  │
  ▼
┌─────────────────────┐
│ Student visits      │
│ application URL     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Frontend loads      │
│ Login page          │
└──────────┬──────────┘
           │
           │ Clicks "Register"
           ▼
┌─────────────────────────────────┐
│ Fill registration form:         │
│ - Username                      │
│ - Email                         │
│ - Password                      │
│ - Confirm Password              │
└──────────┬──────────────────────┘
           │
           │ Submit
           ▼
┌─────────────────────────────────┐
│ Frontend validates:             │
│ - All fields filled             │
│ - Email format valid            │
│ - Passwords match               │
└──────────┬──────────────────────┘
           │
           │ POST /api/auth/register
           │ { username, email, password, role: 'student' }
           ▼
┌─────────────────────────────────┐
│ Backend receives request        │
│ authController.register()       │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ Check if email exists           │
│ User.findOne({ email })         │
└──────────┬──────────────────────┘
           │
     ┌─────┴─────┐
     │  Exists?  │
     └─────┬─────┘
           │
    ┌──────┴──────┐
    │ Yes         │ No
    │             │
    ▼             ▼
┌────────┐   ┌──────────────────────────┐
│ Return │   │ Hash password (bcrypt)   │
│ 400    │   │ salt rounds: 10          │
│ Error  │   └──────────┬───────────────┘
└────────┘              │
                        ▼
              ┌──────────────────────────┐
              │ Create Student document  │
              │ - username, email        │
              │ - hashedPassword         │
              │ - role: 'student'        │
              │ - points: 0, level: 1    │
              └──────────┬───────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │ Save to database         │
              │ student.save()           │
              └──────────┬───────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │ Generate JWT token       │
              │ jwt.sign({ id, role })   │
              │ expiresIn: '7d'          │
              └──────────┬───────────────┘
                         │
                         │ Return 201
                         │ { token, user }
                         ▼
              ┌──────────────────────────┐
              │ Frontend receives token  │
              │ - Store in localStorage  │
              │ - Store user data        │
              │ - Set Authorization hdr  │
              └──────────┬───────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │ Redirect to Dashboard    │
              │ (StudentDashboard.js)    │
              └──────────┬───────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │ Dashboard displays:      │
              │ - Welcome message        │
              │ - Current points/level   │
              │ - Available games        │
              │ - Progress chart         │
              │ - Leaderboard            │
              └──────────┬───────────────┘
                         │
                         │ Student clicks "Play Game"
                         ▼
              ┌──────────────────────────┐
              │ Select game type:        │
              │ 1. English to Tamil      │
              │ 2. Tamil to English      │
              │ 3. Fill in the Blank     │
              └──────────┬───────────────┘
                         │
                         │ Select level (1-10)
                         ▼
              ┌──────────────────────────┐
              │ GET /api/games/words     │
              │ ?gameType=X&level=Y      │
              └──────────┬───────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │ Backend fetches words    │
              │ Word.find({ level })     │
              │ .limit(10).randomize()   │
              └──────────┬───────────────┘
                         │
                         │ Return words array
                         ▼
              ┌──────────────────────────┐
              │ Frontend displays game   │
              │ - Question counter       │
              │ - Timer                  │
              │ - Current question       │
              │ - Answer options         │
              └──────────┬───────────────┘
                         │
                         │ Student answers questions
                         │ (stores answers locally)
                         ▼
              ┌──────────────────────────┐
              │ All questions answered   │
              │ OR time expires          │
              └──────────┬───────────────┘
                         │
                         │ POST /api/games/submit
                         │ { gameType, level, answers[] }
                         ▼
              ┌──────────────────────────┐
              │ Backend validates        │
              │ answers                  │
              │ - Check each answer      │
              │ - Calculate score        │
              │ - Calculate accuracy     │
              │ - Determine points       │
              └──────────┬───────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │ Create GameSession       │
              │ - studentId              │
              │ - gameType, level        │
              │ - score, answers         │
              │ - startTime, endTime     │
              └──────────┬───────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │ Update student profile   │
              │ - Add points             │
              │ - Increment gamesPlayed  │
              │ - Update accuracy        │
              │ - Check level up         │
              └──────────┬───────────────┘
                         │
                         │ Return results
                         ▼
              ┌──────────────────────────┐
              │ Frontend displays:       │
              │ - Final score            │
              │ - Accuracy percentage    │
              │ - Points earned          │
              │ - Correct/Incorrect      │
              │ - New level/total points │
              │ - "Play Again" button    │
              └──────────┬───────────────┘
                         │
                         ▼
                       END
```

---

### 2.2 Teacher Word Request and Admin Approval Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│          Teacher Request to Admin Approval Complete Flow             │
└─────────────────────────────────────────────────────────────────────┘

START (Teacher logged in)
  │
  ▼
┌─────────────────────────────────┐
│ Teacher navigates to            │
│ "Word Library" tab              │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ Views existing words            │
│ GET /api/teachers/words         │
└──────────┬──────────────────────┘
           │
           │ Clicks "Add Word" button
           ▼
┌─────────────────────────────────┐
│ Fill word suggestion form:      │
│ - Word (Tamil)                  │
│ - Meaning (English)             │
│ - Tamil Definition              │
│ - Level (1-10)                  │
│ - Examples                      │
│ - Category                      │
└──────────┬──────────────────────┘
           │
           │ Submit
           ▼
┌─────────────────────────────────┐
│ Frontend validation:            │
│ - All required fields filled    │
│ - Level is 1-10                 │
│ - Examples is array             │
└──────────┬──────────────────────┘
           │
           │ POST /api/teachers/suggestions
           │ { word, meaning, tamilDefinition, ... }
           ▼
┌─────────────────────────────────┐
│ Backend receives request        │
│ teacherController               │
│ .submitSuggestion()             │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ Verify teacher authentication   │
│ authMiddleware checks JWT       │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ Create WordSuggestion           │
│ - teacherId: req.user.id        │
│ - word, meaning, etc.           │
│ - status: 'pending'             │
│ - createdAt: now()              │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ Save to database                │
│ suggestion.save()               │
└──────────┬──────────────────────┘
           │
           │ Return 201
           │ { message, suggestion }
           ▼
┌─────────────────────────────────┐
│ Frontend displays:              │
│ "Request submitted successfully"│
│ Refresh requests list           │
└──────────┬──────────────────────┘
           │
           │
           │ [Time passes - Admin logs in]
           │
           ▼
┌─────────────────────────────────┐
│ Admin Dashboard loads           │
│ GET /api/admin/pending-requests │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ Backend aggregates:             │
│ - Word suggestions              │
│ - Modification requests         │
│ - Teacher account requests      │
│ All with status='pending'       │
└──────────┬──────────────────────┘
           │
           │ Return requests array
           ▼
┌─────────────────────────────────┐
│ Admin views requests in tabs:   │
│ 1. Word Suggestions             │
│ 2. Modifications                │
│ 3. Teacher Accounts             │
└──────────┬──────────────────────┘
           │
           │ Admin selects word suggestion
           ▼
┌─────────────────────────────────┐
│ View suggestion details:        │
│ - Teacher name                  │
│ - Word, meaning, definition     │
│ - Level, examples, category     │
│ - Submitted date                │
└──────────┬──────────────────────┘
           │
     ┌─────┴─────────┐
     │ Admin decides │
     └─────┬─────────┘
           │
    ┌──────┴──────┐
    │ Approve     │ Reject
    │             │
    ▼             ▼
┌────────────┐  ┌─────────────────────────┐
│ Click      │  │ Click "Reject"          │
│ "Approve"  │  │ Enter rejection reason  │
└──────┬─────┘  └──────┬──────────────────┘
       │               │
       │               │ POST /api/admin/suggestions/:id/reject
       │               │ { reason }
       │               ▼
       │        ┌─────────────────────────┐
       │        │ Update suggestion:      │
       │        │ - status: 'rejected'    │
       │        │ - reviewedBy: admin.id  │
       │        │ - reviewedAt: now()     │
       │        │ - rejectionReason       │
       │        └──────┬──────────────────┘
       │               │
       │               │ Save
       │               ▼
       │        ┌─────────────────────────┐
       │        │ Return 200              │
       │        │ "Rejected successfully" │
       │        └──────┬──────────────────┘
       │               │
       │               └──────────┐
       │                          │
       │ POST /api/admin/suggestions/:id/approve
       │                          │
       ▼                          │
┌──────────────────────────────┐ │
│ Extract suggestion data      │ │
└──────────┬───────────────────┘ │
           │                     │
           ▼                     │
┌──────────────────────────────┐ │
│ Create new Word document:    │ │
│ - word                       │ │
│ - meaning                    │ │
│ - tamilDefinition            │ │
│ - level                      │ │
│ - examples                   │ │
│ - category                   │ │
│ - addedBy: admin.id          │ │
└──────────┬───────────────────┘ │
           │                     │
           ▼                     │
┌──────────────────────────────┐ │
│ Save to words collection     │ │
│ word.save()                  │ │
└──────────┬───────────────────┘ │
           │                     │
           ▼                     │
┌──────────────────────────────┐ │
│ Update suggestion:           │ │
│ - status: 'approved'         │ │
│ - reviewedBy: admin.id       │ │
│ - reviewedAt: now()          │ │
└──────────┬───────────────────┘ │
           │                     │
           │ Save                │
           ▼                     │
┌──────────────────────────────┐ │
│ Return 200                   │ │
│ { message, word }            │ │
└──────────┬───────────────────┘ │
           │                     │
           └─────────┬───────────┘
                     │
                     ▼
           ┌─────────────────────────┐
           │ Frontend displays:      │
           │ "Request processed"     │
           │ Refresh pending list    │
           │ Update statistics       │
           └─────────┬───────────────┘
                     │
                     │ [Teacher checks status]
                     ▼
           ┌─────────────────────────┐
           │ Teacher views           │
           │ "My Requests" tab       │
           │ GET /api/teachers/      │
           │     my-suggestions      │
           └─────────┬───────────────┘
                     │
                     ▼
           ┌─────────────────────────┐
           │ Displays request with:  │
           │ - Status badge          │
           │ - (approved/rejected)   │
           │ - Reviewed date         │
           │ - Rejection reason      │
           │   (if rejected)         │
           └─────────────────────────┘
                     │
                     ▼
                   END
```

---

*[Document Complete]*
