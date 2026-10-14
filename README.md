
# VisionGuide AI

**Voice-First Multimodal Accessibility Copilot**

> Project documentation: This README tracks the architecture, implementation, testing, and deployment of VisionGuide AI across all development phases.

## 1. Project Overview

VisionGuide AI is an accessibility-focused web application designed to help people with visual impairments understand visual information using computer vision, speech recognition, and agentic AI.

The application aims to help users:
- Understand objects and scenes from images.
- Read printed text from documents and labels.
- Ask questions using voice or text.
- Receive accessible text and spoken responses.
- Complete visual-information tasks through AI-powered workflows.

**Current version:** v0.1.0 (Development)

**Current phase:** Phase 1 — Foundation and Frontend

**Deployment status:** Not deployed yet.

## 2. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS (planned) |
| Backend | Python, FastAPI (Phase 2) |
| Speech Recognition | Web Speech API (Phase 1) |
| Computer Vision | OCR and vision models (Phase 2) |
| Agentic AI | LangGraph (Phase 4) |
| Version Control | Git and GitHub |
| Deployment | Netlify frontend; backend hosting TBD |

## 3. Project Structure

```text
visionguide-ai/
├── frontend/                 # React application and accessible UI
├── backend/                  # Future FastAPI and AI services
│   └── .venv-visionguide/    # Local Python virtual environment
├── .gitignore                # Excludes dependencies and sensitive files
└── README.md                 # Project documentation and phase history
```

## 4. Development Roadmap

| Phase | Features | Status |
|---|---|---|
| Phase 1 | React UI, camera, image upload, text and voice input, Netlify | In Progress |
| Phase 2 | Computer vision, OCR, image understanding | Pending |
| Phase 3 | Advanced speech interaction and voice responses | Pending |
| Phase 4 | LangGraph agents, tools, conversation memory | Pending |
| Phase 5 | Accessibility, testing, optimization, production readiness | Pending |

## 5. Local Development Setup

### Prerequisites

- Node.js and npm
- Python
- Git
- Visual Studio Code

### Run Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173/

### Activate Backend Virtual Environment

From the project root:

```powershell
cd backend
.\.venv-visionguide\Scripts\Activate.ps1
```

The backend application has not been implemented yet.

## 6. Phase 1 — Development Log

### Step 1: React + Vite Setup

**Status:** Completed

- Created the `visionguide-ai` project.
- Initialized React + Vite in `frontend/`.
- Installed frontend dependencies.
- Verified the starter application at localhost:5173.

### Step 2: Python Environment Setup

**Status:** Completed

- Created `backend/`.
- Created `.venv-visionguide`.
- Activated the Python virtual environment.
- Python version used: 3.14.5.

### Step 3: Git Configuration

**Status:** Completed

- Created root `.gitignore`.
- Initialized the Git repository.
- Verified that Python virtual environment and Node.js dependencies are ignored.

### Step 4: README Documentation

**Status:** In Progress

- Documenting the project overview.
- Recording the technology stack.
- Maintaining the folder structure.
- Tracking implementation and deployment phases.

### Step 5: Tailwind CSS Integration

**Status:** Completed after local verification

**Files Modified:**
- `frontend/vite.config.js` — Configures React and Tailwind Vite plugins.
- `frontend/src/index.css` — Loads Tailwind and global styles.
- `frontend/src/App.jsx` — Renders the temporary styling verification UI.
- `frontend/package.json` — Updated dependencies through npm.

**Implementation:**
- Installed Tailwind CSS v4 and its Vite plugin.
- Integrated Tailwind into the React frontend.
- Added basic global styling.
- Created a temporary interface to test Tailwind classes.

**Testing:**
- Run `npm run dev`.
- Open `http://localhost:5173/`.
- Confirm dark background, cyan heading, and green message.

**Deployment:** Pending.

### Step 6.2: Header Component

**Status:** Completed after browser verification

**Files Created:**
- `frontend/src/components/Header.jsx` — Displays application branding and language selection.

**Files Modified:**
- `frontend/src/App.jsx` — Integrates the Header component and manages selected language.
- `frontend/package.json` — Adds lucide-react icon dependency.

**Implementation:**
- Created a reusable React header.
- Added VisionGuide AI branding.
- Added an accessible language selector.
- Implemented React state management using useState.
- Added a skip-to-main-content accessibility link.

**Testing:**
- Verify header appears correctly.
- Verify English/Hindi dropdown selection works.
- Verify keyboard focus and responsive layout.

**Known Limitation:**
- Changing the selected language does not translate page content yet.

**Deployment:** Pending.


### Step 6.3: Welcome Section

**Status:** Completed after browser verification

**Files Created:**
- `frontend/src/components/WelcomeSection.jsx` — Displays the application introduction, hero design, and capability indicators.

**Files Modified:**
- `frontend/src/App.jsx` — Integrates the WelcomeSection component into the main layout.

**Implementation:**
- Added a reusable welcome component.
- Created a responsive gradient hero section.
- Added accessible heading and section semantics.
- Introduced visual indicators for planned capabilities.
- Preserved the existing Header component.

