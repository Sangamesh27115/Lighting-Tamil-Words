# UML DIAGRAMS (Continued) - STATE, PACKAGE, COMPONENT, DEPLOYMENT

## 5. STATE CHART DIAGRAMS

### 5.1 Word Request State Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│              Word Request (Suggestion/Modification)              │
│                       State Transitions                          │
└─────────────────────────────────────────────────────────────────┘

                        ┌──────────────┐
                        │    START     │
                        └──────┬───────┘
                               │
                               │ Teacher submits request
                               │
                        ┌──────▼───────┐
                        │   PENDING    │
                        │              │
                        │ - Created at │
                        │ - Requested  │
                        │   by Teacher │
                        │ - Waiting for│
                        │   Admin      │
                        └──┬────────┬──┘
                           │        │
          ┌────────────────┘        └────────────────┐
          │                                          │
          │ Admin approves                  Admin rejects
          │                                          │
   ┌──────▼──────────┐                    ┌─────────▼────────┐
   │   APPROVED      │                    │    REJECTED      │
   │                 │                    │                  │
   │ - Reviewed at   │                    │ - Reviewed at    │
   │ - Reviewed by   │                    │ - Reviewed by    │
   │ - Applied to DB │                    │ - Rejection      │
   └──────┬──────────┘                    │   Reason         │
          │                                └─────────┬────────┘
          │                                          │
          │ For Suggestions:                         │
          │ INSERT into words                        │
          │                                          │
          │ For Updates:                             │
          │ UPDATE in words                          │
          │                                          │
          │ For Deletes:                             │
          │ DELETE from words                        │
          │                                          │
          └──────────────┬───────────────────────────┘
                         │
                         │
                   ┌─────▼──────┐
                   │    END     │
                   └────────────┘

State Invariants:
----------------
PENDING:
  - status = 'pending'
  - reviewedBy = null
  - reviewedAt = null
  - rejectionReason = null
  
APPROVED:
  - status = 'approved'
  - reviewedBy != null
  - reviewedAt != null
  - Database changes applied
  
REJECTED:
  - status = 'rejected'
  - reviewedBy != null
  - reviewedAt != null
  - rejectionReason != null
  - No database changes
```

---

### 5.2 Game Session State Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Game Session States                          │
└─────────────────────────────────────────────────────────────────┘

                        ┌──────────────┐
                        │    START     │
                        └──────┬───────┘
                               │
                               │ Student clicks "Play Game"
                               │
                        ┌──────▼────────┐
                        │ INITIALIZING  │
                        │               │
                        │ - Select game │
                        │   type        │
                        │ - Select level│
                        └──────┬────────┘
                               │
                               │ Game type and level selected
                               │
                        ┌──────▼────────┐
                        │   LOADING     │
                        │               │
                        │ - Fetch words │
                        │ - Prepare     │
                        │   questions   │
                        │ - Create game │
                        │   session     │
                        └──────┬────────┘
                               │
                               │ Questions ready
                               │
                        ┌──────▼────────┐
                        │   IN_PROGRESS │◄─────────┐
                        │               │          │
                        │ - Display     │          │
                        │   questions   │          │
                        │ - Accept      │          │ Next question
                        │   answers     │          │
                        │ - Track time  │          │
                        └──┬──────┬─────┘          │
                           │      │                │
                           │      └────────────────┘
                           │
            ┌──────────────┴─────────────┐
            │                            │
            │ All answered    OR    Time up
            │                            │
            └──────────────┬─────────────┘
                           │
                    ┌──────▼────────┐
                    │  CALCULATING  │
                    │               │
                    │ - Calculate   │
                    │   score       │
                    │ - Calculate   │
                    │   accuracy    │
                    │ - Determine   │
                    │   points      │
                    └──────┬────────┘
                           │
                           │ Calculations complete
                           │
                    ┌──────▼────────┐
                    │    SAVING     │
                    │               │
                    │ - Save session│
                    │ - Update user │
                    │   points      │
                    │ - Update level│
                    └──────┬────────┘
                           │
                           │ Save complete
                           │
                    ┌──────▼────────┐
                    │   COMPLETED   │
                    │               │
                    │ - Display     │
                    │   results     │
                    │ - Show stats  │
                    │ - Show new    │
                    │   level/points│
                    └──────┬────────┘
                           │
                           │
                     ┌─────▼──────┐
                     │    END     │
                     └────────────┘

State Attributes:
----------------
INITIALIZING:
  - gameType: null
  - level: null
  - questions: []
  
IN_PROGRESS:
  - currentQuestion: number
  - answers: []
  - startTime: timestamp
  - timeRemaining: number
  
CALCULATING:
  - score: null
  - accuracy: null
  - pointsEarned: null
  
COMPLETED:
  - score: number
  - accuracy: percentage
  - pointsEarned: number
  - saved: boolean
```

