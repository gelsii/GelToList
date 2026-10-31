from datetime import datetime, timedelta
from database import use as db
from fastapi import HTTPException, Response, status
import bcrypt
import jwt
from models.auth_models import SignInModel, SignUpModel
from utils.internal_server_error_exeption import INTERNAL_SERVER_ERROR_MESSAGE
from utils.token import authenticate_token, generate_token
from dotenv import load_dotenv
import os

load_dotenv()

def sign_up_service(fields: SignUpModel):
    founded_user = db.users_collection.find_one({ "email": fields.email })

    if founded_user != None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Already registered account.")

    salt_password = bcrypt.gensalt(rounds=12)

    hashed_password = bcrypt.hashpw(fields.password.encode(), salt=salt_password)

    data_user = {
        "username": fields.username,
        "email": fields.email,
        "password": hashed_password,
        "created_at": datetime.now()
    }

    try:
        db.users_collection.insert_one(data_user)
    except Exception as error:
        raise INTERNAL_SERVER_ERROR_MESSAGE


def sign_in_service(fields: SignInModel, res: Response):
    exeption_message =  HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong email or password. Please check again.")

    founded_user = db.users_collection.find_one({ "email": fields["email"] })

    if founded_user == None:
        raise exeption_message

    is_match_password = bcrypt.checkpw(fields["password"].encode(), founded_user["password"])

    if not is_match_password:
        raise exeption_message

    expire_cookie_and_token = datetime.now().utcnow() + timedelta(days=int(os.getenv("REFRESH_TOKEN_EXPIRE")))

    payload_user = {
        "id": str(founded_user["_id"]),
        "exp": expire_cookie_and_token
    }

    generated_token = generate_token(key=os.getenv("REFRESH_TOKEN_KEY"), algorithm=os.getenv("ALGORITHM"), payload=payload_user)

    res.set_cookie(key="refresh_token", value=generated_token["token"], httponly=True, secure=True, expires=f"{expire_cookie_and_token}")


def generate_access_token_service(refresh_token: str):
    decoded_token = authenticate_token(token=refresh_token, key=os.getenv("REFRESH_TOKEN_KEY"), algorithms=[os.getenv("ALGORITHM")])

    expire_access_token = datetime.now().utcnow() + timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE")))

    payload_access_token = {
        "id": decoded_token["id"],
        "exp": expire_access_token
    }

    access_token = generate_token(key=os.getenv("ACCESS_TOKEN_KEY"), algorithm=os.getenv("ALGORITHM"), payload=payload_access_token)

    return access_token["token"]