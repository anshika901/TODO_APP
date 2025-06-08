

# Full-Stack Todo Application

A modern, responsive Todo application built with React + Shadcn UI frontend and Python FastAPI backend.

## Credits

Projected by Anshika Gupta

## Features

- ✨ Modern, clean UI with dark/light mode support
- 📱 Fully responsive design
- 🗂️ Task categorization and filtering
- 📅 Due date management with calendar picker
- ⭐ Important task marking
- 🔍 Search and sorting functionality
- 📊 Task progress tracking
- 🎯 Multiple view modes (cards/list)

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for development
- Shadcn UI component library
- Tailwind CSS for styling
- React Query for data fetching
- React Router for navigation

### Backend
- Python 3.10+
- FastAPI web framework
- SQLAlchemy ORM
- SQLite database
- Pydantic for data validation

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11.9

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload

OR run the application directly using Python:
python main.py
```

The API will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/docs`

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` |
The application will be available at `http://localhost:8080` 

## Database

The application uses SQLite for data persistence. The database file (`todos.db`) will be automatically created in the `backend/data/` directory when you first run the backend server.

## API Endpoints

- `GET /todos` - Get all todos
- `GET /todos/{id}` - Get specific todo
- `POST /todos` - Create new todo
- `PUT /todos/{id}` - Update todo
- `DELETE /todos/{id}` - Delete todo

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   └── lib/               # Utility functions
├── backend/               # Backend source code
│   ├── routes/            # FastAPI route handlers
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   ├── database.py        # Database configuration
│   └── main.py            # FastAPI application entry point
└── README.md
```

## Development Notes

- The frontend runs on port 5173| 8080 by default
- The backend runs on port 8000 by default
- CORS is configured to allow requests from the frontend
- The SQLite database is automatically created and initialized
- All data persists between sessions


