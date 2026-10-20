
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

**Current phase:** Phase 2 — Image Understanding (local integration tested; deployment pending)

**Deployment status:** Not deployed yet.

## 2. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS v4, lucide-react |
| Backend | Python, FastAPI, Uvicorn, Pillow |
| Speech Recognition | Web Speech API (Phase 1) |
| Computer Vision | OpenAI vision-capable model (gpt-4o-mini tested); image text reading through multimodal prompts |
| Agentic AI | LangGraph (Phase 4) |
| Version Control | Git and GitHub |
| Deployment | Netlify frontend; backend hosting TBD |

## 3. Project Structure

```text
visionguide-ai/
├── frontend/                 # React application and accessible UI
├── backend/                  # FastAPI application and OpenAI integration
│   ├── main.py               # FastAPI app, router registration and health endpoint
│   ├── routes/image.py       # Image validation and image-understanding endpoints
│   ├── services/vision_service.py  # OpenAI multimodal request handling
│   ├── requirements.txt      # Python dependencies
│   ├── test_images/          # Local test dataset (avoid uploading private images)
│   ├── .env                  # Local API key and model configuration (ignored by Git)
│   └── .venv-visionguide311/ # Local virtual environment (ignored by Git)
├── frontend/src/
│   ├── components/           # Accessible UI components
│   ├── hooks/                # Browser speech-recognition hook
│   ├── services/visionApi.js # Frontend HTTP client for image understanding
│   └── App.jsx               # Frontend state and AI response UI
├── .gitignore                # Excludes dependencies and sensitive files
└── README.md                 # Project documentation and phase history
```

## 4. Development Roadmap

| Phase | Features | Status |
|---|---|---|
| Phase 1 | React UI, camera, image upload, text and voice input, Netlify | Local implementation/build complete; Netlify pending |
| Phase 2 | FastAPI, OpenAI image understanding, image text reading, frontend integration | Locally tested; production deployment pending |
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

### Run Backend (Windows PowerShell)

From the project root, activate the virtual environment used for the working backend:

```powershell
cd backend
.\.venv-visionguide311\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Create `backend/.env` locally with your own credentials (never commit this file):

```dotenv
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

Open `http://127.0.0.1:8000/docs` for interactive API documentation or `http://127.0.0.1:8000/health` for a health check. Model access depends on the OpenAI project and account. A previous `gpt-4.1-mini` attempt returned 403 for the tested project; `gpt-4o-mini` was available in the subsequent local tests.

For frontend-to-backend calls, configure `frontend/.env.local` if needed:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Restart the Vite dev server after changing frontend environment variables. The frontend and backend must both be running for local image understanding.

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
- Valid image upload: Passed in backend Swagger test (PNG, HTTP 200)
- Image preview: Pending verification
- Image removal: Pending verification
- Unsupported file validation: Pending verification
- File size validation: Pending verification
- Mobile responsiveness: Pending verification

**Known Limitations:**
- Camera behavior depends on browser and device support.
- No live webcam stream is implemented.
- Image understanding was subsequently implemented in Phase 2.
- Backend format, content, and size validation were subsequently implemented in Phase 2.

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
- AI processing was subsequently implemented in Phase 2.
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


## 7. Phase 2 — OpenAI Image Understanding Development Log

**Status:** Local backend and frontend integration demonstrated; production readiness and deployment pending.

### Step 1: FastAPI Backend and Image Validation

**Files created or updated:**
- `backend/main.py` — Initializes FastAPI, registers the image router, and exposes `/health`.
- `backend/routes/image.py` — Validates uploaded JPEG, PNG, and WebP images and provides the image-understanding endpoint.
- `backend/requirements.txt` — Declares FastAPI, Uvicorn, python-multipart, Pillow, OpenAI, and python-dotenv dependencies.

**Implementation and tests:**
- Added `POST /api/upload-image` with a 5 MB maximum file size, image decoding/verification, and MIME-type matching.
- Confirmed HTTP 413 for oversized images, HTTP 400 for corrupted images, and HTTP 200 for a valid PNG image.
- Added `POST /api/understand-image` accepting an image and a question.
- Confirmed the API through the local Swagger interface at `http://127.0.0.1:8000/docs`.

### Step 2: OpenAI Vision Service

**Files created or updated:**
- `backend/services/__init__.py` — Marks the services package.
- `backend/services/vision_service.py` — Sends image bytes and user questions to an OpenAI vision-capable model.
- `backend/.env` — Holds the local API key and model name; must remain Git-ignored.

**Implementation and tests:**
- Used the OpenAI Python SDK and multimodal Responses API to provide an image and text question.
- Instructed the model to describe observable content, acknowledge uncertainty, follow the user's language, and avoid safety-critical navigation guidance.
- Initially received a model-access HTTP 403 error when trying `gpt-4.1-mini`.
- Verified that the tested OpenAI project listed `gpt-4o` and `gpt-4o-mini`; switched the local configuration to an available model.
- Confirmed HTTP 200 and a useful answer for a blue mug image.
- Confirmed successful image text reading from English and Hindi test images and structured summarization of a sample receipt.

