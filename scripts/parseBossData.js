/**
 * Script to parse BOSS bidding data and generate TypeScript file
 */

import XLSX from 'xlsx';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('📊 Parsing BOSS Bidding Data...\n');

// Read both term files
const t1File = readFileSync(join(__dirname, '../data/boss-bidding/2024-25_T1.xlsx'));
const t2File = readFileSync(join(__dirname, '../data/boss-bidding/2024-25_T2.xlsx'));

const t1Workbook = XLSX.read(t1File, { type: 'buffer' });
const t2Workbook = XLSX.read(t2File, { type: 'buffer' });

const t1Sheet = t1Workbook.Sheets[t1Workbook.SheetNames[0]];
const t2Sheet = t2Workbook.Sheets[t2Workbook.SheetNames[0]];

const t1Data = XLSX.utils.sheet_to_json(t1Sheet);
const t2Data = XLSX.utils.sheet_to_json(t2Sheet);

console.log(`Term 1 data: ${t1Data.length} rows`);
console.log(`Term 2 data: ${t2Data.length} rows\n`);

// Organize data by course code and section
const bossData = {};

function processRow(row, term) {
  const courseCode = row['Course Code'];
  const section = row['Section'];
  const description = row['Description'];
  const instructor = row['Instructor']?.trim() || 'TBA';

  if (!courseCode || !section) return;

  // Initialize course if not exists
  if (!bossData[courseCode]) {
    bossData[courseCode] = {
      courseCode,
      courseName: description,
      sections: {}
    };
  }

  // Initialize section if not exists
  if (!bossData[courseCode].sections[section]) {
    bossData[courseCode].sections[section] = {
      sectionId: section,
      instructor,
      biddingHistory: []
    };
  }

  // Add bidding record
  bossData[courseCode].sections[section].biddingHistory.push({
    term,
    biddingWindow: row['Bidding Window'],
    vacancy: row['Vacancy'] || 0,
    openingVacancy: row['Opening Vacancy'] || 0,
    enrolledStudents: row['Enrolled Students'] || 0,
    medianBid: row['Median Bid'] || 0,
    minBid: row['Min Bid'] || 0,
    school: row['School/Department']
  });
}

// Process all rows
t1Data.forEach(row => processRow(row, '2024-25 Term 1'));
t2Data.forEach(row => processRow(row, '2024-25 Term 2'));

// Convert to array format
const coursesArray = Object.values(bossData).map(course => ({
  ...course,
  sections: Object.values(course.sections)
}));

console.log(`✅ Processed ${coursesArray.length} courses`);
console.log(`   Total sections: ${coursesArray.reduce((sum, c) => sum + c.sections.length, 0)}\n`);

// Generate TypeScript file
const tsContent = `/**
 * BOSS Bidding Historical Data (2024-25)
 * Auto-generated from SMU BOSS bidding system data
 *
 * This data contains historical bidding information for courses,
 * helping students make informed decisions about their bids.
 */

export interface BiddingRecord {
  term: string;
  biddingWindow: string;
  vacancy: number;
  openingVacancy: number;
  enrolledStudents: number;
  medianBid: number;
  minBid: number;
  school: string;
}

export interface BossSection {
  sectionId: string;
  instructor: string;
  biddingHistory: BiddingRecord[];
}

export interface BossCourse {
  courseCode: string;
  courseName: string;
  sections: BossSection[];
}

export const BOSS_DATA: BossCourse[] = ${JSON.stringify(coursesArray, null, 2)};

// Helper to get course bidding data
export function getCourseData(courseCode: string): BossCourse | undefined {
  return BOSS_DATA.find(c => c.courseCode === courseCode);
}

// Helper to get section bidding data
export function getSectionData(courseCode: string, sectionId: string): BossSection | undefined {
  const course = getCourseData(courseCode);
  return course?.sections.find(s => s.sectionId === sectionId);
}

// Helper to get latest bidding stats for a section
export function getLatestBiddingStats(courseCode: string, sectionId: string): BiddingRecord | undefined {
  const section = getSectionData(courseCode, sectionId);
  if (!section || section.biddingHistory.length === 0) return undefined;
  // Return most recent record (last in array)
  return section.biddingHistory[section.biddingHistory.length - 1];
}

// Helper to calculate average median bid for a section
export function getAverageMedianBid(courseCode: string, sectionId: string): number {
  const section = getSectionData(courseCode, sectionId);
  if (!section || section.biddingHistory.length === 0) return 0;

  const sum = section.biddingHistory.reduce((acc, record) => acc + record.medianBid, 0);
  return Math.round(sum / section.biddingHistory.length);
}

// Helper to search courses
export function searchBossCourses(query: string): BossCourse[] {
  const q = query.toLowerCase().trim();
  if (!q) return BOSS_DATA;

  return BOSS_DATA.filter(course =>
    course.courseCode.toLowerCase().includes(q) ||
    course.courseName.toLowerCase().includes(q)
  );
}

// Get all unique course codes
export function getAllBossCourses(): string[] {
  return BOSS_DATA.map(c => c.courseCode);
}
`;

// Write to src/data directory
const outputPath = join(__dirname, '../src/data/boss-data.ts');
writeFileSync(outputPath, tsContent);

console.log(`🎉 Generated: ${outputPath}\n`);
console.log('📋 Sample courses with bidding data:');
coursesArray.slice(0, 5).forEach(course => {
  console.log(`   - ${course.courseCode}: ${course.courseName.substring(0, 50)}...`);
  console.log(`     Sections: ${course.sections.length}, Total records: ${course.sections.reduce((sum, s) => sum + s.biddingHistory.length, 0)}`);
});
