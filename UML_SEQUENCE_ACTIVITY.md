# UML DIAGRAMS (Continued) - BEHAVIORAL DIAGRAMS

## 3. SEQUENCE DIAGRAMS

### 3.1 User Authentication Sequence Diagram

```
┌──────┐    ┌──────────┐    ┌────────┐    ┌──────────┐    ┌──────────┐
│Client│    │Frontend  │    │Backend │    │Auth      │    │Database  │
│      │    │(React)   │    │(Express│    │Service   │    │(MongoDB) │
└──┬───┘    └────┬─────┘    └───┬────┘    └────┬─────┘    └────┬─────┘
   │             │                │              │               │
   │ Enter Login Credentials      │              │               │
   ├────────────►│                │              │               │
   │             │                │              │               │
   │             │ POST /api/auth/login          │               │
   │             ├───────────────►│              │               │
   │             │                │              │               │
   │             │                │ findUser(email)              │
   │             │                ├──────────────────────────────►│
   │             │                │              │               │
   │             │                │   User Document              │
   │             │                │◄──────────────────────────────┤
   │             │                │              │               │
   │             │                │ comparePassword(password, hash)
   │             │                ├─────────────►│               │
   │             │                │              │               │
   │             │                │   isValid: true              │
   │             │                │◄─────────────┤               │
   │             │                │              │               │
   │             │                │ generateToken(user)          │
   │             │                ├─────────────►│               │
   │             │                │              │               │
   │             │                │   JWT Token  │               │
   │             │                │◄─────────────┤               │
   │             │                │              │               │
   │             │  { token, user, role }        │               │
   │             │◄───────────────┤              │               │
   │             │                │              │               │
   │ Store Token in LocalStorage  │              │               │
   │◄────────────┤                │              │               │
   │             │                │              │               │
   │ Redirect to Dashboard        │              │               │
   │◄────────────┤                │              │               │
   │             │                │              │               │
```

---

### 3.2 Word Suggestion Approval Sequence Diagram

```
┌─────────┐   ┌──────────┐   ┌────────┐   ┌──────────┐   ┌──────────┐
│Teacher  │   │Frontend  │   │Backend │   │Suggestion│   │Database  │
│         │   │(React)   │   │API     │   │Service   │   │(MongoDB) │
└────┬────┘   └────┬─────┘   └───┬────┘   └────┬─────┘   └────┬─────┘
     │             │               │             │              │
     │ Fill Word Suggestion Form   │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │             │ POST /api/teachers/suggestions            │
     │             ├──────────────►│             │              │
     │             │               │             │              │
     │             │               │ createSuggestion()         │
     │             │               ├────────────►│              │
     │             │               │             │              │
     │             │               │             │ insert suggestion
     │             │               │             ├─────────────►│
     │             │               │             │              │
     │             │               │             │ suggestion_id│
     │             │               │             │◄─────────────┤
     │             │               │             │              │
     │             │               │ { message, suggestion }    │
     │             │               │◄────────────┤              │
     │             │               │             │              │
     │             │  Success Message            │              │
     │             │◄──────────────┤             │              │
     │             │               │             │              │
     │ Display Success Alert       │             │              │
     │◄────────────┤               │             │              │
     │             │               │             │              │
     │             │               │             │              │
     ═════════════════════════════════════════════════════════════
     │                     Admin Reviews Suggestion              │
     ═════════════════════════════════════════════════════════════
     │             │               │             │              │
┌────┴────┐        │               │             │              │
│ Admin   │        │               │             │              │
└────┬────┘        │               │             │              │
     │             │               │             │              │
     │ Click Approve Button        │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │             │ POST /api/admin/suggestions/:id/approve   │
     │             ├──────────────►│             │              │
     │             │               │             │              │
     │             │               │ findSuggestion(id)         │
     │             │               ├────────────────────────────►│
     │             │               │             │              │
     │             │               │     Suggestion Document    │
     │             │               │◄────────────────────────────┤
     │             │               │             │              │
     │             │               │ validateAndInsertWord()    │
     │             │               ├────────────►│              │
     │             │               │             │              │
     │             │               │             │ INSERT into words
     │             │               │             ├─────────────►│
     │             │               │             │              │
     │             │               │             │ word_id      │
     │             │               │             │◄─────────────┤
     │             │               │             │              │
     │             │               │ updateSuggestionStatus()   │
     │             │               ├────────────►│              │
     │             │               │             │              │
     │             │               │             │ UPDATE status='approved'
     │             │               │             ├─────────────►│
     │             │               │             │              │
     │             │               │ { message, word }          │
     │             │               │◄────────────┤              │
     │             │               │             │              │
     │             │  Success: Word Added        │              │
     │             │◄──────────────┤             │              │
     │             │               │             │              │
     │ Refresh Suggestions List    │             │              │
     │◄────────────┤               │             │              │
     │             │               │             │              │
```

