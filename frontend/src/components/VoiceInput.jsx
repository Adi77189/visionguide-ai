
// Handles microphone controls, speech status, and transcription forwarding.

import { useEffect } from "react";
import { Mic, MicOff, AudioLines, AlertCircle } from "lucide-react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

function VoiceInput({ language, onTranscript }) {
  const {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
  } = useSpeechRecognition(language);

  // Forward recognized speech to the parent component.
  useEffect(() => {
    if (transcript) {
      onTranscript?.(transcript);
    }
  }, [transcript, onTranscript]);

  return (
    <section
      aria-labelledby="voice-input-heading"
      className="mt-8 rounded-3xl border border-slate-700/70 bg-[#102038] p-5 sm:p-8"
    >
      <h2
        id="voice-input-heading"
        className="flex items-center gap-3 text-xl font-bold text-white"
      >
        <AudioLines
          size={25}
          className="text-teal-300"
          aria-hidden="true"
        />
        Voice Input
      </h2>

      <p className="mt-2 text-sm text-slate-300">
        Speak your question in English or Hindi.
      </p>

      <button
        type="button"
        disabled={!isSupported}
        onClick={isListening ? stopListening : startListening}
        className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-teal-400 px-6 py-4 font-bold text-slate-950 transition-colors hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {isListening ? (
          <>
            <MicOff size={22} aria-hidden="true" />
            Stop Listening
          </>
        ) : (
          <>
            <Mic size={22} aria-hidden="true" />
            Start Speaking
          </>
        )}
      </button>

      <div
        role="status"
        aria-live="polite"
        className="mt-4 text-sm"
      >
        {isListening ? (
          <p className="text-teal-200">
            Listening... Please speak clearly.
          </p>
        ) : transcript ? (
          <p className="text-slate-200">
            Recognized: {transcript}
          </p>
        ) : (
          <p className="text-slate-400">
            Microphone is currently inactive.
          </p>
        )}
      </div>

      {!isSupported && (
        <p className="mt-3 text-sm text-amber-300">
          Your browser does not support speech recognition.
          Please use text input.
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-3 flex items-center gap-2 text-sm text-rose-300"
        >
          <AlertCircle size={18} aria-hidden="true" />
          {error}
        </p>
      )}
    </section>
  );
}

export default VoiceInput;
