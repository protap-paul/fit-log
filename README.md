# 🏋️ FitLog — Workout Library

A dark, no-nonsense gym companion built with **Next.js 16** and **Tailwind CSS**. Pick a lift, lock it into today's plan, and watch the week's work add up.

---

## 🖥️ Live Demo

> Deployed on Vercel — https://fit-log-cyan-one.vercel.app/

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | Framework & page routing |
| **React 19** | UI components |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling & responsive design |
| **DaisyUI v5** | UI component primitives |
| **Lucide React** | Icons |
| **React Hot Toast** | Toast notifications |

---

## ✨ Key Features

1. **📚 Workout Library** — Browse 12 exercises covering every major muscle group, displayed in a responsive 3-column grid with stats (duration, calories, rating).

2. **📋 Today's Plan** — Add up to 5 workouts to your daily plan. Live metrics (Exercises, Minutes, Calories) update in real-time as you add/remove lifts.

3. **🔖 Save for Later** — Bookmark workouts into your Saved tab on the My Plan page for future reference.

4. **💾 Persistent State** — Plan and Saved data persists across page reloads using `localStorage`.

5. **📱 Fully Responsive** — Works seamlessly on mobile, tablet, and desktop. Grid collapses correctly, navbar stays usable, hero stacks on mobile.

6. **🔔 Toast Notifications** — Real-time feedback on adding to plan, saving, marking as done, and removing workouts.

7. **🔢 Live Badge Counters** — Navbar shows current Plan and Saved counts, updating live with each action.

8. **↕️ Sort Workouts** — Sort the My Plan list by Duration, Calories, or Rating using the dropdown.

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/fit-log.git
cd fit-log

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 API

| Endpoint | Description |
|---|---|
| `GET /api/fitlog` | All 12 workouts |
| `GET /api/fitlog/:id` | Single workout by ID |

Base URL: `https://api.abcz.workers.dev`

---

## 📝 Author

Protap Paul
