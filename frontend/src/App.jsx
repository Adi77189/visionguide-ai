
// Manages VisionGuide AI layout, language, images, voice input, and questions.

import { useState } from "react";

import Header from "./components/Header";
import WelcomeSection from "./components/WelcomeSection";
import ImageInput from "./components/ImageInput";
import VoiceInput from "./components/VoiceInput";
import QuestionInput from "./components/QuestionInput";

function App() {
  const [language, setLanguage] = useState("en");
  const [selectedImage, setSelectedImage] = useState(null);
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // Store the submitted question for future AI processing.
  function handleQuestionSubmit(question) {
    setSubmittedQuestion(question);
  }

  // Reset old confirmation when the selected image changes.
  function handleImageChange(file) {
    setSelectedImage(file);
    setSubmittedQuestion("");
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
        <ImageInput
          onImageChange={handleImageChange}
        />

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

        {/* Temporary confirmation before AI integration */}
        {submittedQuestion && (
          <div
            role="status"
            className="mt-6 rounded-2xl border border-teal-400/30 bg-teal-400/10 p-5"
          >
            <p className="font-semibold text-teal-200">
              Question received successfully.
            </p>

            <p className="mt-2 text-slate-200">
              {submittedQuestion}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              AI analysis will be available in a future phase.
            </p>
          </div>
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
