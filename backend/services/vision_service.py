
# Handles OpenAI-powered image understanding for the VisionGuide AI backend.

import base64
import os

from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")


async def understand_image(
    image_bytes: bytes,
    mime_type: str,
    question: str,
) -> str:
    """Answer a user's question about an uploaded image."""

    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not configured.")

    if not question.strip():
        raise ValueError("Question cannot be empty.")

    supported_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
    }

    if mime_type not in supported_types:
        raise ValueError("Unsupported image format.")

    encoded_image = base64.b64encode(image_bytes).decode("utf-8")
    image_data_url = f"data:{mime_type};base64,{encoded_image}"

    client = AsyncOpenAI(api_key=api_key)

    response = await client.responses.create(
        model=OPENAI_MODEL,
        instructions=(
            "You are VisionGuide AI, an accessibility assistant "
            "helping people understand images. "
            "Describe only what can reasonably be observed. "
            "Answer clearly and concisely. "
            "If something is unclear, say so instead of guessing. "
            "Respond in the language used by the user. "
            "Do not provide safety-critical navigation guidance."
        ),
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": question.strip(),
                    },
                    {
                        "type": "input_image",
                        "image_url": image_data_url,
                    },
                ],
            }
        ],
        max_output_tokens=500,
    )

    answer = response.output_text.strip()

    if not answer:
        raise RuntimeError("OpenAI returned an empty response.")

    return answer
