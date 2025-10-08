# UML DIAGRAMS - TAMIL WORDS LEARNING APPLICATION

## 1. USE CASE DIAGRAMS

### 1.1 Primary Use Case Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                 Tamil Words Learning System                      │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────┐
    │ Student │
    └────┬────┘
         │
         │ includes
         ├──────────────► (Register)
         │
         ├──────────────► (Login)
         │
         ├──────────────► (Play Word Matching Game)
         │                       │
         │                       │ extends
         │                       └─────► (Select Difficulty Level)
         │
         ├──────────────► (Play Fill in Blanks)
         │                       │
         │                       │ extends
         │                       └─────► (Submit Answer)
         │
         ├──────────────► (Play Multiple Choice)
         │                       │
         │                       │ extends
         │                       └─────► (Choose Option)
         │
         ├──────────────► (View Progress)
         │                       │
         │                       │ includes
         │                       └─────► (View Statistics)
         │
         └──────────────► (View Leaderboard)


    ┌─────────┐
    │ Teacher │
    └────┬────┘
         │
         │ includes
         ├──────────────► (Request Teacher Account)
         │                       │
         │                       │ includes
         │                       └─────► (Wait for Admin Approval)
         │
         ├──────────────► (Login)
         │
         ├──────────────► (View Word Library)
         │
         ├──────────────► (Submit Word Suggestion)
         │                       │
         │                       │ includes
         │                       └─────► (Fill Word Details)
         │
         ├──────────────► (Request Word Update)
         │                       │
         │                       │ includes
         │                       ├─────► (Provide Reason)
         │                       └─────► (Submit Changes)
         │
         ├──────────────► (Request Word Deletion)
         │                       │
         │                       │ includes
         │                       └─────► (Provide Reason)
         │
         ├──────────────► (View My Requests)
         │                       │
         │                       │ includes
         │                       ├─────► (View Status)
         │                       └─────► (View Rejection Reason)
         │
         └──────────────► (View Student Progress)


    ┌───────┐
    │ Admin │
    └───┬───┘
        │
        │ includes
        ├──────────────► (Login)
        │
        ├──────────────► (Manage Users)
        │                       │
        │                       │ includes
        │                       ├─────► (View All Users)
        │                       ├─────► (Update User Role)
        │                       └─────► (Delete User)
        │
        ├──────────────► (Review Teacher Requests)
        │                       │
        │                       │ includes
        │                       ├─────► (Approve Teacher Signup)
        │                       └─────► (Reject with Reason)
        │
        ├──────────────► (Review Word Suggestions)
        │                       │
        │                       │ includes
        │                       ├─────► (View Suggestion Details)
        │                       ├─────► (Approve Suggestion)
        │                       │       │
        │                       │       │ includes
        │                       │       └──► (Add to Word Database)
        │                       └─────► (Reject with Reason)
        │
        ├──────────────► (Review Modification Requests)
        │                       │
        │                       │ includes
        │                       ├─────► (View Original vs Updated)
        │                       ├─────► (Approve Update)
        │                       │       │
        │                       │       │ includes
        │                       │       └──► (Update Word in Database)
        │                       ├─────► (Approve Deletion)
        │                       │       │
        │                       │       │ includes
        │                       │       └──► (Delete from Database)
        │                       └─────► (Reject with Reason)
        │
        ├──────────────► (Manage Words)
        │                       │
        │                       │ includes
        │                       ├─────► (Add Word Directly)
        │                       ├─────► (Edit Word)
        │                       └─────► (Delete Word)
        │
        └──────────────► (View Statistics)
                                │
                                │ includes
                                ├─────► (View Pending Counts)
                                ├─────► (View User Statistics)
                                └─────► (View Word Statistics)


    ┌──────────────┐
    │ External API │
    └──────┬───────┘
           │
           │ provides
           └──────────────► (Authentication Service)
                                   │
                                   │ includes
                                   ├─────► (Generate JWT Token)
                                   ├─────► (Verify Token)
                                   └─────► (Hash Password)
