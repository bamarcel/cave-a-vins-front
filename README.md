# Cave à Vins — Front-end

React web app to manage a personal wine collection, connected to a REST API with JWT authentication.

## Live

[cave-a-vins-front.vercel.app](https://cave-a-vins-front.vercel.app)

## Stack

- **React + Vite** — front-end framework
- **Axios** — HTTP client with JWT interceptor
- **Deployed on Vercel**

## Features

- JWT authentication (register / login)
- Browse your wine collection with live filters (cépage, région, note min)
- Add a bottle with name, cépage, région, millésime and rating
- Upload a photo for each bottle
- Persistent login via localStorage token

## Project structure

```
src/
├── api/
│   └── bouteilles.api.js   # all API calls, JWT injected automatically
├── components/
│   ├── BouteilleCard.jsx    # single bottle display
│   ├── BouteilleForm.jsx    # add bottle form
│   └── Filtres.jsx          # filter bar
├── pages/
│   ├── LoginPage.jsx
│   └── CavePage.jsx         # main page
└── App.jsx
```

## Local setup

```bash
git clone https://github.com/bamarcel/cave-a-vins-front
cd cave-a-vins-front
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:3000
npm run dev
```

**Required environment variables:**

```
VITE_API_URL=http://localhost:3000
```

## Related

Back-end repository: [cave-a-vins-back](https://github.com/bamarcel/cave-a-vins-back)
