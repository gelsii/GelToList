from database import use
from dependencies.get_current_user import get_user
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_route import auth_router
from routes.note_route import note_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8080"
]

app.add_middleware(CORSMiddleware, allow_credentials=True, allow_origins=origins, allow_methods=["*"],allow_headers=["*"])

app.include_router(router=auth_router)
app.include_router(router=note_router)