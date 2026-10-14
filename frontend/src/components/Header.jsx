
 // Displays VisionGuide AI branding and language selection.

import { Eye, Languages } from "lucide-react";

function Header({ language, onLanguageChange }) {
  return (
    <header className="border-b border-slate-800 bg-[#071326]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-teal-400/10 p-3">
            <Eye
              size={26}
              className="text-teal-300"
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight text-white">
              VisionGuide{" "}
              <span className="text-teal-300">AI</span>
            </p>

            <p className="hidden text-xs tracking-wider text-slate-400 sm:block">
              YOUR INTELLIGENT VISION COMPANION
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Languages
            size={19}
            className="text-teal-300"
            aria-hidden="true"
          />

          <label htmlFor="app-language" className="sr-only">
            Select application language
          </label>

          <select
            id="app-language"
            value={language}
            onChange={(event) =>
              onLanguageChange(event.target.value)
            }
            className="cursor-pointer rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
