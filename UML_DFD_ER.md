# DATA FLOW DIAGRAMS AND ER DIAGRAM

## 1. DATA FLOW DIAGRAM (DFD)

### 1.1 Level 0 DFD (Context Diagram)

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Context Diagram (Level 0)                       │
│                  Tamil Words Learning System                         │
└─────────────────────────────────────────────────────────────────────┘


      ┌──────────────┐                                  ┌──────────────┐
      │              │                                  │              │
      │   Student    │                                  │   Teacher    │
      │              │                                  │              │
      └───────┬──────┘                                  └──────┬───────┘
              │                                                │
              │ Registration                    Account Request│
              │ Login                           Word Requests  │
              │ Game Selection                  View Progress  │
              │ Answer Submission                              │
              │                                                │
              │                                                │
              │         ┌──────────────────────┐              │
              │         │                      │              │
              └────────►│                      │◄─────────────┘
                        │                      │
      Game Results      │   Tamil Words        │   Request Status
      Progress Reports  │   Learning System    │   Approval Notifications
      Leaderboard       │   (Process)          │   Student Reports
                        │                      │
              ┌────────►│                      │◄─────────────┐
              │         │                      │              │
              │         │                      │              │
              │         └──────────────────────┘              │
              │                                                │
              │                                                │
              │ Admin Login            Approval Decisions     │
              │ Request Review         User Management        │
              │ Statistics View        Word Management        │
              │                                                │
      ┌───────┴──────┐                                  ┌─────▼──────┐
      │              │                                  │            │
      │    Admin     │                                  │  Database  │
      │              │                                  │  (Store)   │
      └──────────────┘                                  └────────────┘


External Entities:
-----------------
1. Student - Plays games, views progress
2. Teacher - Requests words, views student data
3. Admin - Manages system, approves requests
4. Database - Persistent data store

