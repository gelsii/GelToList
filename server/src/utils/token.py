from fastapi import HTTPException, status
import jwt
from utils.internal_server_error_exeption import INTERNAL_SERVER_ERROR_MESSAGE

def generate_token(key: str, algorithm: str, payload: dict):
    generated_token = jwt.encode(payload=payload, key=key, algorithm=algorithm)

    return { "token": generated_token }

def authenticate_token(key: str, token: str, algorithms: list):

    FORBIDDEN_EXEPTION_MESSAGE = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have access to this page.")

    try:
        decoded_token = jwt.decode(jwt=token, key=key, algorithms=algorithms)
    except jwt.ExpiredSignatureError:
        raise FORBIDDEN_EXEPTION_MESSAGE
    except jwt.InvalidAlgorithmError:
        raise FORBIDDEN_EXEPTION_MESSAGE
    except jwt.InvalidKeyError: 
        raise FORBIDDEN_EXEPTION_MESSAGE
    except jwt.InvalidSignatureError:
        raise FORBIDDEN_EXEPTION_MESSAGE
    except Exception as error:
        print(error)
        raise INTERNAL_SERVER_ERROR_MESSAGE

    return decoded_token
    