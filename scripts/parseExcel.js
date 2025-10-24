/**
 * Excel Parser Script
 * Parses the SCIS course data from Excel and generates a TypeScript data file
 */

import XLSX from 'xlsx';
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the Excel file
const filePath = join(__dirname, '../School of Computing and Information Systems Courses 2025-2026-1.xlsx');
const file = readFileSync(filePath);
const workbook = XLSX.read(file, { type: 'buffer' });

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const rawData = XLSX.utils.sheet_to_json(worksheet);

console.log('📊 Parsing SCIS Course Data...');
console.log(`Found ${rawData.length} rows`);
console.log('Sample row:', JSON.stringify(rawData[0], null, 2));

// Parse the data into our course structure
const coursesArray = [];

// Common time slots for SMU courses
const commonTimeSlots = [
  { day: 'Monday', startTime: '08:15', endTime: '11:30' },
  { day: 'Monday', startTime: '12:00', endTime: '15:15' },
  { day: 'Monday', startTime: '15:30', endTime: '18:45' },
  { day: 'Monday', startTime: '19:00', endTime: '22:15' },
  { day: 'Tuesday', startTime: '08:15', endTime: '11:30' },
  { day: 'Tuesday', startTime: '12:00', endTime: '15:15' },
  { day: 'Tuesday', startTime: '15:30', endTime: '18:45' },
  { day: 'Wednesday', startTime: '08:15', endTime: '11:30' },
  { day: 'Wednesday', startTime: '12:00', endTime: '15:15' },
  { day: 'Wednesday', startTime: '15:30', endTime: '18:45' },
  { day: 'Thursday', startTime: '08:15', endTime: '11:30' },
  { day: 'Thursday', startTime: '12:00', endTime: '15:15' },
  { day: 'Thursday', startTime: '15:30', endTime: '18:45' },
  { day: 'Friday', startTime: '08:15', endTime: '11:30' },
  { day: 'Friday', startTime: '12:00', endTime: '15:15' },
  { day: 'Friday', startTime: '15:30', endTime: '18:45' },
];

rawData.forEach((row, index) => {
  try {
    const courseCode = row['Course Code'];
    const courseName = row['Course Title'];
    const numSections = parseInt(row['No of Sections']) || 2;
    const instructors = row['Instructors'] || 'TBA';

    if (!courseCode || !courseName) {
      return;
    }

    // Parse instructors
    const instructorList = instructors
      .split(/\r?\n/)
      .map(i => i.replace(/\s*\(\d+\)\s*$/,  '').trim())
      .filter(i => i && i !== 'TBA');

    // Generate realistic sections
    const sections = [];
    for (let i = 0; i < Math.min(numSections, 6); i++) {
      const timeSlot = commonTimeSlots[i % commonTimeSlots.length];
      const instructor = instructorList[i % instructorList.length] || 'TBA';

      sections.push({
        sectionId: `G${i + 1}`,
        day: timeSlot.day,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        instructor,
        venue: '', // Students will fill this in based on BOSS
        notes: '',
      });
    }

    coursesArray.push({
      courseCode,
      courseName,
      sections,
    });
  } catch (error) {
    console.error(`Error parsing row ${index + 1}:`, error);
  }
});

console.log(`\n✅ Parsed ${coursesArray.length} courses`);
console.log(`   Total sections: ${coursesArray.reduce((sum, c) => sum + c.sections.length, 0)}`);

// Generate TypeScript file
const tsContent = `/**
 * Pre-loaded SCIS Course Data (2025-2026)
 * Auto-generated from Excel file
 *
 * NOTE: Section timings are template-based. Students should verify actual
 * class times from BOSS (SMU's bidding system) and update sections accordingly.
 */

import { DayOfWeek } from '@/types';

export interface PreloadedSection {
  sectionId: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  instructor: string;
  venue: string;
  notes: string;
}

export interface PreloadedCourse {
  courseCode: string;
  courseName: string;
  sections: PreloadedSection[];
}

export const SCIS_COURSES: PreloadedCourse[] = ${JSON.stringify(coursesArray, null, 2)};

// Helper to search courses
export function searchCourses(query: string): PreloadedCourse[] {
  const q = query.toLowerCase().trim();
  if (!q) return SCIS_COURSES;

  return SCIS_COURSES.filter(course =>
    course.courseCode.toLowerCase().includes(q) ||
    course.courseName.toLowerCase().includes(q)
  );
}

// Helper to get course by code
export function getCourseByCode(code: string): PreloadedCourse | undefined {
  return SCIS_COURSES.find(c => c.courseCode === code);
}

// Get all unique course codes
export function getAllCourseCodes(): string[] {
  return SCIS_COURSES.map(c => c.courseCode);
}

// Get courses by level (100-level, 200-level, etc.)
export function getCoursesByLevel(level: number): PreloadedCourse[] {
  const levelStr = level.toString();
  return SCIS_COURSES.filter(c => {
    const match = c.courseCode.match(/\\d+/);
    if (!match) return false;
    return match[0].startsWith(levelStr);
  });
}
`;

// Write to src/data directory
const outputPath = join(__dirname, '../src/data/scis-courses.ts');
writeFileSync(outputPath, tsContent);

console.log(`\n🎉 Generated: ${outputPath}`);
console.log('\n📋 Sample courses:');
coursesArray.slice(0, 5).forEach(course => {
  console.log(`   - ${course.courseCode}: ${course.courseName} (${course.sections.length} sections)`);
});
