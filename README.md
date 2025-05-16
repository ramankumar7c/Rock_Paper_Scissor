# Rock Paper Scissors 🎮

This repository contains two versions of the classic Rock Paper Scissors game:

1. **Java Version**: The original implementation of the game, created in Java.
2. **Full-Stack Web Version**: A modern web application built with Next.js (React), TypeScript, Tailwind CSS, and MongoDB for persistent multiplayer gameplay.

---

## 🎯 Features

### Web Version
- Real-time multiplayer gameplay
- Persistent game state using MongoDB
- Modern, responsive UI with Tailwind CSS
- Real-time updates and notifications
- Game history tracking
- Clean and intuitive user interface

### Java Version
- Console-based gameplay
- Simple and efficient game logic
- Easy to understand and modify
- Perfect for learning Java basics

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Lucide Icons](https://lucide.dev/)

### Backend
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ramankumar7c/Rock_Paper_Scissors.git
   cd Rock_Paper_Scissors
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
Rock_Paper_Scissors/
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                 # Utility functions and MongoDB setup
├── hooks/              # Custom React hooks
├── public/             # Static assets
├── RPS.java           # Original Java implementation
└── ...config files
```

## 🎮 How to Play

1. Open the web application
2. Create a new game or join an existing one
3. Choose your move (Rock, Paper, or Scissors)
4. Wait for your opponent's move
5. See the result and play again!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

**Raman Kumar**

- GitHub: [@ramankumar7c](https://github.com/ramankumar7c)
- LinkedIn: [Raman Kumar](https://linkedin.com/in/ramankumar7c)

This project was developed as a demonstration of full-stack development skills, showcasing the evolution of a simple game from a Java console application to a modern web application. Feel free to connect with me for any questions or collaboration opportunities!

---

⭐ Star this repository if you find it helpful!