---

### 5.3 User Authentication State Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                  User Authentication States                      │
└─────────────────────────────────────────────────────────────────┘

                        ┌──────────────┐
                        │    START     │
                        └──────┬───────┘
                               │
                        ┌──────▼──────────┐
                        │ UNAUTHENTICATED │
                        │                 │
                        │ - No token      │
                        │ - No user data  │
                        └──┬──────────┬───┘
                           │          │
                  Login    │          │    Register
                  attempt  │          │    attempt
                           │          │
                    ┌──────▼──┐  ┌────▼──────┐
                    │VALIDATING│ │REGISTERING│
                    │          │ │           │
                    │- Check   │ │- Create   │
                    │  creds   │ │  user     │
                    │- Verify  │ │- Hash pwd │
                    │  password│ └────┬──────┘
                    └──┬───┬───┘      │
                       │   │          │
         Valid         │   │ Invalid  │ Success
         credentials   │   │          │
                       │   │          │
                       │   │    ┌─────▼─────┐
                       │   └───►│  ERROR    │
                       │        │           │
                       │        │- Show msg │
                       │        └─────┬─────┘
                       │              │
                       │              │ Retry
                       │              │
                       │        ┌─────▼──────────┐
                       └───────►│ AUTHENTICATED  │
                                │                │
                                │ - Token stored │
                                │ - User data    │
                                │ - Role set     │
                                └─────┬──────┬───┘
                                      │      │
                                      │      │ Logout
                                      │      │
                         Token        │      │
                         expires      │      │
                                      │      │
                                ┌─────▼──────▼───┐
                                │ TOKEN_EXPIRED  │
                                │                │
                                │ - Clear token  │
                                │ - Clear data   │
                                └─────┬──────────┘
                                      │
                                      │
                               ┌──────▼──────────┐
                               │ UNAUTHENTICATED │
                               └─────────────────┘

