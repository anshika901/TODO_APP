
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
import os

# Create database directory if it doesn't exist
os.makedirs("data", exist_ok=True)

# SQLite database URL
DATABASE_URL = "sqlite:///./data/todos.db"

# Create engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    """Initialize the database by creating all tables"""
    Base.metadata.create_all(bind=engine)

def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
