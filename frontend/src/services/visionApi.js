// Handles communication between the VisionGuide AI frontend and FastAPI image understanding endpoint.

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function understandImage(imageFile, question) {
  if (!imageFile) {
    throw new Error("Please select an image.");
  }

  if (!question?.trim()) {
    throw new Error("Please enter a question.");
  }

  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("question", question.trim());

  const response = await fetch(
    `${API_BASE_URL}/api/understand-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof data.detail === "string"
        ? data.detail
        : "Image understanding request failed."
    );
  }

  return data;
}