State Transitions:
------------------
UNAUTHENTICATED → VALIDATING (login attempt)
UNAUTHENTICATED → REGISTERING (register attempt)
VALIDATING → AUTHENTICATED (valid credentials)
VALIDATING → ERROR (invalid credentials)
REGISTERING → AUTHENTICATED (success)
REGISTERING → ERROR (failure)
ERROR → UNAUTHENTICATED (retry)
AUTHENTICATED → TOKEN_EXPIRED (token expires/logout)
TOKEN_EXPIRED → UNAUTHENTICATED (clear session)
```

---

## 6. PACKAGE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                   Tamil Words Application                            │
│                       Package Diagram                                │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                      <<package>>                              │
│                     Frontend (React)                          │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐│
│  │  <<package>>    │  │  <<package>>    │  │  <<package>> ││
│  │    Components   │  │      Pages      │  │   Services   ││
│  ├─────────────────┤  ├─────────────────┤  ├──────────────┤│
│  │ - NavBar        │  │ - Login         │  │ - authService││
│  │ - Footer        │  │ - Dashboard     │  │ - gameService││
│  │ - GameCard      │  │ - Game          │  │ - wordService││
│  │ - WordCard      │  │ - AdminDashboard│  │ - teacherSvc ││
│  │ - ProgressBar   │  │ - TeacherDash   │  │ - adminSvc   ││
│  │ - StatCard      │  │ - StudentDash   │  └──────────────┘│
│  └─────────────────┘  └─────────────────┘         │        │
│           │                    │                   │        │
│           └────────────────────┴───────────────────┘        │
│                                │                            │
└────────────────────────────────┼────────────────────────────┘
                                 │
                                 │ HTTP/REST API
                                 │
┌────────────────────────────────▼────────────────────────────┐
│                      <<package>>                             │
│                  Backend (Node.js/Express)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐ │
│  │ <<package>> │  │ <<package>> │  │   <<package>>      │ │
│  │   Routes    │  │ Controllers │  │   Middleware       │ │
│  ├─────────────┤  ├─────────────┤  ├────────────────────┤ │
│  │ - auth.js   │  │ - authCtrl  │  │ - authMiddleware   │ │
│  │ - students  │  │ - gameCtrl  │  │ - errorHandler     │ │
│  │ - teachers  │  │ - wordCtrl  │  │ - validator        │ │
│  │ - admins    │  │ - studentCtrl│ └────────────────────┘ │
│  │ - words     │  │ - teacherCtrl│                        │
│  │ - games     │  │ - adminCtrl  │                        │
│  └─────────────┘  └─────────────┘                         │
│         │                │                │                │
│         └────────────────┴────────────────┘                │
│                          │                                 │
│  ┌───────────────────────▼─────────────────────────────┐  │
│  │              <<package>>                             │  │
│  │                 Models                               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ - User.js                                            │  │
│  │ - Student.js (extends User)                          │  │
│  │ - Teacher.js (extends User)                          │  │
│  │ - Admin.js (extends User)                            │  │
│  │ - Word.js                                            │  │
│  │ - GameSession.js                                     │  │
│  │ - WordSuggestion.js                                  │  │
│  │ - WordModificationRequest.js                         │  │
│  │ - TeacherRequest.js                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                 │
│  ┌───────────────────────▼─────────────────────────────┐  │
│  │              <<package>>                             │  │
│  │                Config                                │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ - database.js                                        │  │
│  │ - env.js                                             │  │
│  │ - constants.js                                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                                 │
                                 │ MongoDB Driver
                                 │
┌────────────────────────────────▼────────────────────────────┐
│                      <<package>>                             │
│                   Database (MongoDB)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────┐  ┌───────────────┐ │
│  │ Collections  │  │   Collections   │  │  Collections  │ │
│  ├──────────────┤  ├─────────────────┤  ├───────────────┤ │
│  │ - users      │  │ - wordsuggestions│ │ - words       │ │
│  │ - gamesessions│ │ - wordmodrequests│ │               │ │
│  │ - teacherrequests│└─────────────────┘ └───────────────┘ │
│  └──────────────┘                                          │
└─────────────────────────────────────────────────────────────┘

Package Dependencies:
--------------------
Frontend → Backend (HTTP REST API)
Backend → Database (MongoDB Driver)
Routes → Controllers → Models → Database
Routes → Middleware
Services → Routes (API calls)
Pages → Components
Pages → Services
```

---