---

### 3.3 Game Play Sequence Diagram

```
┌─────────┐   ┌──────────┐   ┌────────┐   ┌──────────┐   ┌──────────┐
│Student  │   │Frontend  │   │Backend │   │Game      │   │Database  │
│         │   │(React)   │   │API     │   │Service   │   │(MongoDB) │
└────┬────┘   └────┬─────┘   └───┬────┘   └────┬─────┘   └────┬─────┘
     │             │               │             │              │
     │ Select Game Type & Level    │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │             │ POST /api/games/start       │              │
     │             ├──────────────►│             │              │
     │             │               │             │              │
     │             │               │ getRandomWords(level, count)
     │             │               ├────────────────────────────►│
     │             │               │             │              │
     │             │               │     Random Words Array     │
     │             │               │◄────────────────────────────┤
     │             │               │             │              │
     │             │               │ prepareGameData()          │
     │             │               ├────────────►│              │
     │             │               │             │              │
     │             │               │ { gameId, questions }      │
     │             │               │◄────────────┤              │
     │             │               │             │              │
     │             │  Game Questions             │              │
     │             │◄──────────────┤             │              │
     │             │               │             │              │
     │ Display Game Questions      │             │              │
     │◄────────────┤               │             │              │
     │             │               │             │              │
     │ Answer Questions            │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │             │ POST /api/games/submit      │              │
     │             ├──────────────►│             │              │
     │             │               │             │              │
     │             │               │ calculateScore(answers)    │
     │             │               ├────────────►│              │
     │             │               │             │              │
     │             │               │ { score, accuracy, points }│
     │             │               │◄────────────┤              │
     │             │               │             │              │
     │             │               │ saveGameSession()          │
     │             │               ├────────────────────────────►│
     │             │               │             │              │
     │             │               │ updateUserPoints()         │
     │             │               ├────────────────────────────►│
     │             │               │             │              │
     │             │               │ updateUserLevel()          │
     │             │               ├────────────────────────────►│
     │             │               │             │              │
     │             │  { results, newPoints, newLevel }         │
     │             │◄──────────────┤             │              │
     │             │               │             │              │
     │ Display Results & Updated Stats           │              │
     │◄────────────┤               │             │              │
     │             │               │             │              │
```

---

### 3.4 Word Modification Request Sequence Diagram

