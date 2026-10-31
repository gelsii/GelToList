from dataclasses import fields

from dependencies.get_current_user import get_user
from fastapi import APIRouter, Depends
from models.note_models import CreateNoteModels, UpdateNoteModels
from services.note_services import create_note_service, delete_user_note_service, get_all_notes_user_service, search_note_service, update_user_note_service

note_router = APIRouter(prefix="/api")


@note_router.get("/notes")
def get_all_notes_user(user = Depends(get_user)):

    notes = get_all_notes_user_service(user=user)

    return { "notes": notes } 

@note_router.post("/notes")
def create_note_route(req_fields: CreateNoteModels, user = Depends(get_user)):

    create_note_service(user=user, fields=req_fields)

    return { "message": "Successfully Created! " }


@note_router.put("/notes")
def update_note_user(fields_req: UpdateNoteModels, user = Depends(get_user)):

    update_user_note_service(fields=fields_req, user=user)

    return { "message": "Successfull Updated Note!"}

@note_router.delete("/notes")
def delete_user_note_route(id: str, user = Depends(get_user)):

    delete_user_note_service(id=id, user=user)

    return { "message": "Successfully Deleted!" }


@note_router.get("/notes/search")
def search_note(searchNote: str, filterType: str, user = Depends(get_user)):

    notes_searched = search_note_service(search=searchNote, filter=filterType, user=user)
    print(notes_searched)
    return { "searched_note": notes_searched }