## 7. COMPONENT DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Component Diagram                              │
│                  Tamil Words Learning System                         │
└─────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────┐
                    │     Web Browser         │
                    │   (Client Component)    │
                    └───────────┬─────────────┘
                                │
                                │ HTTPS
                                │
        ┌───────────────────────▼───────────────────────┐
        │         React Application                      │
        │         (Frontend Component)                   │
        ├────────────────────────────────────────────────┤
        │                                                │
        │  ┌──────────────────────────────────────────┐ │
        │  │     UI Components                        │ │
        │  ├──────────────────────────────────────────┤ │
        │  │ - NavBar Component                       │ │
        │  │ - Dashboard Component                    │ │
        │  │ - Game Component                         │ │
        │  │ - Forms Component                        │ │
        │  │ - Charts Component                       │ │
        │  └─────────────┬────────────────────────────┘ │
        │                │                              │
        │  ┌─────────────▼────────────────────────────┐ │
        │  │     Service Layer                        │ │
        │  ├──────────────────────────────────────────┤ │
        │  │ - Authentication Service                 │ │
        │  │ - Game Service                           │ │
        │  │ - Word Service                           │ │
        │  │ - Teacher Service                        │ │
        │  │ - Admin Service                          │ │
        │  └─────────────┬────────────────────────────┘ │
        │                │                              │
        │  ┌─────────────▼────────────────────────────┐ │
        │  │     HTTP Client (Axios)                  │ │
        │  │     - Interceptors                       │ │
        │  │     - Token Management                   │ │
        │  └──────────────────────────────────────────┘ │
        └────────────────────┬───────────────────────────┘
                             │
                             │ REST API Calls
                             │ (JSON over HTTP)
                             │
        ┌────────────────────▼───────────────────────────┐
        │         Express Server                         │
        │         (Backend Component)                    │
        ├────────────────────────────────────────────────┤
        │                                                │
        │  ┌──────────────────────────────────────────┐ │
        │  │     API Gateway (Express Router)         │ │
        │  ├──────────────────────────────────────────┤ │
        │  │ - /api/auth/*                            │ │
        │  │ - /api/students/*                        │ │
        │  │ - /api/teachers/*                        │ │
        │  │ - /api/admin/*                           │ │
        │  │ - /api/words/*                           │ │
        │  │ - /api/games/*                           │ │
        │  └─────────────┬────────────────────────────┘ │
        │                │                              │
        │  ┌─────────────▼────────────────────────────┐ │
        │  │     Middleware Layer                     │ │
        │  ├──────────────────────────────────────────┤ │
        │  │ - JWT Authentication                     │ │
        │  │ - Role Authorization                     │ │
        │  │ - Error Handler                          │ │
        │  │ - Request Validator                      │ │
        │  │ - CORS Handler                           │ │
        │  └─────────────┬────────────────────────────┘ │
        │                │                              │
        │  ┌─────────────▼────────────────────────────┐ │
        │  │     Business Logic Controllers           │ │
        │  ├──────────────────────────────────────────┤ │
        │  │ - Auth Controller                        │ │
        │  │ - Student Controller                     │ │
        │  │ - Teacher Controller                     │ │
        │  │ - Admin Controller                       │ │
        │  │ - Word Controller                        │ │
        │  │ - Game Controller                        │ │
        │  └─────────────┬────────────────────────────┘ │
        │                │                              │
        │  ┌─────────────▼────────────────────────────┐ │
        │  │     Data Access Layer (Models)           │ │
        │  ├──────────────────────────────────────────┤ │
        │  │ - User Model (Mongoose)                  │ │
        │  │ - Word Model (Mongoose)                  │ │
        │  │ - GameSession Model                      │ │
        │  │ - WordSuggestion Model                   │ │
        │  │ - WordModificationRequest Model          │ │
        │  │ - TeacherRequest Model                   │ │
        │  └─────────────┬────────────────────────────┘ │
        │                │                              │
        └────────────────┼──────────────────────────────┘
                         │
                         │ MongoDB Driver
                         │ (TCP Connection)
                         │
        ┌────────────────▼───────────────────────────┐
        │         MongoDB Database                   │
        │         (Data Component)                   │
        ├────────────────────────────────────────────┤
        │                                            │
        │  ┌──────────────────────────────────────┐ │
        │  │     Collections                      │ │
        │  ├──────────────────────────────────────┤ │
        │  │ - users                              │ │
        │  │ - words                              │ │
        │  │ - gamesessions                       │ │
        │  │ - wordsuggestions                    │ │
        │  │ - wordmodificationrequests           │ │
        │  │ - teacherrequests                    │ │
        │  └──────────────────────────────────────┘ │
        │                                            │
        │  ┌──────────────────────────────────────┐ │
        │  │     Indexes                          │ │
        │  ├──────────────────────────────────────┤ │
        │  │ - email (unique)                     │ │
        │  │ - username (unique)                  │ │
        │  │ - word + level (compound)            │ │
        │  │ - userId + gameType                  │ │
        │  └──────────────────────────────────────┘ │
        └────────────────────────────────────────────┘


Component Interfaces:
---------------------
React App → Express Server: RESTful HTTP/JSON API
Express Server → MongoDB: MongoDB Wire Protocol
Middleware Layer ↔ Controllers: Function calls
Controllers ↔ Models: Mongoose ORM
```

---

## 8. DEPLOYMENT DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Deployment Diagram                             │
│              Tamil Words Learning System Architecture                │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Client Device (End User)                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │              <<device>>                                     ││
│  │         Desktop / Mobile / Tablet                           ││
│  │                                                             ││
│  │  ┌────────────────────────────────────────────────────┐   ││
│  │  │        <<execution environment>>                    │   ││
│  │  │            Web Browser                              │   ││
│  │  │      (Chrome / Firefox / Safari / Edge)             │   ││
│  │  │                                                     │   ││
│  │  │  ┌───────────────────────────────────────────────┐ │   ││
│  │  │  │     <<artifact>>                              │ │   ││
│  │  │  │   React Application (SPA)                     │ │   ││
│  │  │  │   - HTML, CSS, JavaScript                     │ │   ││
│  │  │  │   - React Components                          │ │   ││
│  │  │  │   - Service Layer                             │ │   ││
│  │  │  └───────────────────────────────────────────────┘ │   ││
│  │  └────────────────────────────────────────────────────┘   ││
│  └────────────────────────────────────────────────────────────┘│
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           │ HTTPS (Port 443)
                           │ REST API Calls
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                   Application Server (Web Tier)                   │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              <<device>>                                     │ │
│  │           Linux/Windows Server                              │ │
│  │           (Cloud or On-Premise)                             │ │
│  │                                                             │ │
│  │  ┌────────────────────────────────────────────────────┐   │ │
│  │  │        <<execution environment>>                    │   │ │
│  │  │            Node.js Runtime                          │   │ │
│  │  │            (v18.x or higher)                        │   │ │
│  │  │                                                     │   │ │
│  │  │  ┌───────────────────────────────────────────────┐ │   │ │
│  │  │  │     <<artifact>>                              │ │   │ │
│  │  │  │   Express Application                         │ │   │ │
│  │  │  │   - Backend API (index.js)                    │ │   │ │
│  │  │  │   - Routes                                    │ │   │ │
│  │  │  │   - Controllers                               │ │   │ │
│  │  │  │   - Middleware                                │ │   │ │
│  │  │  │   - Models (Mongoose)                         │ │   │ │
│  │  │  │                                               │ │   │ │
│  │  │  │   Port: 5000                                  │ │   │ │
│  │  │  └───────────────────────────────────────────────┘ │   │ │
│  │  │                                                     │   │ │
│  │  │  ┌───────────────────────────────────────────────┐ │   │ │
│  │  │  │     <<artifact>>                              │ │   │ │
│  │  │  │   Frontend Build (Static Files)               │ │   │ │
│  │  │  │   - Served via Express static                 │ │   │ │
│  │  │  │   - build/ directory                          │ │   │ │
│  │  │  │                                               │ │   │ │
│  │  │  │   Port: 3000 (dev) / 80/443 (prod)           │ │   │ │
│  │  │  └───────────────────────────────────────────────┘ │   │ │
│  │  └────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           │ MongoDB Protocol
                           │ (Port 27017)
                           │ TCP Connection
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                   Database Server (Data Tier)                     │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              <<device>>                                     │ │
│  │           Linux Server                                      │ │
│  │           (Cloud or On-Premise)                             │ │
│  │                                                             │ │
│  │  ┌────────────────────────────────────────────────────┐   │ │
│  │  │        <<execution environment>>                    │   │ │
│  │  │            MongoDB Server                           │   │ │
│  │  │            (v6.x or higher)                         │   │ │
│  │  │                                                     │   │ │
│  │  │  ┌───────────────────────────────────────────────┐ │   │ │
│  │  │  │     <<database>>                              │ │   │ │
│  │  │  │   Tamil Words Database                        │ │   │ │
│  │  │  │                                               │ │   │ │
│  │  │  │   Collections:                                │ │   │ │
│  │  │  │   - users                                     │ │   │ │
│  │  │  │   - words                                     │ │   │ │
│  │  │  │   - gamesessions                              │ │   │ │
│  │  │  │   - wordsuggestions                           │ │   │ │
│  │  │  │   - wordmodificationrequests                  │ │   │ │
│  │  │  │   - teacherrequests                           │ │   │ │
│  │  │  │                                               │ │   │ │
│  │  │  │   Port: 27017                                 │ │   │ │
│  │  │  └───────────────────────────────────────────────┘ │   │ │
│  │  └────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘


Deployment Configuration:
-------------------------
Environment: Development
- Frontend: localhost:3000 (React Dev Server)
- Backend: localhost:5000 (Node.js Express)
- Database: localhost:27017 (MongoDB)

Environment: Production
- Frontend: Static files served via Express or CDN
- Backend: Node.js with PM2/Forever process manager
- Database: MongoDB with replica set for high availability
- Reverse Proxy: Nginx/Apache for load balancing
- SSL/TLS: HTTPS certificates

Network Protocols:
-----------------
- Client ↔ Web Server: HTTPS (443), HTTP (80)
- Web Server ↔ Database: MongoDB Wire Protocol (27017)
- Authentication: JWT tokens in HTTP headers

Security Layers:
---------------
- HTTPS encryption for client-server communication
- JWT token-based authentication
- Role-based authorization middleware
- Password hashing (bcrypt)
- MongoDB authentication enabled
- CORS policy configuration
```

---

*[Document continues...]*
