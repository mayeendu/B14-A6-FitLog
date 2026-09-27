# FitLog

FitLog is a modern fitness and workout planning web application built with **Next.js, React, and TypeScript**. It allows users to explore exercises, view detailed workout information, create a daily workout plan, save exercises for later, track completed workouts, and monitor live workout statistics.

## 🛠️ Technologies Used

- **Next.js** – React framework for building the application
- **React** – Component-based UI development
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Responsive and modern styling
- **DaisyUI** – UI components and utilities
- **React Icons** – Icons throughout the application
- **React Hot Toast** – Action notifications
- **React Context API** – Global fitness plan state management
- **External REST API** – Exercise data and workout information

## ✨ Key Features

### 1. 🏋️ Exercise Library

Users can browse a collection of exercises loaded from an external API. Each exercise card displays useful information such as:

- Exercise name
- Equipment
- Difficulty
- Duration
- Calories burned
- Rating

### 2. 📖 Exercise Details

Users can click on an exercise to view its complete details, including:

- Exercise description
- Instructions
- Equipment
- Difficulty
- Duration
- Calories
- Sets
- Repetitions
- Rating

Users can also add an exercise directly to **Today's Plan** or save it for later.

### 3. 📋 Today's Workout Plan

Users can create their own daily workout plan by adding exercises from the library or exercise details page.

Features include:

- Add exercises to Today's Plan
- Prevent duplicate exercises
- Remove exercises
- Mark exercises as completed
- View the number of planned exercises

Once an exercise is added, the **Add Today's Plan** button becomes disabled.

### 4. 🔖 Save Exercises for Later

Users can save exercises for future workouts without adding them to today's plan.

Saved exercises can later be added or removed from **Today's Plan** using a convenient toggle:

