
# Initializes VisionGuide AI FastAPI backend, API routes, and frontend CORS access.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.image import router as image_router

app = FastAPI(
    title="VisionGuide AI API",
    description="Backend for voice-first multimodal image understanding.",
    version="0.1.0",
)

# Allow the local React development frontend to access the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Register image upload and understanding APIs.
app.include_router(image_router)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "VisionGuide AI Backend",
        "version": "0.1.0",
    }
