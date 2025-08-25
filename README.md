# Company-Specific Job Portal with ATS

A **full-stack job portal web application** with an integrated **Applicant Tracking System (ATS)** and an employer-focused analytics dashboard.
The platform enables employers to post jobs, track applications, and analyze candidate resumes with AI-powered insights, while candidates can search and apply for jobs seamlessly.
---

## 🚀 Technologies Used

### Frontend
- React (TypeScript)
- Apollo Client (GraphQL)
- Tailwind CSS & DaisyUI
- React Router
- Axios
- React Toastify
- Recharts (Charts & Analytics)

### Backend
- Node.js & Express
- TypeScript
- Apollo Server (GraphQL)
- MongoDB & Mongoose
- JWT Authentication
- Multer (File Uploads)
- node-cron (Scheduled Tasks)
- AI Integration (HuggingFace, OpenAI)
- PDF & DOCX Parsing (pdf-extraction, mammoth)

---

## 🌟 Features

### Candidate Features
- **Browse Jobs** – View available jobs with filter & search options.
- **Apply for Jobs** – Multi-step form, upload resume (PDF/DOCX), add LinkedIn, skills, work experience.
- **Track Applications** – See application status (Pending, Accepted, Rejected), ATS score & feedback, and download resume.
- **Authentication** – Secure login/signup (JWT-based).

### Employer Features
- **Dashboard** – Interactive analytics (applications, status distribution, ATS scores).
- **Job Management** – Create, edit, and delete job postings (CRUD).
- **Application Management** – View candidate applications, filter/search by ATS score, status, or job title.
- **Update Application Status** – Accept/Reject candidates and trigger **automated email notifications**.

### ATS & Analytics
- **AI Resume Analysis** – Uses HuggingFace/OpenAI to analyze candidate resumes against job requirements.
- **ATS Score & Feedback** – Provides a suitability score with concise AI-generated feedback.
- **Analytics Dashboard** – Charts for:
  - Application status distribution  
  - Applications per job  
  - Average ATS score per job  
  - Applications per day
- **Scheduled Tasks** –  
  - Auto ATS processing for new applications  
  - Daily cleanup of rejected applications  
  - Automated email system for accepted candidates

### Project Structure
company-specific-job-portal-ats/
│── FrontEnd/                        # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── Components/              # Reusable UI components
│   │   ├── Pages/                   # Page-level components (Jobs, Dashboard, etc.)
│   │   ├── GraphQL/                 # Apollo Client queries & mutations
│   │   ├── Context/                 # React context providers
│   │   ├── Aceternity_Utils/        # Utility functions & effects
│   │   ├── assets/                  # Static assets
│   ├── public/                      # Public images and files
│   └── package.json
│
│── BackEnd/                         # Backend (Node.js + Express + Apollo Server)
│   ├── src/
│   │   ├── ATS_System/              # AI resume parsing & scoring pipeline
│   │   ├── Controllers/             # REST & GraphQL controllers
│   │   ├── GraphQL/                 # Apollo Server, resolvers, typeDefs
│   │   ├── MiddleWare/              # Auth & other middleware
│   │   ├── Models/                  # MongoDB models (User, Job, Application, etc.)
│   │   ├── Routes/                  # REST endpoints
│   │   ├── Services/                # Business logic/services
│   │   ├── types/                   # TypeScript type definitions
│   ├── Uploads/                     # Uploaded resumes/CVs
│   └── package.json
│
│── .env                             # Environment variables
│── README.md                        # Project description