```
┌─────────┐   ┌──────────┐   ┌────────┐   ┌──────────┐   ┌──────────┐
│Teacher  │   │Frontend  │   │Backend │   │ModReq    │   │Database  │
│         │   │(React)   │   │API     │   │Service   │   │(MongoDB) │
└────┬────┘   └────┬─────┘   └───┬────┘   └────┬─────┘   └────┬─────┘
     │             │               │             │              │
     │ Click Edit on Word          │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │ Modify Word Data            │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │ Enter Reason for Update     │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │             │ POST /api/teachers/word-modifications/update/:wordId
     │             ├──────────────►│             │              │
     │             │               │             │              │
     │             │               │ getOriginalWord(wordId)    │
     │             │               ├────────────────────────────►│
     │             │               │             │              │
     │             │               │   Original Word Document   │
     │             │               │◄────────────────────────────┤
     │             │               │             │              │
     │             │               │ createModificationRequest()│
     │             │               ├────────────►│              │
     │             │               │             │              │
     │             │               │             │ INSERT modification request
     │             │               │             ├─────────────►│
     │             │               │             │              │
     │             │               │ { message, request }       │
     │             │               │◄────────────┤              │
     │             │               │             │              │
     │             │  Success: Request Submitted │              │
     │             │◄──────────────┤             │              │
     │             │               │             │              │
     │ Display Success Alert       │             │              │
     │◄────────────┤               │             │              │
     │             │               │             │              │
     │             │               │             │              │
     ═════════════════════════════════════════════════════════════
     │                     Admin Approves Modification           │
     ═════════════════════════════════════════════════════════════
     │             │               │             │              │
┌────┴────┐        │               │             │              │
│ Admin   │        │               │             │              │
└────┬────┘        │               │             │              │
     │             │               │             │              │
     │ Review Original vs Updated  │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │ Click Approve Update        │             │              │
     ├────────────►│               │             │              │
     │             │               │             │              │
     │             │ POST /api/admin/word-modifications/:id/approve
     │             ├──────────────►│             │              │
     │             │               │             │              │
     │             │               │ findModificationRequest(id)│
     │             │               ├────────────────────────────►│
     │             │               │             │              │
     │             │               │   Modification Request     │
     │             │               │◄────────────────────────────┤
     │             │               │             │              │
     │             │               │ updateWordInDatabase()     │
     │             │               ├────────────►│              │
     │             │               │             │              │
     │             │               │             │ UPDATE word with new data
     │             │               │             ├─────────────►│
     │             │               │             │              │
     │             │               │ updateRequestStatus()      │
     │             │               ├────────────►│              │
     │             │               │             │              │
     │             │               │             │ UPDATE status='approved'
     │             │               │             ├─────────────►│
     │             │               │             │              │
     │             │               │ { message }│              │
     │             │               │◄────────────┤              │
     │             │               │             │              │
     │             │  Success: Word Updated      │              │
     │             │◄──────────────┤             │              │
     │             │               │             │              │
     │ Refresh Modification List   │             │              │
     │◄────────────┤               │             │              │
     │             │               │             │              │
```

---

## 4. ACTIVITY DIAGRAMS

### 4.1 Student Game Play Activity Diagram

```
                        ┌─────────────┐
                        │   START     │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │    Login    │
                        └──────┬──────┘
                               │
                        ┌──────▼───────────┐
                        │ View Dashboard   │
                        └──────┬───────────┘
                               │
                        ┌──────▼───────────────┐
                        │ Select Game Type     │
                        │ - Word Matching      │
                        │ - Fill in Blanks     │
                        │ - Multiple Choice    │
                        └──────┬───────────────┘
                               │
                        ┌──────▼───────────┐
                        │ Select Level     │
                        │ (1 to 5)         │
                        └──────┬───────────┘
                               │
                        ┌──────▼────────────┐
                        │ Fetch Random      │
                        │ Words from DB     │
                        └──────┬────────────┘
                               │
                        ┌──────▼────────────┐
                        │ Display Questions │
                        └──────┬────────────┘
                               │
                        ┌──────▼────────────┐
                        │ Student Answers   │
                        │ Each Question     │
                        └──────┬────────────┘
                               │
                               ├─────────────────┐
                               │                 │
                    ┌──────────▼───────┐  ┌──────▼──────────┐
                    │ All Questions    │  │ Time Not Up     │
                    │ Answered?        │  │                 │
                    └──────┬───────────┘  └──────┬──────────┘
                           │ Yes                 │ No
                           │                     │
                    ┌──────▼──────────────────────▼──────┐
                    │    Submit Answers                  │
                    └──────┬─────────────────────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ Calculate Score     │
                    │ - Correct Answers   │
                    │ - Accuracy %        │
                    │ - Points Earned     │
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ Save Game Session   │
                    │ to Database         │
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ Update User Points  │
                    │ and Level           │
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ Display Results     │
                    │ - Score             │
                    │ - Accuracy          │
                    │ - Points Earned     │
                    │ - New Level         │
                    └──────┬──────────────┘
                           │
                           ├─────────────────┐
                           │                 │
                    ┌──────▼────────┐ ┌──────▼──────┐
                    │ Play Again?   │ │             │
                    └──────┬────────┘ └──────┬──────┘
                           │ Yes             │ No
                           │                 │
                           │          ┌──────▼──────────┐
                           │          │ View Progress   │
                           │          └──────┬──────────┘
                           │                 │
                           │          ┌──────▼──────────┐
                           │          │ Return to       │
                           │          │ Dashboard       │
                           │          └──────┬──────────┘
                           │                 │
                           └─────────────────┤
                                             │
                                      ┌──────▼──────┐
                                      │     END     │
                                      └─────────────┘
```