Data Flows:
-----------
Student → System: Registration, Login, Game Selection, Answers
System → Student: Game Results, Progress, Leaderboard
Teacher → System: Account Request, Word Suggestions, Modifications
System → Teacher: Request Status, Approval Notifications, Reports
Admin → System: Login, Request Review, Approval Decisions
System → Admin: Pending Requests, Statistics, User Data
System ↔ Database: Read/Write all persistent data
```

---

### 1.2 Level 1 DFD (Detailed Process Breakdown)

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Level 1 Data Flow Diagram                       │
│                  Tamil Words Learning System                         │
└─────────────────────────────────────────────────────────────────────┘


   ┌──────────┐           ┌──────────┐           ┌──────────┐
   │ Student  │           │ Teacher  │           │  Admin   │
   └────┬─────┘           └────┬─────┘           └────┬─────┘
        │                      │                       │
        │ Credentials          │ Credentials           │ Credentials
        │                      │                       │
        │    ┌─────────────────▼───────────────────────▼─────┐
        │    │         1.0 Authentication Process            │
        │    │   - Validate credentials                      │
        │    │   - Generate JWT token                        │
        │    │   - Return user role                          │
        │    └──────────┬───────────────────────┬────────────┘
        │               │ Token                 │ Token
        │               │                       │
        │               │                       │
        │ Select Game   │ Submit Request        │ View Requests
        │ Select Level  │                       │
        │               │                       │
   ┌────▼───────────────▼───────────────────────▼───────────┐
   │         2.0 Game Management Process                     │
   │   - Fetch words by level                                │
   │   - Create game session                                 │
   │   - Validate answers                                    │
   │   - Calculate score & points                            │
   │   - Update student progress                             │
   └────┬──────────────────────────┬─────────────────────────┘
        │ Game Results             │
        │ Updated Progress         │
        │                          │
        │                          │ Read Words
        │                          │ Write Session
        │                          │
        │                          │
   ┌────┴──────────────────────────▼─────────────────────────┐
   │         3.0 Request Management Process                   │
   │   - Receive word suggestions                             │
   │   - Receive modification requests                        │
   │   - Receive teacher account requests                     │
   │   - Store pending requests                               │
   └────┬──────────────────────────┬─────────────────────────┘
        │ Request Status           │
        │                          │
        │                          │ Pending Requests
        │                          │
        │                          │
        │                     ┌────▼──────────────────────────┐
        │                     │  4.0 Approval Process          │
        │                     │  - Review requests             │
        │                     │  - Approve/Reject              │
        │                     │  - Update database             │
        │                     │  - Notify requestor            │
        │                     └────┬──────────────────────────┘
        │                          │ Approval Decision
        │                          │ Notifications
        │                          │
        │                          │
   ┌────▼──────────────────────────▼─────────────────────────┐
   │         5.0 User Management Process                      │
   │   - Create/Update/Delete users                           │
   │   - Assign roles                                         │
   │   - Track user activity                                  │
   │   - Generate statistics                                  │
   └────┬──────────────────────────┬─────────────────────────┘
        │ User Data                │
        │ Statistics               │
        │                          │
        │                          │
        │                          │
        ▼                          ▼
   ╔═══════════════════════════════════════════════════════╗
   ║                    DATA STORES                         ║
   ╠═══════════════════════════════════════════════════════╣
   ║                                                        ║
   ║  D1: Users Store                                       ║
   ║      - users collection                                ║
   ║      - Student, Teacher, Admin documents               ║
   ║                                                        ║
   ║  D2: Words Store                                       ║
   ║      - words collection                                ║
   ║      - Tamil words with translations, meanings         ║
   ║                                                        ║
   ║  D3: Game Sessions Store                               ║
   ║      - gamesessions collection                         ║
   ║      - Game history, scores, answers                   ║
   ║                                                        ║
   ║  D4: Requests Store                                    ║
   ║      - wordsuggestions collection                      ║
   ║      - wordmodificationrequests collection             ║
   ║      - teacherrequests collection                      ║
   ║                                                        ║
   ╚═══════════════════════════════════════════════════════╝


Process Descriptions:
--------------------
1.0 Authentication Process
    Input: User credentials (email, password)
    Output: JWT token, user role
    Data Stores: D1 (Users)

2.0 Game Management Process
    Input: Game type, level, answers
    Output: Score, points, progress
    Data Stores: D2 (Words), D3 (Game Sessions), D1 (Users)

3.0 Request Management Process
    Input: Word suggestions, modification requests, teacher requests
    Output: Request confirmation, status
    Data Stores: D4 (Requests)

4.0 Approval Process
    Input: Admin decisions (approve/reject)
    Output: Approval notifications, database updates
    Data Stores: D1 (Users), D2 (Words), D4 (Requests)

5.0 User Management Process
    Input: User data, role assignments
    Output: User profiles, statistics
    Data Stores: D1 (Users), D3 (Game Sessions)
```

---

### 1.3 Level 2 DFD - Game Management Process (Expanded)

