
// Handles text questions, voice transcription, validation, and submission.

import { useEffect, useState } from "react";
import { MessageSquareText, Send, Info } from "lucide-react";

const MAX_CHARACTERS = 500;

function QuestionInput({
  onSubmit,
  hasImage,
  voiceTranscript,
}) {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  // Populate the question field with recognized speech.
  useEffect(() => {
    if (voiceTranscript) {
      setQuestion(
        voiceTranscript.slice(0, MAX_CHARACTERS)
      );
      setError("");
    }
  }, [voiceTranscript]);

  // Validate and submit the question.
  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setError("Please enter a question before submitting.");
      return;
    }

    if (!hasImage) {
      setError("Please capture or upload an image first.");
      return;
    }

    setError("");
    onSubmit?.(trimmedQuestion);
  }

  return (
    <section
      aria-labelledby="question-heading"
      className="mt-8 rounded-3xl border border-slate-700/70 bg-[#102038] p-5 sm:p-8"
    >
      <div className="mb-6">
        <h2
          id="question-heading"
          className="flex items-center gap-3 text-xl font-bold text-white"
        >
          <MessageSquareText
            size={25}
            className="text-teal-300"
            aria-hidden="true"
          />
          Ask VisionGuide
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Ask a question about your selected image.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="vision-question"
          className="sr-only"
        >
          Your question about the image
        </label>

        <textarea
          id="vision-question"
          value={question}
          maxLength={MAX_CHARACTERS}
          onChange={(event) => {
            setQuestion(event.target.value);
            setError("");
          }}
          placeholder="Example: What objects are in this image?"
          rows={4}
          aria-describedby="question-help question-counter"
          aria-invalid={Boolean(error)}
          className="w-full resize-y rounded-2xl border border-slate-600 bg-[#0B192C] p-4 text-base text-white placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
        />

        <div className="mt-2 flex items-center justify-between gap-3">
          <p
            id="question-help"
            className="flex items-center gap-2 text-xs text-slate-400"
          >
            <Info size={15} aria-hidden="true" />
            Maximum 500 characters
          </p>

          <p
            id="question-counter"
            className="text-xs text-slate-400"
          >
            {question.length} / {MAX_CHARACTERS}
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 text-sm text-rose-300"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-teal-400 px-6 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Send size={20} aria-hidden="true" />
          Submit Question
        </button>
      </form>
    </section>
  );
}

export default QuestionInput;
