from pydantic import BaseModel

class SignUpModel(BaseModel):
    username: str
    email: str
    password: str

class SignInModel(BaseModel):
    email: str
    password: str