**Testing:**
- Verify the welcome section renders.
- Verify header functionality remains unchanged.
- Verify layout on desktop and mobile screen widths.
- Verify heading structure and readable contrast.

**Known Limitations:**
- Capability indicators are informational only.
- Camera, speech recognition, and AI analysis are not yet connected.

**Deployment:** Pending.


### Step 6.4: Camera Capture and Image Upload

**Status:** Completed after local testing

**Files Created:**
- `frontend/src/components/ImageInput.jsx` — Handles image selection, camera capture, file validation, preview, and removal.

**Files Modified:**
- `frontend/src/App.jsx` — Stores the selected image in application state and integrates ImageInput.

**Implementation:**
- Added camera capture through the native file input.
- Added device image upload.
- Supported JPEG, PNG, and WebP.
- Added a 5 MB file size limit.
- Added image preview and removal.
- Added accessible buttons and validation messages.
- Used temporary object URLs for image previews.

**Testing:**
- Valid image upload: Pending verification
- Image preview: Pending verification
- Image removal: Pending verification
- Unsupported file validation: Pending verification
- File size validation: Pending verification
- Mobile responsiveness: Pending verification

**Known Limitations:**
- Camera behavior depends on browser and device support.
- No live webcam stream is implemented.
- Images are not yet analyzed by AI.
- File validation is client-side only.

**Deployment:** Pending.


### Step 6.5: Question Input Component

**Status:** Completed after local testing

**Files Created:**
- `frontend/src/components/QuestionInput.jsx` — Handles text questions, validation, and submission.

**Files Modified:**
- `frontend/src/App.jsx` — Stores submitted questions and displays confirmation.

**Implementation:**
- Created a reusable question input component.
- Added 500-character validation.
- Required an image before submitting a question.
- Added accessible error messages and form labels.
- Connected child-to-parent state updates through callbacks.

**Testing:**
- Empty question validation: Pending verification
- Image requirement: Pending verification
- Question submission: Pending verification
- Character limit: Pending verification
- Keyboard navigation: Pending verification

**Known Limitations:**
- AI processing is not yet implemented.
- Submitted questions are stored only in browser memory.
- Questions are not yet persisted in a database.

**Deployment:** Pending.


### Step 6.6: Speech Recognition

**Status:** Completed after local testing

**Files Created:**
- `frontend/src/hooks/useSpeechRecognition.js` — Manages browser speech recognition and microphone events.
- `frontend/src/components/VoiceInput.jsx` — Provides microphone controls and transcription feedback.

**Files Modified:**
- `frontend/src/QuestionInput.jsx` — Accepts recognized speech as question text.
- `frontend/src/App.jsx` — Connects voice input with question submission.

**Implementation:**
- Integrated browser SpeechRecognition API.
- Added English and Hindi recognition language settings.
- Added start and stop microphone controls.
- Automatically populates the question textarea.
- Added permission and recognition error handling.

**Testing:**
- English transcription: Pending verification
- Hindi transcription: Pending verification
- Microphone permissions: Pending verification
- Question field integration: Pending verification
- Stop listening: Pending verification

**Known Limitations:**
- Speech recognition support varies by browser.
- Some browsers use online recognition services.
- No audio files are stored by the application.
- Text-to-speech output is not yet implemented.

**Deployment:** Pending.


## 7. Testing and Deployment
### Phase 1 Production Build

**Status:** Passed

**Command:** npm run build

**Build Tool:** Vite 8.3.4

**Result:**
- 1,926 modules transformed successfully.
- Production assets generated in frontend/dist/.
- Build completed in 738 ms.
- No build errors reported.

**Deployment:** Pending GitHub and Netlify setup.
### Local Testing

- React starter application: Passed
- Python virtual environment activation: Passed
- Git ignore verification: Passed
- Custom VisionGuide UI: Not implemented
- Camera and microphone features: Not implemented

### Deployment

- Netlify URL: Not available yet
- Production build: Pending
- GitHub remote repository: Not connected yet

## 8. Documentation Rules

After every development step:
1. Document the files created or modified.
2. Explain each file's responsibility.
3. Record implementation details.
4. Record testing results.
5. Update phase completion status.

After every deployment:
1. Record the release version.
2. Record the deployment URL.
3. Document new features and fixes.
4. Record known limitations.
5. Confirm that previous features still work.

## 9. Safety and Privacy

VisionGuide AI is intended for non-safety-critical visual-information assistance.

It must not be relied upon for road crossing, obstacle avoidance, medical decisions, or emergency navigation.

Camera images and voice recordings must not be stored without user consent.

## 10. Release History

| Version | Phase | Status |
|---|---|---|
| v0.1.0 | Foundation | In Development |
| v0.2.0 | Computer Vision | Planned |
| v0.3.0 | Speech AI | Planned |
| v0.4.0 | Agentic AI | Planned |
| v1.0.0 | Production-style Release | Planned |
