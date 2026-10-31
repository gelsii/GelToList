from dependencies.get_current_user import get_user
from fastapi import APIRouter, Depends, Response, status
from fastapi.responses import Response
from models.auth_models import SignInModel, SignUpModel
from services.auth_services import generate_access_token_service, sign_in_service, sign_up_service
from fastapi.security import APIKeyCookie, APIKeyHeader, HTTPAuthorizationCredentials, HTTPBasic, HTTPBasicCredentials, HTTPBearer

auth_router = APIRouter(prefix="/api/auth")

@auth_router.post("/signup", status_code=status.HTTP_201_CREATED)
def sign_up_route(fields_req: SignUpModel):

    sign_up_service(fields=fields_req)

    return { "message": "Successfully Sign Up!" }

security_sign_in = HTTPBasic()

@auth_router.post("/signin")
def sign_in_route(response: Response,credentials: HTTPBasicCredentials = Depends(security_sign_in)):
    fields = {
        "email": credentials.username,
        "password": credentials.password
    }

    sign_in_service(fields=fields, res=response)

    return { "message": "Welcome Back!" }

security_cookie = APIKeyCookie(name="refresh_token")

@auth_router.get("/token")
def generate_access_token(token: str = Depends(security_cookie)):

    generated_access_token = generate_access_token_service(refresh_token=token)

    return { "access_token": generated_access_token }

security_bearer = HTTPBearer()

@auth_router.post("/token")
def authenticate_access_token(user = Depends(get_user)):
    return { "info_user": user }

@auth_router.delete("/logout")
def logout_user(res: Response, user = Depends(get_user)):

    res.delete_cookie(key="refresh_token", httponly=True, secure=True)

    return { "message": "Successfully Logouted!"}

@auth_router.get("/test")
def test_auth():
    { "message": "Tested" }