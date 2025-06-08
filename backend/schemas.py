
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[str] = None
    is_completed: bool = False
    is_important: bool = False
    directory: str = "Main"

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[str] = None
    is_completed: Optional[bool] = None
    is_important: Optional[bool] = None
    directory: Optional[str] = None

class TodoResponse(TodoBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