```

---

### 1.2 Student Use Case Diagram (Detailed)

```
┌────────────────────────────────────────────────────────┐
│              Student Module Use Cases                   │
└────────────────────────────────────────────────────────┘

         ┌─────────┐
         │ Student │
         └────┬────┘
              │
              ├──► (Register Account)
              │           │
              │           │ includes
              │           ├──► (Enter Username)
              │           ├──► (Enter Email)
              │           ├──► (Enter Password)
              │           ├──► (Enter Full Name)
              │           └──► (Submit Registration)
              │
              ├──► (Login)
              │           │
              │           │ includes
              │           ├──► (Enter Credentials)
              │           └──► (Receive JWT Token)
              │
              ├──► (Select Game Type)
              │           │
              │           │ extends
              │           ├──► (Word Matching)
              │           ├──► (Fill in Blanks)
              │           └──► (Multiple Choice)
              │
              ├──► (Play Game)
              │           │
              │           │ includes
              │           ├──► (Select Difficulty)
              │           ├──► (Fetch Random Words)
              │           ├──► (Submit Answers)
              │           ├──► (Calculate Score)
              │           ├──► (Update Points)
              │           └──► (Save Game Session)
              │
              ├──► (View Dashboard)
              │           │
              │           │ includes
              │           ├──► (View Total Points)
              │           ├──► (View Current Level)
              │           ├──► (View Games Played)
              │           ├──► (View Accuracy)
              │           └──► (View Average Score)
              │
              ├──► (View Progress Charts)
              │           │
              │           │ includes
              │           ├──► (View Points Over Time)
              │           └──► (View Game History)
              │
              └──► (Logout)

```

---

### 1.3 Teacher Use Case Diagram (Detailed)

```
┌────────────────────────────────────────────────────────┐
│              Teacher Module Use Cases                   │
└────────────────────────────────────────────────────────┘

         ┌─────────┐
         │ Teacher │
         └────┬────┘
              │
              ├──► (Request Teacher Account)
              │           │
              │           │ includes
              │           ├──► (Fill Teacher Request Form)
              │           ├──► (Submit Request)
              │           └──► (Wait for Approval)
              │
              ├──► (View Word Library)
              │           │
              │           │ includes
              │           ├──► (Search Words)
              │           ├──► (Filter by Level)
              │           └──► (Filter by Domain)
              │
              ├──► (Submit Word Suggestion)
              │           │
              │           │ includes
              │           ├──► (Enter Tamil Word)
              │           ├──► (Enter Tamil Meaning)
              │           ├──► (Enter English Meaning)
              │           ├──► (Select Level)
              │           ├──► (Enter Domain)
              │           ├──► (Enter Period)
              │           ├──► (Add Notes)
              │           └──► (Submit for Approval)
              │
              ├──► (Request Word Update)
              │           │
              │           │ includes
              │           ├──► (Select Word)
              │           ├──► (Modify Details)
              │           ├──► (Provide Reason)
              │           └──► (Submit Update Request)
              │
              ├──► (Request Word Deletion)
              │           │
              │           │ includes
              │           ├──► (Select Word)
              │           ├──► (Provide Deletion Reason)
              │           └──► (Submit Delete Request)
              │
              ├──► (View My Requests)
              │           │
              │           │ includes
              │           ├──► (View Suggestions)
              │           │       │
              │           │       │ includes
              │           │       ├──► (View Pending)
              │           │       ├──► (View Approved)
              │           │       └──► (View Rejected)
              │           │
              │           └──► (View Modification Requests)
              │                   │
              │                   │ includes
              │                   ├──► (View Update Requests)
              │                   ├──► (View Delete Requests)
              │                   └──► (View Rejection Reasons)
              │
              └──► (View Student Progress)
                          │
                          │ includes
                          ├──► (View All Students)
                          ├──► (View Individual Performance)
                          ├──► (View Games Played)
                          └──► (View Accuracy Rates)

