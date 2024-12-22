# Academic Monitoring System

A system for monitoring student attendance and location during school hours.

## Features

- User authentication (parents, children, teachers, admin)
- Real-time location tracking
- Attendance monitoring
- Parent notifications

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js >= 14
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FrankWebber33/academic.git
cd academic
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
Create `.env` files in both backend and frontend directories with the necessary environment variables.

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## Project Structure

```
academic/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.tsx
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.