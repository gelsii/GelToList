from fastapi import HTTPException, status

INTERNAL_SERVER_ERROR_MESSAGE = HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong. Please try again later.")