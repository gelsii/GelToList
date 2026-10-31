from datetime import datetime
from fastapi import HTTPException, status
from database import use as db
from models.note_models import CreateNoteModels, UpdateNoteModels
from bson.objectid import ObjectId
from utils.internal_server_error_exeption import INTERNAL_SERVER_ERROR_MESSAGE

def get_all_notes_user_service(user: dict):
    try:
        founded_all_notes = db.users_notes_collection.find({ "user_id": user["_id"] }, {
            "user_id": 0
        }).sort({ "createdAt": -1 })
    except Exception as Error:
        raise INTERNAL_SERVER_ERROR_MESSAGE

    copy_notes: list[dict] = [ ]

    for note in list(founded_all_notes):
        note["_id"] = str(note["_id"])
        copy_notes.append(note)

    return copy_notes


def create_note_service(fields: CreateNoteModels, user: dict ):
    payload = {
        "user_id": user["_id"],
        "title": fields.title,
        "typeTodo": fields.typeTodo,
        "content": fields.content,
        "createdAt": datetime.now()
    }

    try:
        db.users_notes_collection.insert_one(payload)
    except Exception as error:
        raise INTERNAL_SERVER_ERROR_MESSAGE

def update_user_note_service(fields: UpdateNoteModels, user: dict):
    data_updated = {
        "title": fields.title,
        "typeTodo": fields.typeTodo,
        "content": fields.content
    }

    try: 
        db.users_notes_collection.update_one({ "$and": [
            { "_id": ObjectId(fields.id) },
            { "user_id": user["_id"] }
        ]}, {
            "$set": data_updated
        })
    except Exception as error:
        print(error)
        raise INTERNAL_SERVER_ERROR_MESSAGE

def delete_user_note_service(id: str, user: dict):
    try:
        db.users_notes_collection.delete_one({ "$and": [ 
            { "_id": ObjectId(id) },
            { "user_id": user["_id"] },
        ]})
    except Exception as error:
        raise INTERNAL_SERVER_ERROR_MESSAGE
    
def search_note_service(search: str, filter: str, user: dict):
    searched_notes = db.users_notes_collection.find({ "$and": [
            { "user_id": user["_id"] },
            { filter: { "$regex": search } }  
        ]}, { "_id": 0 })

    return list(searched_notes)
            