```
┌─────────────────────────────────────────────────────────────────────┐
│              Level 2 DFD: Game Management Process                    │
└─────────────────────────────────────────────────────────────────────┘


     ┌──────────┐
     │ Student  │
     └────┬─────┘
          │
          │ Game Type, Level
          │
     ┌────▼─────────────────────────┐
     │  2.1 Initialize Game         │
     │  - Validate student           │
     │  - Validate level             │
     │  - Create session             │
     └────┬─────────────────────────┘
          │ Session ID
          │ Level
          ▼
     ╔═══════════════════╗
     ║ D3: Game Sessions ║────────┐
     ╚═══════════════════╝        │ Read
                                  │
     ┌────────────────────────────▼───┐
     │  2.2 Fetch Questions           │
     │  - Query words by level         │
     │  - Filter by game type          │
     │  - Randomize selection          │
     └────┬───────────────────────────┘
          │ Word List
          │
          ▼
     ╔═══════════╗
     ║ D2: Words ║────────┐
     ╚═══════════╝        │ Read Words
                          │
     ┌────────────────────▼───────┐
     │  2.3 Present Questions     │
     │  - Format questions         │
     │  - Track time               │
     │  - Accept answers           │
     └────┬───────────────────────┘
          │ Student Answers
          │
          ▼
     ┌────────────────────────────┐
     │  2.4 Validate & Score      │
     │  - Check answers            │
     │  - Calculate accuracy       │
     │  - Compute score            │
     │  - Determine points         │
     └────┬───────────────────────┘
          │ Score, Points
          │
          ▼
     ┌────────────────────────────┐
     │  2.5 Update Progress       │
     │  - Add points to user       │
     │  - Update level if needed   │
     │  - Save session data        │
     └────┬───────────────────────┘
          │
          ├──────► ╔═══════════════════╗
          │        ║ D3: Game Sessions ║ (Write)
          │        ╚═══════════════════╝
          │
          └──────► ╔═══════════╗
                   ║ D1: Users ║ (Update points/level)
                   ╚═══════════╝
          │
          │ Results, Updated Progress
          ▼
     ┌──────────┐
     │ Student  │
     └──────────┘
```

---

## 2. ENTITY-RELATIONSHIP (ER) DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                   Entity-Relationship Diagram                        │
│                  Tamil Words Learning Database                       │
└─────────────────────────────────────────────────────────────────────┘


                        ┌────────────────────┐
                        │       USER         │
                        ├────────────────────┤
                        │ PK _id             │
                        │    username        │
                        │    email           │
                        │    password (hash) │
                        │    role            │
                        │    createdAt       │
                        └────────┬───────────┘
                                 │
                    ╔════════════╪════════════╗
                    ║ Inheritance (ISA)        ║
                    ╚════════════╪════════════╝
                                 │
           ┌─────────────────────┼─────────────────────┐
           │                     │                     │
  ┌────────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
  │    STUDENT      │  │    TEACHER      │  │     ADMIN       │
  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤
  │ PK _id (FK User)│  │ PK _id (FK User)│  │ PK _id (FK User)│
  │    points       │  │    specialization│  │    permissions  │
  │    level        │  │    qualification│  │    adminLevel   │
  │    gamesPlayed  │  │    verified     │  └─────────────────┘
  │    accuracy     │  │    approvedBy   │           │
  └────────┬────────┘  └────────┬────────┘           │
           │                    │                     │
           │ 1                  │ 1                   │ 1
           │                    │                     │
           │ Plays              │ Submits             │ Reviews
           │                    │                     │
           │ N                  │ N                   │ N
           │                    │                     │
  ┌────────▼────────┐  ┌────────▼─────────────┐     │
  │  GAME SESSION   │  │  WORD SUGGESTION     │     │
  ├─────────────────┤  ├──────────────────────┤     │
  │ PK _id          │  │ PK _id               │     │
  │ FK studentId    │  │ FK teacherId         │     │
  │ FK words[]      │  │    word              │     │
  │    gameType     │  │    meaning           │     │
  │    level        │  │    tamilDefinition   │     │
  │    score        │  │    level             │     │
  │    answers[]    │  │    examples[]        │     │
  │    startTime    │  │    category          │     │
  │    endTime      │  │    status            │     │
  │    completed    │  │ FK reviewedBy        │◄────┘
  └────────┬────────┘  │    reviewedAt        │
           │           │    rejectionReason   │
           │ N         └──────────────────────┘
           │                    │
           │ References         │ 1
           │                    │
           │ N                  │ For Adding
           │                    │
  ┌────────▼────────┐           │ 1
  │      WORD       │◄──────────┘
  ├─────────────────┤
  │ PK _id          │           ┌─────────────────────────┐
  │    word         │           │ WORD MODIFICATION       │
  │    meaning      │◄──────────┤ REQUEST                 │
  │    tamilDef     │ N         ├─────────────────────────┤
  │    level        │           │ PK _id                  │
  │    examples[]   │ Modifies  │ FK teacherId            │
  │    category     │           │ FK originalWordId       │
  │    addedBy      │ 1         │    requestType          │
  │    createdAt    │           │    newWord              │
  └─────────────────┘           │    newMeaning           │
           │                    │    newTamilDefinition   │
           │                    │    newExamples[]        │
           │                    │    reason               │
           │                    │    status               │
           │                    │ FK reviewedBy           │──┐
           │                    │    reviewedAt           │  │
           │                    │    rejectionReason      │  │
           │                    └─────────────────────────┘  │
           │                                                  │
           │                                                  │
           │                    ┌─────────────────────────┐  │
           │                    │  TEACHER REQUEST        │  │
           │                    ├─────────────────────────┤  │
           │                    │ PK _id                  │  │
           │                    │    name                 │  │
           │                    │    email                │  │
           │                    │    qualification        │  │
           │                    │    specialization       │  │
           │                    │    reason               │  │
           │                    │    status               │  │
           │                    │ FK reviewedBy           │──┘
           │                    │    reviewedAt           │
           │                    │    rejectionReason      │
           │                    │    createdAt            │
           │                    └─────────────────────────┘
           │
           └─────────────────────────────────────────────────┘