**Important:** The multimodal model reads text from images; a separate dedicated OCR engine has not been documented as implemented.

### Step 3: Test Image Dataset

**Files/folders created:**
- `backend/test_images/` — Locally organized images for repeatable testing.
- `backend/test_images/DATASET_README.md` — Dataset notes and organization.

**Test categories shown in the project:** Everyday objects, indoor scenes, outdoor scenes, English text, Hindi text, documents, product labels, multiple objects, low-light/blur, and accessibility scenarios.

**Privacy:** Do not commit personal photographs, identity documents, private receipts, or other sensitive samples without authorization. Verify dataset licenses and Git repository size before publishing images.

### Step 4: Frontend–Backend Integration

**Files created or updated:**
- `frontend/src/services/visionApi.js` — Sends an image and question using `FormData` to `POST /api/understand-image`; reports backend errors.
- `frontend/src/App.jsx` — Manages selected image, question, loading state, API errors, and accessible AI response presentation.
- `backend/main.py` — Includes the image router and local API configuration; verify CORS settings for each frontend origin.

**Implementation and tests:**
- Connected the image selector and question form to the FastAPI endpoint.
- Added an accessible loading announcement, error message, answer section, and reminder that AI descriptions can be incorrect.
- Added a request ID guard so results from an older request cannot overwrite a newer selection.
- Observed a successful frontend image-description result for a blue mug.
- Observed a frontend `Failed to fetch` error during connectivity testing; retest after backend/network configuration changes. Do not treat this error as an OpenAI model failure without checking the browser network panel and backend logs.

### Phase 2 Test Summary

| Test | Observed result |
|---|---|
| Oversized upload | Passed — HTTP 413 |
| Corrupted image upload | Passed — HTTP 400 |
| Valid PNG upload | Passed — HTTP 200 |
| Image description through Swagger | Passed — HTTP 200 |
| Hindi image text reading | Passed — HTTP 200 |
| English image text reading | Passed — HTTP 200 |
| Receipt/document understanding | Passed — HTTP 200 |
| Frontend image understanding | Passed in a local browser test |
| Frontend connectivity failure display | Observed; recovery should be retested |
| Production build after Phase 2 changes | Not yet verified |
| Netlify frontend deployment | Pending |
| Public FastAPI backend deployment | Pending |

### Phase 2 Known Limitations and Next Actions

- OpenAI requests incur API usage costs and require an API key with model access.
- The OpenAI key must remain server-side; never expose it in Vite `VITE_` environment variables.
- Netlify can host the Vite frontend, but the FastAPI backend needs a separate hosting solution or suitable serverless adaptation.
- Production CORS, backend HTTPS URL, rate limits, upload security, timeout handling, privacy disclosures, and operational logging need verification before public launch.
- OCR accuracy varies with blur, lighting, image resolution, script, and document layout.
- Browser-based voice recognition depends on browser support and user permission; spoken AI answers remain a later-phase feature.
- Image descriptions are not suitable for safety-critical navigation or decisions.

**Deployment:** Pending. **Release:** `v0.2.0` not yet published.

---

## 8. Testing and Deployment
### Phase 1 Production Build (historical result)

**Status:** Passed

**Command:** npm run build

**Build Tool:** Vite 8.3.4

**Result:**
- 1,926 modules transformed successfully.
- Production assets generated in frontend/dist/ at the time of the Phase 1 test.
- Build completed in 738 ms.
- No build errors reported.

**Deployment:** Pending GitHub and Netlify setup.
### Local Testing

- React starter application: Passed
- Python virtual environment activation: Passed
- Git ignore verification: Passed
- Custom VisionGuide UI: Implemented and visually verified
- Image upload and microphone controls: Implemented; browser/device compatibility testing remains ongoing

### Deployment

- Netlify URL: Not available yet
- Production build: Phase 1 build passed; rebuild required after Phase 2 changes
- GitHub remote repository: Not connected yet

## 9. Documentation Rules

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

## 10. Safety and Privacy

VisionGuide AI is intended for non-safety-critical visual-information assistance.

It must not be relied upon for road crossing, obstacle avoidance, medical decisions, or emergency navigation.

Camera images and voice recordings must not be stored without user consent.

## 11. Release History

| Version | Phase | Status |
|---|---|---|
| v0.1.0 | Foundation | In Development |
| v0.2.0 | Computer Vision | Local development tested; not released |
| v0.3.0 | Speech AI | Planned |
| v0.4.0 | Agentic AI | Planned |
| v1.0.0 | Production-style Release | Planned |
