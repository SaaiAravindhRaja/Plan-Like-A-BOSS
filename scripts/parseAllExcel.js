/**
 * Comprehensive Excel Parser for Plan-Like-A-BOSS
 * Parses Book1.xlsx, Book2.xlsx, and Sections.xlsx
 * Generates production-ready course data with ACCURATE section timings
 */

import XLSX from 'xlsx';
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('📚 Starting Comprehensive Excel Data Parser...\n');

// Read all three Excel files
const book1Path = join(__dirname, '../Book1.xlsx');
const book2Path = join(__dirname, '../Book2.xlsx');
const sectionsPath = join(__dirname, '../Sections.xlsx');

console.log('📖 Reading Excel files...');
const book1 = XLSX.read(readFileSync(book1Path), { type: 'buffer' });
const book2 = XLSX.read(readFileSync(book2Path), { type: 'buffer' });
const sectionsWorkbook = XLSX.read(readFileSync(sectionsPath), { type: 'buffer' });

// Parse Book1
console.log('\n📊 Parsing Book1.xlsx...');
const book1Sheet = book1.Sheets[book1.SheetNames[0]];
const book1Data = XLSX.utils.sheet_to_json(book1Sheet);
console.log(`   Found ${book1Data.length} courses in Book1`);

// Parse Book2
console.log('📊 Parsing Book2.xlsx...');
const book2Sheet = book2.Sheets[book2.SheetNames[0]];
const book2Data = XLSX.utils.sheet_to_json(book2Sheet);
console.log(`   Found ${book2Data.length} courses in Book2`);

// Parse ALL sheets from Sections.xlsx
console.log('📊 Parsing Sections.xlsx (ALL sheets)...');
const sectionsData = new Map(); // Map of courseCode -> sections[]

sectionsWorkbook.SheetNames.forEach(sheetName => {
  console.log(`   Processing sheet: ${sheetName}`);
  const sheet = sectionsWorkbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  data.forEach(row => {
    const courseCode = row['Course Code'] || row['Course'] || row['Code'];
    if (!courseCode) return;

    // Extract section information
    const section = {
      sectionId: row['Section'] || row['Section ID'] || row['Sec'] || 'G1',
      day: row['Day'] || row['Day of Week'] || '',
      startTime: row['Start Time'] || row['Start'] || row['Time Start'] || '',
      endTime: row['End Time'] || row['End'] || row['Time End'] || '',
      instructor: row['Instructor'] || row['Professor'] || row['Faculty'] || 'TBA',
      venue: row['Venue'] || row['Room'] || row['Location'] || '',
      notes: row['Notes'] || row['Remarks'] || ''
    };

    if (!sectionsData.has(courseCode)) {
      sectionsData.set(courseCode, []);
    }
    sectionsData.get(courseCode).push(section);
  });
});

console.log(`   Found section data for ${sectionsData.size} courses`);

// Helper function to clean and normalize data
function cleanString(str) {
  if (!str) return '';
  return String(str).trim().replace(/\s+/g, ' ');
}