Relationships:
--------------
1. USER → STUDENT/TEACHER/ADMIN (ISA Inheritance)
   - One user is exactly one role (disjoint, complete)

2. STUDENT → GAME SESSION (1:N)
   - One student plays many game sessions
   - Cardinality: 1 student : 0..* sessions
   - FK: GameSession.studentId references Student._id

3. GAME SESSION → WORD (N:M)
   - One session uses multiple words
   - One word can be in multiple sessions
   - Implemented as: GameSession.words[] (array of Word IDs)

4. TEACHER → WORD SUGGESTION (1:N)
   - One teacher submits many suggestions
   - Cardinality: 1 teacher : 0..* suggestions
   - FK: WordSuggestion.teacherId references Teacher._id

5. TEACHER → WORD MODIFICATION REQUEST (1:N)
   - One teacher submits many modification requests
   - Cardinality: 1 teacher : 0..* requests
   - FK: WordModificationRequest.teacherId references Teacher._id

6. WORD MODIFICATION REQUEST → WORD (N:1)
   - Many modification requests for one word
   - Cardinality: 0..* requests : 1 word
   - FK: WordModificationRequest.originalWordId references Word._id

7. ADMIN → WORD SUGGESTION (1:N - Reviews)
   - One admin reviews many suggestions
   - Cardinality: 1 admin : 0..* suggestions
   - FK: WordSuggestion.reviewedBy references Admin._id

8. ADMIN → WORD MODIFICATION REQUEST (1:N - Reviews)
   - One admin reviews many modification requests
   - Cardinality: 1 admin : 0..* requests
   - FK: WordModificationRequest.reviewedBy references Admin._id

9. ADMIN → TEACHER REQUEST (1:N - Reviews)
   - One admin reviews many teacher account requests
   - Cardinality: 1 admin : 0..* requests
   - FK: TeacherRequest.reviewedBy references Admin._id

10. WORD SUGGESTION → WORD (1:1 - Creates)
    - When approved, suggestion becomes a word
    - Implemented as: Copy data from suggestion to new Word document


Attributes Legend:
-----------------
PK = Primary Key
FK = Foreign Key
[] = Array/List attribute


Constraints:
-----------
- User.email: UNIQUE, NOT NULL
- User.username: UNIQUE, NOT NULL
- Word.word: UNIQUE (per level)
- Student.points: ≥ 0
- Student.level: ≥ 1
- GameSession.score: 0-100
- Request status: ENUM('pending', 'approved', 'rejected')
- User.role: ENUM('student', 'teacher', 'admin')
- Word.level: 1-10
- GameType: ENUM('english-to-tamil', 'tamil-to-english', 'fill-in-the-blank')
```

---

*[Document continues...]*
