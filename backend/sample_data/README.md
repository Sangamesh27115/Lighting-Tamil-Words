# Sample data for backend

This folder contains example JSON files you can use to seed or test the backend API.

Files
- `sample_words.json` - array of Word documents matching `models/Word.js` schema.
- `sample_suggestions.json` - array of suggestion objects matching `models/WordSuggestion.js`.
- `sample_users.json` - example Admin, Teacher, and Student objects (passwords are plain text placeholders).

Quick import tips

1) Insert words using `mongoimport` (MongoDB must be running):

```powershell
cd backend
mongoimport --db tamilwords --collection words --file sample_data\sample_words.json --jsonArray
```

2) Insert suggestions:

```powershell
mongoimport --db tamilwords --collection wordsuggestions --file sample_data\sample_suggestions.json --jsonArray
```

3) Insert users (admins/teachers/students) - because your app may hash passwords, it's safer to create users via the API endpoints or adapt the import to match the expected collection names and hashing.

Sample API calls (PowerShell):

```powershell
# Get all words
curl http://localhost:5000/api/words

# Post a suggestion (JSON body sent via PowerShell)
$body = '{"word":"புதியபதம்","meaning_ta":"சோதனை","meaning_en":"test"}'
curl -Method POST -Uri http://localhost:5000/api/words/suggest -Body $body -ContentType 'application/json'
```

Notes
- Replace database name, host, and port to match your `MONGODB_URI`.
- If your server requires authentication for user creation, use the Admin API or seed hashes directly into the DB after hashing.
