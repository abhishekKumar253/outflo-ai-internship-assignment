# 🚀 campaign management system

A full-stack campaign management system with AI-powered personalized LinkedIn message generation — built as part of the OutFlo Internship Assignment.

---

## ✨ Features

- 📋 Full campaign CRUD functionality (Create, Read, Update, Soft Delete)
- 🔁 Status toggle between `ACTIVE` and `INACTIVE`
- 🤖 AI-generated personalized messages using DeepSeek API
- 🖥️ Responsive, clean frontend UI with form validations
- 🔗 RESTful API with TypeScript and Express
- 🗃️ Data stored in MongoDB with Mongoose

---

## 🧱 Tech Stack

| Layer      | Tech Used                            |
|------------|---------------------------------------|
| Frontend   | React.js, TypeScript, Tailwind CSS    |
| Backend    | Node.js, Express.js, TypeScript       |
| Database   | MongoDB + Mongoose                    |
| AI Service | DeepSeek API                          |

---

## ⚙️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/abhishekKumar253/outflo-internship-assignment
cd OutFlo-Assignment

2. Backend Setup

cd backend
npm install

.env file setup

PORT=5000
MONGO_URI=your_mongo_connection_string
DEEPSEEK_API_KEY=your_deepseek_api_key

npm run dev

3. Frontend Setup
cd ../frontend
npm install
npm run dev
