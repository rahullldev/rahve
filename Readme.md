# Rahve

A modern AI-powered real-time chat platform built with the MERN stack, featuring secure authentication, conversational AI, and a responsive user experience.

## Overview

Rahve is a full-stack web application designed to provide seamless AI-assisted conversations in a modern chat interface. The project demonstrates end-to-end product development, including authentication, API integration, database management, and production deployment.

The application supports traditional authentication alongside social login providers and delivers a smooth real-time chat experience powered by large language models.

## Live Demo

🌐 https://rahve.onrender.com

## Features

* AI-powered conversational assistant
* Secure JWT-based authentication
* Google OAuth authentication
* Twitter/X OAuth authentication
* Persistent chat history
* Responsive modern user interface
* User account management
* RESTful API architecture
* MongoDB database integration
* Production deployment on Render

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* Shadcn

### Backend

* Node.js
* Express.js
* JWT Authentication
* OAuth 2.0

### Database

* MongoDB
* Mongoose

### Deployment

* Render

## Architecture

```text
Client (React + Vite)
        │
        ▼
Express REST API
        │
 ┌──────┴──────┐
 ▼             ▼
MongoDB     AI Services
```

## Key Highlights

* Implemented secure authentication and authorization workflows.
* Integrated multiple login providers including Google and Twitter/X.
* Built scalable backend APIs using Express and MongoDB.
* Designed a responsive user experience optimized for desktop and mobile devices.
* Managed deployment, environment configuration, and production hosting.

## Getting Started

### Prerequisites

* Node.js
* MongoDB
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/rahulldev/rahve.git
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

Create environment variables:

```env
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
OPENAI_API
```

Run the development servers:

```bash
npm run dev
```

## Learning Outcomes

This project provided hands-on experience with:

* Full-stack application development
* Authentication and authorization systems
* OAuth integrations
* API design and implementation
* Database modeling with MongoDB
* Production deployment and environment management
* Building AI-enabled user experiences


