from bson.objectid import ObjectId
from database import use as db
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from utils.token import authenticate_token
from dotenv import load_dotenv
import os

load_dotenv()

security_bearer = HTTPBearer()

def get_user(access_token: HTTPAuthorizationCredentials = Depends(security_bearer)):
    decoded_access_token = authenticate_token(key=os.getenv("ACCESS_TOKEN_KEY"), algorithms=[os.getenv("ALGORITHM")], token=access_token.credentials)

    founded_user = db.users_collection.find_one({ "_id": ObjectId(decoded_access_token["id"]) }, { "password": 0 })

    if founded_user == None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized User.")

    user_copy = {
        **founded_user,
        "_id": str(founded_user["_id"])
    }

    return user_copy