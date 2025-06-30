# 🎬 Netflix Clone

A full-stack Netflix clone built with **Vite + React** on the frontend and **Node.js + Express** on the backend.

---

## 🚀 Features

✅ Browse Movies & TV Shows  
✅ Responsive slider UI  
✅ Secure Authentication (cookies, protected routes)  
✅ Dynamic fetching from TMDB API  
✅ Protected API routes on backend  
✅ Scrollable carousels with smooth animations  
✅ Deployment-ready build (production config included)

---

## 🛠️ Tech Stack

### Frontend
- Vite + React
- React Router
- Axios
- Lucide Icons
- Tailwind CSS (or other utility classes if you’re using them)

### Backend
- Node.js
- Express.js
- MongoDB (if using for auth/user data)
- Cookie-Parser
- CORS

---

## 🌐 Getting Started

### Clone the repo

```bash
git clone https://github.com/yourusername/netflix-clone.git
cd netflix-clone
```

---

## ⚙️ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

- Runs the frontend on Vite dev server (usually http://localhost:5173)

---

## ⚙️ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

- Runs Express server on your configured port (e.g. http://localhost:5000)

---

## 🌟 Environment Variables

Create a `.env` file in your backend directory:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
TMDB_API_KEY=your_tmdb_api_key
NODE_ENV=development
```

Adjust paths if you’re using a different DB or secrets.

---

## 🖼️ Screenshots

> _(Add screenshots of your UI here)_

---

## 📦 Production Build

To build the frontend:

```bash
cd Frontend
npm run build
```

This outputs a static site into `/dist`. Your Express backend is configured to serve this in production.

---

## 🤝 Contributing

PRs welcome! Feel free to open issues or suggestions.

---

## 💡 Author

Built with ❤️ by jb17899

