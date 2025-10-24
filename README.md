# Plan-Like-A-BOSS

**The Production-Ready Course Planning Application for Singapore Management University**

Plan-Like-A-BOSS is a professional-grade, feature-rich web application designed to transform the stressful course planning process into a delightful and efficient experience. Built with modern web technologies, stunning UI, and **pre-loaded with 90 SCIS courses with section timings**, it's the ultimate tool for SMU students to visualize, organize, and optimize their academic schedules.

![React](https://img.shields.io/badge/Built%20with-React-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007acc?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)


### Course & Section Management
- **Dynamic Course List**: Add, edit, and delete courses with ease
- **Multi-Section Support**: Multiple sections per course with different timings
- **Complete Section Details**: Section IDs, schedules, instructors, venues, and notes
- **Automatic Persistence**: All data saved automatically to browser localStorage
- **Bulk Import**: Add pre-loaded courses with all sections in one click

### Interactive Weekly Calendar
- **7-Day View**: Clean calendar layout from Monday to Sunday
- **Time Grid**: Granular time slots from 8:00 AM to 11:00 PM
- **Live Rendering**: Instant visualization of selected sections
- **Beautiful Blocks**: Color-coded course blocks with detailed information
- **Smooth Animations**: Buttery-smooth transitions and interactions

### Smart Conflict Detection
- **Real-Time Analysis**: Instant conflict detection as you add or modify sections
- **Visual Feedback**: Conflicting classes highlighted with warning icons
- **Accurate Algorithm**: Robust time overlap detection down to the minute
- **Auto-Resolution**: Visual indicators clear when conflicts are resolved

### Advanced Features
- **Multiple Schedules**: Create unlimited schedule drafts (Dream Schedule, Backup Plan, etc.)
- **Shareable Links**: Generate unique URLs to share schedules with friends
- **Export Options**:
  - Download calendar as high-resolution PNG image
  - Export as .ics file for Google Calendar/Outlook
- **Dark/Light Mode**: Beautiful theme toggle with smooth transitions
- **Command Palette**: Keyboard-driven interface (Cmd/Ctrl+K) for power users
- **Production Statistics**: Live course data statistics in the UI

## Tech Stack

This application is built with a modern, production-ready technology stack:

- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (100% type-safe)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (utility-first)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (simple & powerful)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (physics-based)
- **Icons**: [Lucide React](https://lucide.dev/) (beautiful icon set)
- **Excel Parsing**: [xlsx](https://www.npmjs.com/package/xlsx) (SheetJS)
- **Export**: [html-to-image](https://github.com/bubkoo/html-to-image) for PNG export
- **Date Handling**: [date-fns](https://date-fns.org/) for ICS generation

## Project Structure

```
Plan-Like-A-Boss/
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── CalendarGrid.tsx
│   │   │   └── CalendarEventBlock.tsx
│   │   ├── features/         # Feature-specific components
│   │   │   ├── CourseBrowser.tsx  # ENHANCED with filters
│   │   │   ├── CourseList.tsx
│   │   │   ├── AddCourseModal.tsx
│   │   │   ├── AddSectionModal.tsx
│   │   │   ├── ScheduleManager.tsx
│   │   │   ├── ShareModal.tsx
│   │   │   ├── ExportMenu.tsx
│   │   │   └── CommandPalette.tsx
│   │   └── effects/          # Visual effects
│   │       ├── AnimatedBackground.tsx
│   │       ├── SpotlightCursor.tsx
│   │       └── ConfettiCelebration.tsx
│   ├── data/
│   │   └── scis-courses.ts   # Pre-loaded course data (AUTO-GENERATED)
│   ├── store/
│   │   └── useStore.ts       # Zustand state management
│   ├── utils/
│   │   ├── timeUtils.ts      # Time conversion & conflict detection
│   │   ├── colorUtils.ts     # Color generation utilities
│   │   └── exportUtils.ts    # ICS & URL encoding utilities
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── styles/
│   │   └── global.css        # Global styles & Tailwind
│   ├── App.tsx               # Main application component
│   └── main.tsx              # Application entry point
├── scripts/
│   └── parseAllExcel.js      # Excel data parser (PRODUCTION READY)
├── Book1.xlsx                # Course data source 1
├── Book2.xlsx                # Course data source 2
├── Sections.xlsx             # Real section timings
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Plan-Like-A-Boss
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Updating Course Data

If you need to update the course data from Excel files:

```bash
node scripts/parseAllExcel.js
```

This will:
- Parse Book1.xlsx and Book2.xlsx for course information
- Extract real section timings from Sections.xlsx
- Generate a new `src/data/scis-courses.ts` file
- Provide statistics about the data quality


## Course Data Integration

### How It Works

The app includes a sophisticated Excel parser that:

1. **Reads Book1.xlsx and Book2.xlsx**: Extracts course codes, names, and instructor information
2. **Reads Sections.xlsx**: Extracts REAL section timings, days, instructors, venues, and notes

## Support

Having issues? Found a bug? Have a feature request?

- Open an issue on GitHub
- Check existing issues for solutions
- Contribute improvements via pull requests

---

**Made with ❤️ for SMU Students**

*Plan your courses like a BOSS!* 🎓🚀
