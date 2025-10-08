# Testing Guide - Request-Based Teacher Workflow

## Quick Test Steps

### Setup
1. **Start MongoDB**
   ```powershell
   mongod
   ```

2. **Start Backend** (in new terminal)
   ```powershell
   cd backend
   npm start
   ```

3. **Start Frontend** (in new terminal)
   ```powershell
   cd web-frontend
   npm start
   ```

---

## Test Scenario 1: Teacher Submits Word Suggestion

### Steps
1. Login as Teacher
   - Email: teacher@example.com
   - Password: (your teacher password)

2. Navigate to "📚 Word Library" tab

3. Click "➕ Add New Word" button

4. Fill in word form:
   - Word: `செம்மல்` (example Tamil word)
   - Tamil Meaning: `சிறந்தவர்`
   - English Meaning: `Excellent person`
   - Level: `2`
   - Domain: `Character`
   - Period: `Ancient`
   - Notes: `Test word suggestion`

5. Click "Add Word"

### Expected Results
✅ See alert: "✅ Word suggestion submitted for admin approval!"  
✅ Modal closes  
✅ NO error messages shown  

6. Navigate to "📝 My Requests" tab

### Expected Results
✅ See new word suggestion card  
✅ Status badge shows "pending" (yellow)  
✅ All word details displayed correctly  
✅ Submission date shown  

---

## Test Scenario 2: Teacher Submits Update Request

### Steps
1. In "📚 Word Library" tab, find existing word

2. Click "Edit" button on any word

3. Modify word details:
   - Change English meaning
   - Change level
   - Add notes

4. Click "Update Word"

### Expected Results
✅ See alert: "✅ Word update request submitted for admin approval!"  
✅ Modal closes  
✅ NO error messages shown  

5. Navigate to "📝 My Requests" tab

### Expected Results
✅ See new modification request card  
✅ Type badge shows "✏️ Update"  
✅ Status badge shows "pending" (yellow)  
✅ Comparison grid shows original vs updated  
✅ Changes highlighted  

---

## Test Scenario 3: Teacher Submits Delete Request

### Steps
1. In "📚 Word Library" tab, click "Delete" on any word

2. Prompt appears asking for reason

3. Enter reason: `Duplicate word` or `Incorrect translation`

4. Click OK

### Expected Results
✅ See alert: "✅ Word deletion request submitted for admin approval!"  
✅ NO error messages shown  

5. Navigate to "📝 My Requests" tab

### Expected Results
✅ See new modification request card  
✅ Type badge shows "🗑️ Delete"  
✅ Status badge shows "pending" (yellow)  
✅ Deletion reason displayed  
✅ Original word details shown  

---

## Test Scenario 4: Admin Approves Suggestion

### Steps
1. Logout from teacher account

2. Login as Admin
   - Email: admin@example.com
   - Password: (your admin password)

3. Navigate to Admin Dashboard

### Expected Results
✅ See "Word Suggestions" tab with badge showing pending count  

4. Click "Word Suggestions" tab

### Expected Results
✅ See table with pending suggestions  
✅ All word details visible  
✅ Teacher name shown  
✅ Submission date shown  

5. Click "Approve" button on a suggestion

### Expected Results
✅ Success message appears  
✅ Suggestion disappears from list  
✅ Pending count decreases  

6. Navigate to "Words" tab

### Expected Results
✅ Approved word now appears in word database  

---

## Test Scenario 5: Admin Rejects with Reason

### Steps
1. In Admin Dashboard, navigate to "Word Suggestions" tab

2. Click "Reject" button on a suggestion

3. Prompt asks for rejection reason

4. Enter: `Incorrect Tamil spelling - please verify`

5. Click OK

### Expected Results
✅ Success message appears  
✅ Suggestion disappears from list  
✅ Pending count decreases  

6. Logout and login as the teacher who submitted

7. Navigate to "📝 My Requests" tab

### Expected Results
✅ See the rejected suggestion  
✅ Status badge shows "rejected" (red)  
✅ Rejection reason box visible (yellow)  
✅ Reason text matches what admin entered  
✅ Review date shown  

---

## Test Scenario 6: Admin Approves Update Request