```

---

### 1.4 Admin Use Case Diagram (Detailed)

```
┌────────────────────────────────────────────────────────┐
│              Admin Module Use Cases                     │
└────────────────────────────────────────────────────────┘

         ┌───────┐
         │ Admin │
         └───┬───┘
             │
             ├──► (View Dashboard)
             │           │
             │           │ includes
             │           ├──► (View Statistics)
             │           ├──► (View Pending Counts)
             │           └──► (View System Overview)
             │
             ├──► (Manage Teacher Requests)
             │           │
             │           │ includes
             │           ├──► (View Pending Requests)
             │           ├──► (Review Teacher Details)
             │           ├──► (Approve Request)
             │           │       │
             │           │       │ includes
             │           │       └──► (Create Teacher Account)
             │           └──► (Reject Request)
             │                   │
             │                   │ includes
             │                   └──► (Provide Rejection Reason)
             │
             ├──► (Manage Word Suggestions)
             │           │
             │           │ includes
             │           ├──► (View Pending Suggestions)
             │           ├──► (Review Word Details)
             │           ├──► (Approve Suggestion)
             │           │       │
             │           │       │ includes
             │           │       ├──► (Validate Word Data)
             │           │       └──► (Add to Database)
             │           └──► (Reject Suggestion)
             │                   │
             │                   │ includes
             │                   └──► (Provide Rejection Reason)
             │
             ├──► (Manage Modification Requests)
             │           │
             │           │ includes
             │           ├──► (View Pending Modifications)
             │           ├──► (Review Update Requests)
             │           │       │
             │           │       │ includes
             │           │       ├──► (View Original Data)
             │           │       ├──► (View Updated Data)
             │           │       └──► (Compare Changes)
             │           ├──► (Review Delete Requests)
             │           │       │
             │           │       │ includes
             │           │       └──► (View Deletion Reason)
             │           ├──► (Approve Modification)
             │           │       │
             │           │       │ extends
             │           │       ├──► (Update Word in Database)
             │           │       └──► (Delete Word from Database)
             │           └──► (Reject Modification)
             │                   │
             │                   │ includes
             │                   └──► (Provide Rejection Reason)
             │
             ├──► (Manage Users)
             │           │
             │           │ includes
             │           ├──► (View All Users)
             │           ├──► (Filter by Role)
             │           ├──► (Update User Details)
             │           ├──► (Change User Role)
             │           └──► (Delete User)
             │
             └──► (Manage Words)
                         │
                         │ includes
                         ├──► (View All Words)
                         ├──► (Add Word Directly)
                         ├──► (Edit Word)
                         ├──► (Delete Word)
                         └──► (Export Word List)

