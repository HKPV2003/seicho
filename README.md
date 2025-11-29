# SEICHO InfoFi (Next.js + Firebase, Premium UI)

Features

- Next.js App Router + TypeScript
- Google login with Firebase Authentication
- List of active campaigns from Firestore `projects` collection
- Project detail page:
  - campaign description
  - X (Twitter) link submit form
  - leaderboard per campaign (points set manually by admins)

## Firestore structure

- `projects` (collection)
  - `{projectId}` (document)
    - `title` (string)
    - `description` (string)
    - `active` (boolean)
    - `submissions` (subcollection)
      - `{submissionId}`
        - `userId` (string)
        - `userName` (string)
        - `tweetUrl` (string)
        - `points` (number)
        - `createdAt` (timestamp)

## Getting started

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Open http://localhost:3000
