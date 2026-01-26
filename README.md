# Real-Time Collaborative Document Editor

A full-stack, real-time collaborative document editor inspired by Google Docs.  
Built to deeply learn modern web engineering, real-time systems, and scalable app architecture.

---

## 🚀 What this project is

Mini Google Docs is a cloud-based document editor that allows users to:

- Create and manage documents  
- Collaborate in real time with multiple users  
- Edit rich text (headings, fonts, lists, links, images, formatting, etc.)  
- Work inside organizations  
- Persist documents securely in the cloud  

This project focuses on **real engineering concepts**, not just UI.

🌐 Live Demo at - https://google-docs-mini.vercel.app/

---

## ✨ Core Features

- 🔐 Authentication & Organizations (Clerk)  
- 📄 Cloud document storage (Convex)  
- ⚡ Real-time collaboration & presence (Liveblocks)  
- ✍️ Rich-text editor (TipTap)  
- 👥 Multi-user cursors & live updates  
- 🏢 Organization-based document access  
- 🧠 Fully typed codebase (TypeScript)  
- 🌐 Deployed on Vercel  

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router, Server Components)  
- React + TypeScript  
- Tailwind CSS + shadcn/ui  
- TipTap editor  

### Backend / Services
- Convex (database, queries, mutations)  
- Clerk (authentication, organizations, sessions)  
- Liveblocks (real-time collaboration, rooms, presence)  

### Other tools & libraries
- Zustand (state management)  
- nuqs (URL state management)  
- Radix UI  
- Vercel (deployment)  

---

## 🧠 What I learned building this

### ⚙️ Architecture & Engineering
- Server vs Client Components in Next.js  
- Real-time auth flows (Liveblocks + Clerk)  
- Designing document-room systems  
- Strict TypeScript in large projects  
- Production build debugging  
- Multi-service integration  

### 🗄️ Backend & Data
- Convex schema design  
- Queries, mutations, pagination  
- Secure server-side authorization  
- Organization-based access control  

### 🔐 Authentication
- Clerk auth & session handling  
- Organization membership logic  
- Securing API routes  
- Connecting auth to real-time systems  

### ⚡ Real-time Systems
- Liveblocks rooms & sessions  
- Resolving users dynamically  
- Presence, cursors, collaboration layers  
- Editor synchronization  

### 🎨 Frontend & UX
- Rich-text editing systems  
- Toolbar architecture  
- Component composition  
- State management  
- Tailwind at scale  

---

## 📦 Running locally

```bash
git clone <repo>
cd googledocsmini
npm install
npm run dev