---

### 4.2 Teacher Word Request Activity Diagram

```
                        ┌─────────────┐
                        │   START     │
                        └──────┬──────┘
                               │
                        ┌──────▼──────────────┐
                        │ Teacher Login       │
                        └──────┬──────────────┘
                               │
                        ┌──────▼──────────────┐
                        │ View Word Library   │
                        └──────┬──────────────┘
                               │
                        ┌──────▼──────────────────────┐
                        │ Select Action:              │
                        │ 1. Add New Word             │
                        │ 2. Update Existing Word     │
                        │ 3. Delete Word              │
                        └──┬──────┬──────────┬────────┘
                           │      │          │
          ┌────────────────┘      │          └────────────────┐
          │                       │                           │
   ┌──────▼────────┐   ┌──────────▼─────────┐   ┌───────────▼────────┐
   │ Add New Word  │   │ Update Word        │   │ Delete Word        │
   └──────┬────────┘   └──────────┬─────────┘   └───────────┬────────┘
          │                       │                          │
   ┌──────▼────────────┐ ┌────────▼──────────┐   ┌──────────▼────────┐
   │ Fill Word Form:   │ │ Select Word       │   │ Select Word       │
   │ - Tamil Word      │ │ to Update         │   │ to Delete         │
   │ - Tamil Meaning   │ └────────┬──────────┘   └──────────┬────────┘
   │ - English Meaning │          │                         │
   │ - Level           │ ┌────────▼──────────┐   ┌──────────▼────────┐
   │ - Domain          │ │ Modify Word Data  │   │ Provide Deletion  │
   │ - Period          │ └────────┬──────────┘   │ Reason            │
   │ - Notes           │          │              └──────────┬────────┘
   └──────┬────────────┘          │                         │
          │            ┌───────────▼──────────┐             │
          │            │ Provide Update       │             │
          │            │ Reason               │             │
          │            └───────────┬──────────┘             │
          │                        │                        │
          └────────────────────────┴────────────────────────┘
                                   │
                        ┌──────────▼────────────┐
                        │ Validate Form Data    │
                        └──────────┬────────────┘
                                   │
                        ┌──────────▼────────────┐
                        │ Is Data Valid?        │
                        └──────┬─────────┬──────┘
                               │ Yes     │ No
                               │         │
                               │  ┌──────▼────────────┐
                               │  │ Show Validation   │
                               │  │ Error Messages    │
                               │  └──────┬────────────┘
                               │         │
                               │         └─────┐
                               │               │
                        ┌──────▼───────────────▼─┐
                        │ Submit Request to API  │
                        └──────┬─────────────────┘
                               │
                        ┌──────▼─────────────────┐
                        │ Create Request Record  │
                        │ in Database            │
                        │ (status: pending)      │
                        └──────┬─────────────────┘
                               │
                        ┌──────▼─────────────────┐
                        │ Display Success Alert  │
                        │ "Request Submitted for │
                        │  Admin Approval"       │
                        └──────┬─────────────────┘
                               │
                        ┌──────▼─────────────────┐
                        │ Close Form             │
                        └──────┬─────────────────┘
                               │
                        ┌──────▼─────────────────┐
                        │ Refresh Word Library   │
                        └──────┬─────────────────┘
                               │
                        ┌──────▼─────────────────┐
                        │ Request Visible in     │
                        │ "My Requests" Tab      │
                        │ (Status: Pending)      │
                        └──────┬─────────────────┘
                               │
                        ┌──────▼──────┐
                        │     END     │
                        └─────────────┘
```

---

### 4.3 Admin Approval Workflow Activity Diagram

