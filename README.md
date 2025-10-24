<div align="center">

# 📚 Plan-Like-A-BOSS

**The smarter way for SCIS students to plan and bid**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://reactjs.org/)

Build conflict-free timetables with an intuitive weekly calendar view. Create multiple schedule drafts, detect conflicts instantly, and export your perfect semester plan.

[Demo](#) • [Features](#features) • [Quick Start](#quick-start)

</div>

---

## ✨ Features

- 🗓️ **Visual Weekly Calendar** - See your entire week at a glance with side-by-side conflict detection
- ⚠️ **Smart Conflict Detection** - Overlapping courses are displayed side-by-side for easy comparison and removal
- 📝 **Multiple Schedules** - Create and compare different timetable drafts
- 🎨 **Dark/Light Theme** - Choose your preferred viewing mode
- ⌨️ **Command Palette** - Quick actions with `Cmd/Ctrl+K`
- 📤 **Export Options** - Share via URL or export as PNG/ICS

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` to start planning!

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **State** | Zustand |
| **Animation** | Framer Motion |
| **Utilities** | date-fns, xlsx |

## 📁 Project Structure

```
Plan-Like-A-Boss/
├── src/
│   ├── components/     # React components
│   ├── store/          # Zustand state management
│   ├── utils/          # Helper functions
│   └── data/           # Course data
├── scripts/            # Excel parsers
└── public/             # Static assets
```

## 🔄 Updating Course Data

To regenerate course data from Excel files:

```bash
node scripts/parseAllExcel.js
```

This updates `src/data/scis-courses.ts` with the latest course information.

## Made with ❤️ for SMU students
