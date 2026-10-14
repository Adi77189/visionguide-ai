
// Manages browser speech recognition, transcription, and microphone state.

import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition(language = "en") {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const SpeechRecognition =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  const isSupported = Boolean(SpeechRecognition);

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      const result = event.results[0]?.[0]?.transcript;

      if (result) {
        setTranscript(result.trim());
      }
    };

    recognition.onerror = (event) => {
      const messages = {
        "not-allowed": "Microphone permission was denied.",
        "no-speech": "No speech detected. Please try again.",
        "audio-capture": "No microphone was found.",
        network: "Speech recognition network error.",
      };

      setError(
        messages[event.error] ||
          "Speech recognition failed. Please try again."
      );
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [language, SpeechRecognition]);

  function startListening() {
    if (!recognitionRef.current) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    setTranscript("");
    setError("");

    try {
      recognitionRef.current.start();
    } catch {
      setError("Unable to start microphone. Please try again.");
    }
  }

  function stopListening() {
    recognitionRef.current?.stop();
  }

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
  };
}