function parseTime(timeStr) {
  if (!timeStr) return '';
  const str = String(timeStr).trim();

  // Handle various time formats
  // "8:15 AM" -> "08:15"
  // "1:30 PM" -> "13:30"
  // "08:15" -> "08:15"

  const time24hrMatch = str.match(/^(\d{1,2}):(\d{2})$/);
  if (time24hrMatch) {
    const [, hours, minutes] = time24hrMatch;
    return `${hours.padStart(2, '0')}:${minutes}`;
  }

  const time12hrMatch = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (time12hrMatch) {
    let [, hours, minutes, meridian] = time12hrMatch;
    hours = parseInt(hours);
    if (meridian.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (meridian.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  return str;
}

function parseDay(dayStr) {
  if (!dayStr) return 'Monday';
  const str = String(dayStr).trim().toLowerCase();

  const dayMap = {
    'mon': 'Monday',
    'monday': 'Monday',
    'tue': 'Tuesday',
    'tuesday': 'Tuesday',
    'wed': 'Wednesday',
    'wednesday': 'Wednesday',
    'thu': 'Thursday',
    'thursday': 'Thursday',
    'fri': 'Friday',
    'friday': 'Friday',
    'sat': 'Saturday',
    'saturday': 'Saturday',
    'sun': 'Sunday',
    'sunday': 'Sunday'
  };

  return dayMap[str] || 'Monday';
}

// Combine all course data
console.log('\n🔄 Combining course data from all sources...');
const allCoursesMap = new Map();

// Process Book1 data
book1Data.forEach(row => {
  const courseCode = cleanString(row['Course Code'] || row['Code']);
  const courseName = cleanString(row['Course Title'] || row['Title'] || row['Course Name']);

  if (!courseCode || !courseName) return;

  if (!allCoursesMap.has(courseCode)) {
    allCoursesMap.set(courseCode, {
      courseCode,
      courseName,
      instructors: new Set(),
      numSections: 0
    });
  }

  const course = allCoursesMap.get(courseCode);

  // Extract instructors
  const instructorField = row['Instructors'] || row['Instructor'] || row['Faculty'] || '';
  if (instructorField) {
    const instructors = String(instructorField)
      .split(/\r?\n|,|;/)
      .map(i => i.replace(/\s*\(\d+\)\s*$/, '').trim())
      .filter(i => i && i !== 'TBA');
    instructors.forEach(i => course.instructors.add(i));
  }

  // Get number of sections
  const numSections = parseInt(row['No of Sections'] || row['Sections'] || row['Number of Sections']) || 0;
  if (numSections > course.numSections) {
    course.numSections = numSections;
  }
});

// Process Book2 data (merge with Book1)
book2Data.forEach(row => {
  const courseCode = cleanString(row['Course Code'] || row['Code']);
  const courseName = cleanString(row['Course Title'] || row['Title'] || row['Course Name']);

  if (!courseCode || !courseName) return;

  if (!allCoursesMap.has(courseCode)) {
    allCoursesMap.set(courseCode, {
      courseCode,
      courseName,
      instructors: new Set(),
      numSections: 0
    });
  }

  const course = allCoursesMap.get(courseCode);

  // Extract instructors
  const instructorField = row['Instructors'] || row['Instructor'] || row['Faculty'] || '';
  if (instructorField) {
    const instructors = String(instructorField)
      .split(/\r?\n|,|;/)
      .map(i => i.replace(/\s*\(\d+\)\s*$/, '').trim())
      .filter(i => i && i !== 'TBA');
    instructors.forEach(i => course.instructors.add(i));
  }

  // Get number of sections
  const numSections = parseInt(row['No of Sections'] || row['Sections'] || row['Number of Sections']) || 0;
  if (numSections > course.numSections) {
    course.numSections = numSections;
  }
});

console.log(`   Combined ${allCoursesMap.size} unique courses`);

// Generate final course array with sections
console.log('\n🎯 Generating final course data with ACCURATE section timings...');
const coursesArray = [];

allCoursesMap.forEach((courseData, courseCode) => {
  const instructorList = Array.from(courseData.instructors);

  // Get sections from Sections.xlsx if available
  let sections = [];

  if (sectionsData.has(courseCode)) {
    // Use REAL section data from Sections.xlsx
    sections = sectionsData.get(courseCode).map(sec => ({
      sectionId: cleanString(sec.sectionId),
      day: parseDay(sec.day),
      startTime: parseTime(sec.startTime),
      endTime: parseTime(sec.endTime),
      instructor: cleanString(sec.instructor) || (instructorList[0] || 'TBA'),
      venue: cleanString(sec.venue),
      notes: cleanString(sec.notes)
    }));

    console.log(`   ✅ ${courseCode}: Using ${sections.length} real sections from Sections.xlsx`);
  } else {
    // Generate template sections if no real data available
    const numSections = Math.max(courseData.numSections, 2);
    const commonTimeSlots = [
      { day: 'Monday', startTime: '08:15', endTime: '11:30' },
      { day: 'Monday', startTime: '12:00', endTime: '15:15' },
      { day: 'Monday', startTime: '15:30', endTime: '18:45' },
      { day: 'Tuesday', startTime: '08:15', endTime: '11:30' },
      { day: 'Tuesday', startTime: '12:00', endTime: '15:15' },
      { day: 'Wednesday', startTime: '08:15', endTime: '11:30' },
    ];

    for (let i = 0; i < Math.min(numSections, 6); i++) {
      const timeSlot = commonTimeSlots[i % commonTimeSlots.length];
      const instructor = instructorList[i % instructorList.length] || 'TBA';

      sections.push({
        sectionId: `G${i + 1}`,
        day: timeSlot.day,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        instructor,
        venue: '',
        notes: 'Template timing - verify with BOSS'
      });
    }

    console.log(`   ⚠️  ${courseCode}: Generated ${sections.length} template sections (no data in Sections.xlsx)`);
  }

  coursesArray.push({
    courseCode: courseData.courseCode,
    courseName: courseData.courseName,
    sections
  });
});

// Sort courses by course code
coursesArray.sort((a, b) => a.courseCode.localeCompare(b.courseCode));

console.log(`\n✅ Successfully parsed ${coursesArray.length} courses`);
console.log(`   Total sections: ${coursesArray.reduce((sum, c) => sum + c.sections.length, 0)}`);

// Generate statistics
const coursesWithRealSections = coursesArray.filter(c =>
  !c.sections.some(s => s.notes.includes('Template timing'))
).length;

console.log(`   Courses with REAL section data: ${coursesWithRealSections}`);
console.log(`   Courses with template sections: ${coursesArray.length - coursesWithRealSections}`);

// Generate TypeScript file
console.log('\n📝 Generating TypeScript data file...');

const tsContent = `/**
 * Production-Ready SCIS Course Data (2025-2026)
 * Auto-generated from Book1.xlsx, Book2.xlsx, and Sections.xlsx
 *
 * This file contains ALL courses from both books with ACCURATE section timings
 * from Sections.xlsx. Courses without section data have template timings marked
 * with notes - students should verify and update these from BOSS.
 *
 * Generated: ${new Date().toISOString()}
 * Total Courses: ${coursesArray.length}
 * Courses with Real Section Data: ${coursesWithRealSections}
 */

import { DayOfWeek } from '@/types';

export interface PreloadedSection {
  sectionId: string;
  day: DayOfWeek;
  startTime: string; // Format: "HH:mm" (24-hour)
  endTime: string; // Format: "HH:mm" (24-hour)
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

/**
 * Statistics about the course data
 */
export const COURSE_STATS = {
  totalCourses: ${coursesArray.length},
  totalSections: ${coursesArray.reduce((sum, c) => sum + c.sections.length, 0)},
  coursesWithRealData: ${coursesWithRealSections},
  coursesWithTemplateData: ${coursesArray.length - coursesWithRealSections},
  lastUpdated: '${new Date().toISOString()}'
};

/**
 * Search courses by code or name
 */
export function searchCourses(query: string): PreloadedCourse[] {
  const q = query.toLowerCase().trim();
  if (!q) return SCIS_COURSES;

  return SCIS_COURSES.filter(course =>
    course.courseCode.toLowerCase().includes(q) ||
    course.courseName.toLowerCase().includes(q)
  );
}

/**
 * Get course by exact code
 */
export function getCourseByCode(code: string): PreloadedCourse | undefined {
  return SCIS_COURSES.find(c => c.courseCode.toLowerCase() === code.toLowerCase());
}

/**
 * Get all unique course codes
 */
export function getAllCourseCodes(): string[] {
  return SCIS_COURSES.map(c => c.courseCode);
}

/**
 * Get courses by level (100-level, 200-level, etc.)
 */
export function getCoursesByLevel(level: number): PreloadedCourse[] {
  const levelStr = level.toString();
  return SCIS_COURSES.filter(c => {
    const match = c.courseCode.match(/\\d+/);
    if (!match) return false;
    return match[0].startsWith(levelStr);
  });
}

/**
 * Get courses by prefix (e.g., "CS", "IS", "MGMT")
 */
export function getCoursesByPrefix(prefix: string): PreloadedCourse[] {
  const p = prefix.toLowerCase();
  return SCIS_COURSES.filter(c => c.courseCode.toLowerCase().startsWith(p));
}

/**
 * Check if a course has real section data (not template)
 */
export function hasRealSectionData(courseCode: string): boolean {
  const course = getCourseByCode(courseCode);
  if (!course) return false;
  return !course.sections.some(s => s.notes.includes('Template timing'));
}

/**
 * Get all instructors across all courses
 */
export function getAllInstructors(): string[] {
  const instructors = new Set<string>();
  SCIS_COURSES.forEach(course => {
    course.sections.forEach(section => {
      if (section.instructor && section.instructor !== 'TBA') {
        instructors.add(section.instructor);
      }
    });
  });
  return Array.from(instructors).sort();
}

/**
 * Search courses by instructor
 */
export function searchCoursesByInstructor(instructorName: string): PreloadedCourse[] {
  const q = instructorName.toLowerCase().trim();
  return SCIS_COURSES.filter(course =>
    course.sections.some(section =>
      section.instructor.toLowerCase().includes(q)
    )
  );
}
`;

// Write to src/data directory
const outputPath = join(__dirname, '../src/data/scis-courses.ts');
writeFileSync(outputPath, tsContent);

console.log(`✅ Generated: ${outputPath}`);
console.log('\n📋 Sample courses:');
coursesArray.slice(0, 10).forEach(course => {
  const hasReal = !course.sections.some(s => s.notes.includes('Template timing'));
  const indicator = hasReal ? '✅' : '⚠️ ';
  console.log(`   ${indicator} ${course.courseCode}: ${course.courseName} (${course.sections.length} sections)`);
});

console.log('\n🎉 All done! Course data is ready for production use.');
console.log('\n💡 Next steps:');
console.log('   1. Run: npm run dev');
console.log('   2. Browse courses in the app');
console.log('   3. Verify section timings');
console.log('   4. Report any data inconsistencies\n');
