
// Manages VisionGuide AI layout, language, images, voice input, and AI responses.

import { useRef, useState } from "react";

import Header from "./components/Header";
import WelcomeSection from "./components/WelcomeSection";
import ImageInput from "./components/ImageInput";
import VoiceInput from "./components/VoiceInput";
import QuestionInput from "./components/QuestionInput";
import { understandImage } from "./services/visionApi";

function App() {
  const [language, setLanguage] = useState("en");
  const [selectedImage, setSelectedImage] = useState(null);
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const [aiAnswer, setAiAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Prevent outdated API responses from replacing newer results.
  const requestIdRef = useRef(0);

  // Submit the selected image and question to the FastAPI backend.
  async function handleQuestionSubmit(question) {
    if (!selectedImage || isLoading) return;

    const requestId = ++requestIdRef.current;

    setSubmittedQuestion(question);
    setAiAnswer("");
    setApiError("");
    setIsLoading(true);

    try {
      const result = await understandImage(selectedImage, question);

      if (requestId !== requestIdRef.current) return;

      if (typeof result.answer !== "string" || !result.answer.trim()) {
        throw new Error("The AI returned an empty answer.");
      }

      setAiAnswer(result.answer);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;

      setApiError(
        error instanceof Error
          ? error.message
          : "Unable to analyze the image."
      );
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }

  // Reset previous results whenever the selected image changes.
  function handleImageChange(file) {
    requestIdRef.current += 1;

    setSelectedImage(file);
    setSubmittedQuestion("");
    setAiAnswer("");
    setApiError("");
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#071326] text-white">
      {/* Keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-teal-300 focus:p-3 focus:text-slate-950"
      >
        Skip to main content
      </a>

      {/* Application header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
      />

      <main
        id="main-content"
        className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12"
      >
        {/* Welcome section */}
        <WelcomeSection />

        {/* Camera and image upload */}
        <ImageInput onImageChange={handleImageChange} />

        {/* Microphone and speech recognition */}
        <VoiceInput
          language={language}
          onTranscript={setVoiceTranscript}
        />

        {/* Question form */}
        <QuestionInput
          onSubmit={handleQuestionSubmit}
          hasImage={Boolean(selectedImage)}
          voiceTranscript={voiceTranscript}
        />

        {/* AI loading announcement */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 rounded-2xl border border-teal-400/30 bg-teal-400/10 p-5"
          >
            <p className="font-semibold text-teal-200">
              VisionGuide AI is analyzing your image...
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Please wait while we prepare your answer.
            </p>
          </div>
        )}

        {/* Backend error */}
        {apiError && (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-rose-400/40 bg-rose-400/10 p-5"
          >
            <p className="font-semibold text-rose-200">
              Unable to analyze image
            </p>
            <p className="mt-2 text-sm text-rose-100">
              {apiError}
            </p>
          </div>
        )}

        {/* AI-generated answer */}
        {aiAnswer && (
          <section
            aria-labelledby="ai-answer-heading"
            aria-live="polite"
            className="mt-6 rounded-2xl border border-teal-400/30 bg-[#102038] p-5 sm:p-6"
          >
            <h2
              id="ai-answer-heading"
              className="text-xl font-bold text-teal-200"
            >
              VisionGuide AI Response
            </h2>

            <p className="mt-4 text-sm font-medium text-slate-400">
              Your question
            </p>
            <p className="mt-1 whitespace-pre-wrap text-slate-200">
              {submittedQuestion}
            </p>

            <div className="mt-5 border-t border-slate-700 pt-5">
              <p className="mb-2 text-sm font-semibold text-teal-200">
                AI Answer
              </p>
              <p className="whitespace-pre-wrap leading-7 text-slate-100">
                {aiAnswer}
              </p>
            </div>

            <p className="mt-5 text-xs text-slate-400">
              AI-generated descriptions may contain mistakes.
              Verify important information independently.
            </p>
          </section>
        )}

        {/* Accessible image selection announcement */}
        <p className="sr-only" aria-live="polite">
          {selectedImage
            ? `Image selected: ${selectedImage.name}`
            : "No image selected"}
        </p>
      </main>
    </div>
  );
}

export default App;
