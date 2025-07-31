


# Recipe Room

![Recipe Room Homepage Preview](https://i.imgur.com/aNES7r1.png)

**Live Demo:** [https://front-end-recipe-room-phase-5-zzxt.vercel.app/](https://front-end-recipe-room-phase-5-zzxt.vercel.app/)

## Introduction

Recipe Room is a collaborative web platform designed to bring food lovers together. Whether you are a home cook, a professional chef, or just someone looking for meal inspiration, Recipe Room makes it easy to find, share, and discuss recipes in a supportive community. The app was built as a capstone group project for Phase-5 at Moringa School.

Our goal was to create a user-friendly, visually appealing, and interactive recipe-sharing experience that encourages users to connect, learn, and have fun with food.


## Problem Statement

Finding, sharing, and organizing recipes online can be overwhelming. Many platforms lack a sense of community, and it's hard to keep track of your favorite recipes or collaborate with others. Recipe Room was created to solve this by providing a fun, interactive space for users to discover, share, and discuss recipes together.


## Project Overview

Recipe Room is a web application where users can:
- Browse and search for recipes from around the world
- Bookmark and rate their favorite recipes
- Join or create groups to share and discuss recipes
- Post comments and feedback on recipes
- Upload images for their recipes


This front end project was built as a group assignment for Phase-5 Moringa School by Richard Olella, Timina Makena, and Elvis Wachira.

## User Stories

- As a new user, I want to sign up and log in securely so I can access all features.
- As a user, I want to search for recipes by name, country, rating, or serving size so I can quickly find what I want.
- As a user, I want to view detailed recipe pages with images, ingredients, and instructions.
- As a user, I want to bookmark and rate recipes so I can keep track of my favorites and help others find the best ones.
- As a user, I want to join or create groups to share recipes and discuss with others who have similar interests.
- As a group member, I want to post new group recipes and comment on them.
- As a group admin, I want to manage my group, including deleting it if needed.
- As a user, I want the app to look good and work well on both desktop and mobile.


## Technologies Used
- **Frontend:** React, Redux Toolkit, Axios
- **Backend:** Flask (deployed separately)
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS (with modern, responsive design)
- **Image Uploads:** Cloudinary
- **Deployment:** Vercel


## MVP Features
- User authentication (signup, login, logout)
- Recipe search and filtering (by name, country, rating, serving size)
- Recipe detail view with images, ingredients, and instructions
- Bookmarking and rating recipes
- Group creation, joining, and leaving
- Posting and viewing group recipes
- Commenting on recipes
- Responsive design for mobile and desktop


## Project Structure
```
front-end-recipe-room-phase-5/
├── public/
│   └── index.html
├── src/
│   ├── app/           # Redux store and root reducer
│   ├── assets/        # Images and static assets
│   ├── components/    # Reusable UI components (Navbar, Footer, RecipeCard, etc.)
│   ├── features/      # Redux slices for auth, recipes, bookmarks, comments, ratings, groups
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Main pages (Home, Login, Signup, Profile, Bookmarks, GroupRecipe, etc.)
│   ├── routes/        # AppRoutes and route config
│   ├── services/      # API and Cloudinary helpers
│   ├── styles/        # Global CSS
│   └── utils/         # Utility functions (authHeader, constants, formatDate, etc.)
├── .env               # Environment variables
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
```

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/olella93/front-end-recipe-room-phase-5.git
   cd front-end-recipe-room-phase-5
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file (see `.env.example` if available). Example:
   ```env
   REACT_APP_API_BASE_URL=https://your-backend-url/api
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```
4. Start the app:
   ```bash
   npm start
   ```
5. Make sure the backend API is running and accessible (see below).

## Backend Setup

The backend is a Flask REST API (not included in this repo). You can find the backend code and setup instructions in the corresponding backend repository. Make sure to:
- Deploy the backend (e.g., on Railway)
- Set CORS to allow requests from your frontend domain
- Use JWT for authentication

## Deployment

The frontend is deployed on Railway. To deploy your own version:
1. Push your code to GitHub
2. Connect your repo to Railway
3. Set environment variables in Railway dashboard
4. Trigger a deploy

## Learning Reflections

This project helped us learn and practice:
- Building a full-featured React app with Redux Toolkit
- Managing authentication and protected routes
- Handling file uploads with Cloudinary
- Working with REST APIs and async actions
- Collaborating as a team using Git and GitHub
- Debugging, testing, and deploying a real-world project
## Team Members
- Richard Olella
- Timina Makena
- Elvis Wachira

---


Thank you for checking out Recipe Room! We hope you enjoy using it as much as we enjoyed building it. If you have any questions or feedback, feel free to reach out!



