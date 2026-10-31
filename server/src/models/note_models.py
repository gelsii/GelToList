from datetime import datetime
from pydantic import BaseModel

class CreateNoteModels(BaseModel):
    title: str
    typeTodo: str
    content: str

class UpdateNoteModels(BaseModel):
    id: str
    title: str
    typeTodo: str
    content: str