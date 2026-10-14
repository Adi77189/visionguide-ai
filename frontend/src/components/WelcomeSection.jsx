
 // Displays the VisionGuide AI welcome section and core capabilities.

import { AudioLines, ScanEye, Sparkles } from "lucide-react";

function WelcomeSection() {
  return (
    <section
      aria-labelledby="welcome-heading"
      className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-linear-to-br from-[#10263D] via-[#0D1D32] to-[#091629] px-6 py-12 sm:px-10 sm:py-16"
    >
      {/* Decorative background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">

        {/* AI identity icon */}
        <div className="mb-7 inline-flex rounded-2xl border border-teal-400/20 bg-teal-400/10 p-5">
          <ScanEye
            size={42}
            strokeWidth={1.7}
            className="text-teal-300"
            aria-hidden="true"
          />
        </div>

        {/* Project label */}
        <div className="mb-5 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-200">
            <Sparkles size={15} aria-hidden="true" />
            AI-POWERED ACCESSIBILITY
          </span>
        </div>

        {/* Main heading */}
        <h1
          id="welcome-heading"
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          See Beyond{" "}
          <span className="text-teal-300">
            Limits.
          </span>
        </h1>

        {/* Introduction */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Your intelligent vision companion.
          Capture an image, ask questions using your voice,
          and make everyday visual information more accessible.
        </p>

        {/* Capability indicators */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/70 px-4 py-2 text-sm text-slate-200">
            <ScanEye
              size={17}
              className="text-teal-300"
              aria-hidden="true"
            />
            Image Capture
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/70 px-4 py-2 text-sm text-slate-200">
            <AudioLines
              size={17}
              className="text-teal-300"
              aria-hidden="true"
            />
            Voice Interaction
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/70 px-4 py-2 text-sm text-slate-200">
            <Sparkles
              size={17}
              className="text-teal-300"
              aria-hidden="true"
            />
            AI Assistance
          </span>
        </div>

        <p className="mt-7 text-sm text-slate-400">
          Built for accessibility, independence, and inclusion.
        </p>
      </div>
    </section>
  );
}

export default WelcomeSection;