```
                        ┌─────────────┐
                        │   START     │
                        └──────┬──────┘
                               │
                        ┌──────▼───────────┐
                        │ Admin Login      │
                        └──────┬───────────┘
                               │
                        ┌──────▼───────────┐
                        │ View Dashboard   │
                        │ (See Pending     │
                        │  Counts)         │
                        └──────┬───────────┘
                               │
                        ┌──────▼──────────────────┐
                        │ Select Request Type:    │
                        │ 1. Teacher Requests     │
                        │ 2. Word Suggestions     │
                        │ 3. Word Modifications   │
                        └──┬──────┬───────┬───────┘
                           │      │       │
          ┌────────────────┘      │       └────────────────┐
          │                       │                        │
   ┌──────▼──────────┐  ┌─────────▼────────┐  ┌───────────▼────────┐
   │ Teacher         │  │ Word             │  │ Modification       │
   │ Signup Requests │  │ Suggestions      │  │ Requests           │
   └──────┬──────────┘  └─────────┬────────┘  └───────────┬────────┘
          │                       │                        │
   ┌──────▼──────────────┐ ┌──────▼─────────────┐ ┌───────▼──────────┐
   │ View Pending        │ │ View Pending       │ │ View Pending     │
   │ Teacher Requests    │ │ Suggestions        │ │ Modifications    │
   └──────┬──────────────┘ └──────┬─────────────┘ └───────┬──────────┘
          │                       │                        │
   ┌──────▼──────────────┐ ┌──────▼─────────────┐ ┌───────▼──────────┐
   │ Review Details:     │ │ Review Word:       │ │ Review Changes:  │
   │ - Username          │ │ - Tamil Word       │ │ - Original Data  │
   │ - Email             │ │ - Meanings         │ │ - Updated Data   │
   │ - Full Name         │ │ - Level            │ │ - Reason         │
   │ - Request Date      │ │ - Domain/Period    │ │ - Request Type   │
   └──────┬──────────────┘ └──────┬─────────────┘ └───────┬──────────┘
          │                       │                        │
          └───────────────────────┴────────────────────────┘
                                  │
                        ┌─────────▼──────────┐
                        │ Make Decision:     │
                        │ - Approve          │
                        │ - Reject           │
                        └──────┬──────┬──────┘
                               │      │
                        ┌──────┘      └──────┐
                        │                    │
              ┌─────────▼────────┐  ┌────────▼─────────┐
              │ APPROVE          │  │ REJECT           │
              └─────────┬────────┘  └────────┬─────────┘
                        │                    │
              ┌─────────▼────────┐  ┌────────▼─────────┐
              │ Process Approval:│  │ Enter Rejection  │
              │                  │  │ Reason           │
              │ For Teacher:     │  └────────┬─────────┘
              │ - Create Account │           │
              │                  │  ┌────────▼─────────┐
              │ For Suggestion:  │  │ Update Request   │
              │ - Add to DB      │  │ Status: Rejected │
              │                  │  └────────┬─────────┘
              │ For Modification:│           │
              │ - Update/Delete  │  ┌────────▼─────────┐
              │   in DB          │  │ Save Rejection   │
              └─────────┬────────┘  │ Reason           │
                        │           └────────┬─────────┘
              ┌─────────▼────────┐           │
              │ Update Request   │           │
              │ Status: Approved │           │
              └─────────┬────────┘           │
                        │                    │
              ┌─────────▼────────┐           │
              │ Set Reviewed By  │           │
              │ and Reviewed At  │           │
              └─────────┬────────┘           │
                        │                    │
                        └────────────────────┘
                                  │
                        ┌─────────▼──────────┐
                        │ Send Notification  │
                        │ (if implemented)   │
                        └─────────┬──────────┘
                               │
                        ┌──────▼─────────────┐
                        │ Display Success    │
                        │ Message            │
                        └──────┬─────────────┘
                               │
                        ┌──────▼─────────────┐
                        │ Refresh Request    │
                        │ List (Remove from  │
                        │ Pending)           │
                        └──────┬─────────────┘
                               │
                        ┌──────▼─────────────┐
                        │ Update Statistics  │
                        │ (Decrease Pending  │
                        │  Count)            │
                        └──────┬─────────────┘
                               │
                        ┌──────▼──────┐
                        │     END     │
                        └─────────────┘
```

---

*[Continue in next file...]*