### Steps
1. Login as Admin

2. Navigate to "Word Modifications" tab

### Expected Results
✅ See pending update requests  
✅ Badge shows count  

3. View an update request

### Expected Results
✅ Original word data displayed on left  
✅ Updated word data displayed on right  
✅ Arrow (→) between them  
✅ All changes clearly visible  

4. Click "Approve" button

### Expected Results
✅ Success message appears  
✅ Request disappears from list  
✅ Word updated in database  

5. Navigate to "Words" tab

### Expected Results
✅ Word shows updated values  

---

## Test Scenario 7: Admin Approves Delete Request

### Steps
1. In Admin Dashboard, "Word Modifications" tab

2. Find delete request (shows 🗑️ icon)

### Expected Results
✅ Deletion reason visible  
✅ Original word details shown  

3. Click "Approve" button

### Expected Results
✅ Success message appears  
✅ Request removed from list  

4. Navigate to "Words" tab

### Expected Results
✅ Deleted word no longer in database  

---

## Test Scenario 8: Teacher Tracks Request Status

### Steps
1. Login as Teacher

2. Navigate to "📝 My Requests" tab

### Expected Results
✅ See all submitted requests  
✅ Word Suggestions section shows all suggestions  
✅ Modification Requests section shows all updates/deletes  

3. Check status badges

### Expected Results
✅ Pending requests: Yellow badge  
✅ Approved requests: Green badge  
✅ Rejected requests: Red badge  

4. Check dates

### Expected Results
✅ Submission date always visible  
✅ Review date visible for approved/rejected  

5. Check rejection reasons

### Expected Results
✅ Only visible on rejected requests  
✅ Displayed in yellow alert box  
✅ Full reason text visible  

---

## Visual Checks - AdminDashboard CSS Fixes

### Check 1: Modification Cards
✅ Cards have WHITE background (not red)  
✅ Text is clearly visible  
✅ Border colors correct (red for original, green for updated)  

### Check 2: Buttons
✅ "Approve" button: Green with WHITE text  
✅ "Reject" button: Red with WHITE text  
✅ Buttons have hover effect (lift + shadow)  

### Check 3: Tables
✅ Header background: Purple (#667eea)  
✅ Header text: WHITE and bold  
✅ Row text: Dark gray (#333)  
✅ Hover effect: Light gray background  

### Check 4: Word Info Boxes
✅ Background: Light blue (#f0f4ff)  
✅ Border: Purple (#667eea)  
✅ Text clearly visible  

### Check 5: Status Badges
✅ Student badge: Blue  
✅ Teacher badge: Orange  
✅ Admin badge: Purple  
✅ All text: WHITE  

---

## Common Issues & Solutions

### Issue: "Failed to fetch"
**Solution:** Ensure backend is running on port 5000

### Issue: "Unauthorized"
**Solution:** Login again - token may have expired

### Issue: Request not showing in Admin Dashboard
**Solution:** Refresh the page or switch tabs

### Issue: Status not updating after approval
**Solution:** Teacher should switch tabs or refresh page

### Issue: Can't see rejection reason
**Solution:** Check if admin entered a reason when rejecting

---

## Browser Console Checks

### Should NOT See
❌ Any red error messages about API calls  
❌ 401 Unauthorized errors  
❌ CORS errors  

### Should See (normal operation)
✅ 200 OK responses for API calls  
✅ Console logs showing successful submissions  

---

## Regression Testing

After all tests, verify:
- [ ] Students can still play games normally
- [ ] Admin can still manage users
- [ ] Teacher can still view student progress
- [ ] All existing features work as before
- [ ] No console errors on any page

---

## Performance Checks

- [ ] "My Requests" tab loads within 2 seconds
- [ ] No lag when submitting requests
- [ ] Admin dashboard responsive to approvals/rejections
- [ ] Page doesn't freeze during operations

---

## Accessibility Checks

- [ ] All status badges have clear colors
- [ ] Text has good contrast
- [ ] Buttons are clearly labeled
- [ ] Alert messages are readable
- [ ] Mobile view works correctly

---

**Status:** Ready for Testing  
**Last Updated:** December 2024  
**Priority:** High - Core workflow change
