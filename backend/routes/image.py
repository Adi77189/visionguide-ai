
# Handles secure image uploads and validates image formats and file sizes.

from io import BytesIO

from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

router = APIRouter(prefix="/api", tags=["Images"])

MAX_FILE_SIZE = 5 * 1024 * 1024

ALLOWED_FORMATS = {
    "JPEG": "image/jpeg",
    "PNG": "image/png",
    "WEBP": "image/webp",
}


@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_FORMATS.values():
        raise HTTPException(
            status_code=415,
            detail="Only JPEG, PNG, and WebP images are supported.",
        )

    image_bytes = await file.read(MAX_FILE_SIZE + 1)

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image size must not exceed 5 MB.",
        )

    try:
        with Image.open(BytesIO(image_bytes)) as image:
            image_format = image.format
            image.verify()
    except (UnidentifiedImageError, OSError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image.",
        )

    if ALLOWED_FORMATS.get(image_format) != file.content_type:
        raise HTTPException(
            status_code=415,
            detail="Image content does not match its declared file type.",
        )

    return {
        "message": "Image validated successfully.",
        "filename": file.filename,
        "format": image_format,
        "size_bytes": len(image_bytes),
    }

# Handles secure image validation, uploads, and OpenAI-powered image understanding.

from io import BytesIO

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from openai import (
    APIConnectionError,
    APIStatusError,
    APITimeoutError,
    AuthenticationError,
    RateLimitError,
)
from PIL import Image, UnidentifiedImageError

from services.vision_service import understand_image

router = APIRouter(prefix="/api", tags=["Images"])

MAX_FILE_SIZE = 5 * 1024 * 1024

ALLOWED_FORMATS = {
    "JPEG": "image/jpeg",
    "PNG": "image/png",
    "WEBP": "image/webp",
}


async def validate_image(file: UploadFile):
    """Validate uploaded image and return its bytes and detected format."""

    if file.content_type not in ALLOWED_FORMATS.values():
        raise HTTPException(
            status_code=415,
            detail="Only JPEG, PNG, and WebP images are supported.",
        )

    image_bytes = await file.read(MAX_FILE_SIZE + 1)

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image size must not exceed 5 MB.",
        )

    try:
        with Image.open(BytesIO(image_bytes)) as image:
            image_format = image.format
            image.verify()
    except (UnidentifiedImageError, OSError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image.",
        )

    if ALLOWED_FORMATS.get(image_format) != file.content_type:
        raise HTTPException(
            status_code=415,
            detail="Image content does not match its declared file type.",
        )

    return image_bytes, image_format


@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    image_bytes, image_format = await validate_image(file)

    return {
        "message": "Image validated successfully.",
        "filename": file.filename,
        "format": image_format,
        "size_bytes": len(image_bytes),
    }


@router.post("/understand-image")
async def analyze_image(
    file: UploadFile = File(...),
    question: str = Form(...),
):
    """Answer a question about a validated image using OpenAI."""

    if not question.strip():
        raise HTTPException(
            status_code=422,
            detail="Question cannot be empty.",
        )

    if len(question) > 500:
        raise HTTPException(
            status_code=422,
            detail="Question must not exceed 500 characters.",
        )

    image_bytes, image_format = await validate_image(file)

    try:
        answer = await understand_image(
            image_bytes=image_bytes,
            mime_type=ALLOWED_FORMATS[image_format],
            question=question,
        )

    except AuthenticationError:
        raise HTTPException(
            status_code=503,
            detail="AI service authentication failed.",
        )

    except RateLimitError:
        raise HTTPException(
            status_code=503,
            detail="AI service is temporarily unavailable or quota has been reached.",
        )

    except (APIConnectionError, APITimeoutError):
        raise HTTPException(
            status_code=503,
            detail="Unable to connect to the AI service.",
        )

    except APIStatusError:
        raise HTTPException(
            status_code=502,
            detail="The AI service returned an error.",
        )

    except (ValueError, RuntimeError):
        raise HTTPException(
            status_code=500,
            detail="Image understanding could not be completed.",
        )

    return {
        "message": "Image understood successfully.",
        "filename": file.filename,
        "question": question.strip(),
        "answer": answer,
    }