```

---

## 2. CLASS DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Class Diagram                                    │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐
│         User             │
├──────────────────────────┤
│ - _id: ObjectId          │
│ - username: String       │
│ - email: String          │
│ - password: String       │
│ - role: String           │
│ - fullName: String       │
│ - points: Number         │
│ - level: Number          │
│ - createdAt: Date        │
│ - updatedAt: Date        │
├──────────────────────────┤
│ + register()             │
│ + login()                │
│ + updateProfile()        │
│ + changePassword()       │
│ + incrementPoints()      │
│ + calculateLevel()       │
└──────────────────────────┘
        △
        │ inherits
        ├─────────────────────────────────────┬──────────────────────┐
        │                                     │                      │
┌───────┴────────┐              ┌─────────────┴──────┐    ┌─────────┴──────┐
│    Student     │              │      Teacher       │    │     Admin      │
├────────────────┤              ├────────────────────┤    ├────────────────┤
│ - gamesPlayed  │              │ - requestStatus    │    │ - permissions  │
│ - totalScore   │              │ - approvedAt       │    │ - lastLogin    │
│ - accuracy     │              ├────────────────────┤    ├────────────────┤
├────────────────┤              │ + submitSuggestion()│   │ + approveUser()│
│ + playGame()   │              │ + requestUpdate()  │    │ + rejectUser() │
│ + viewProgress()│              │ + requestDelete()  │    │ + manageWords()│
│ + getStatistics()│             │ + viewRequests()   │    │ + viewStats()  │
└────────────────┘              └────────────────────┘    └────────────────┘
        │                                  │                       │
        │ plays                            │ submits               │ manages
        │ *                                │ *                     │ *
        ▼                                  ▼                       ▼
┌──────────────────────────┐    ┌───────────────────┐   ┌────────────────┐
│      GameSession         │    │  WordSuggestion   │   │  WordModReq    │
├──────────────────────────┤    ├───────────────────┤   ├────────────────┤
│ - _id: ObjectId          │    │ - _id: ObjectId   │   │ - _id: ObjectId│
│ - userId: ObjectId       │    │ - word: String    │   │ - wordId: OID  │
│ - gameType: String       │    │ - meaning_ta: Str │   │ - requestType  │
│ - level: Number          │    │ - meaning_en: Str │   │ - originalWord │
│ - score: Number          │    │ - level: Number   │   │ - updatedData  │
│ - totalQuestions: Number │    │ - suggestedBy: OID│   │ - reason: Str  │
│ - correctAnswers: Number │    │ - status: String  │   │ - requestedBy  │
│ - accuracy: Number       │    │ - reviewedBy: OID │   │ - status: Str  │
│ - timeTaken: Number      │    │ - createdAt: Date │   │ - reviewedBy   │
│ - createdAt: Date        │    │ - reviewedAt: Date│   │ - createdAt    │
├──────────────────────────┤    ├───────────────────┤   ├────────────────┤
│ + calculateScore()       │    │ + approve()       │   │ + approve()    │
│ + calculateAccuracy()    │    │ + reject()        │   │ + reject()     │
│ + saveSession()          │    │ + addToDatabase() │   │ + updateDB()   │
└──────────────────────────┘    └───────────────────┘   └────────────────┘
        │ uses                          │                       │
        │ *                             │ becomes               │ modifies
        ▼                               ▼ 1                     ▼ 1
┌──────────────────────────┐    ┌─────────────────────────────────────┐
│          Word            │◄───│              Word                   │
├──────────────────────────┤    ├─────────────────────────────────────┤
│ - _id: ObjectId          │    │ - _id: ObjectId                     │
│ - word: String           │    │ - word: String                      │
│ - meaning_ta: String     │    │ - meaning_ta: String                │
│ - meaning_en: String     │    │ - meaning_en: String                │
│ - level: Number          │    │ - level: Number (1-5)               │
│ - domain: String         │    │ - domain: String                    │
│ - period: String         │    │ - period: String                    │
│ - notes: String          │    │ - notes: String                     │
│ - addedBy: ObjectId      │    │ - addedBy: ObjectId                 │
│ - createdAt: Date        │    │ - createdAt: Date                   │
│ - updatedAt: Date        │    │ - updatedAt: Date                   │
├──────────────────────────┤    ├─────────────────────────────────────┤
│ + getByLevel()           │    │ + create()                          │
│ + search()               │    │ + update()                          │
│ + getRandomSet()         │    │ + delete()                          │
│ + filterByDomain()       │    │ + getByLevel()                      │
└──────────────────────────┘    │ + search()                          │
                                 │ + filterByDomain()                  │
┌──────────────────────────┐    │ + getRandomWords()                  │
│    TeacherRequest        │    └─────────────────────────────────────┘
├──────────────────────────┤
│ - _id: ObjectId          │
│ - username: String       │
│ - email: String          │
│ - password: String       │
│ - fullName: String       │
│ - status: String         │
│ - reviewedBy: ObjectId   │
│ - reviewedAt: Date       │
│ - rejectionReason: String│
│ - createdAt: Date        │
├──────────────────────────┤
│ + approve()              │
│ + reject()               │
│ + createTeacherAccount() │
└──────────────────────────┘

┌──────────────────────────────────────────────┐
│         AuthenticationService                 │
├──────────────────────────────────────────────┤
│ - secretKey: String                          │
├──────────────────────────────────────────────┤
│ + hashPassword(password: String): String     │
│ + comparePassword(plain, hash): Boolean      │
│ + generateToken(user: User): String          │
│ + verifyToken(token: String): Object         │
│ + authenticateRequest(req, res, next)        │
└──────────────────────────────────────────────┘
                    │ uses
                    ▼
┌──────────────────────────────────────────────┐
│         AuthorizationMiddleware               │
├──────────────────────────────────────────────┤
│ + authorizeRoles(roles: Array): Function     │
│ + checkPermission(user, resource): Boolean   │
└──────────────────────────────────────────────┘

```

---

*[Continue in next file...]*
