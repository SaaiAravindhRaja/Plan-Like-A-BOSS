/**
 * Color Utility Functions
 * Generates beautiful, consistent colors for courses
 */

/**
 * Predefined color palette for courses
 * These colors are carefully selected to be visually distinct and appealing
 */
export const COURSE_COLORS = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red (not SMU red)
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#A855F7', // Violet
  '#22C55E', // Light Green
];

/**
 * Generates a color for a course based on its index
 * @param index - The index of the course
 * @returns Hex color string
 */
export function getCourseColor(index: number): string {
  return COURSE_COLORS[index % COURSE_COLORS.length];
}

/**
 * Generates a hash from a string (used for consistent color assignment)
 * @param str - Input string
 * @returns Hash number
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Generates a consistent color for a course code
 * @param courseCode - The course code (e.g., "CS202")
 * @returns Hex color string
 */
export function getColorForCourseCode(courseCode: string): string {
  const hash = hashString(courseCode);
  return COURSE_COLORS[hash % COURSE_COLORS.length];
}

/**
 * Converts hex color to RGB values
 * @param hex - Hex color string (e.g., "#3B82F6")
 * @returns Object with r, g, b values (0-255)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Generates a lighter version of a color (for hover effects)
 * @param hex - Hex color string
 * @param percent - Percentage to lighten (0-100)
 * @returns Lightened hex color string
 */
export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const amount = Math.round(2.55 * percent);
  const r = Math.min(255, rgb.r + amount);
  const g = Math.min(255, rgb.g + amount);
  const b = Math.min(255, rgb.b + amount);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Generates a darker version of a color
 * @param hex - Hex color string
 * @param percent - Percentage to darken (0-100)
 * @returns Darkened hex color string
 */
export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const amount = Math.round(2.55 * percent);
  const r = Math.max(0, rgb.r - amount);
  const g = Math.max(0, rgb.g - amount);
  const b = Math.max(0, rgb.b - amount);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Determines if a color is light or dark
 * @param hex - Hex color string
 * @returns 'light' or 'dark'
 */
export function getColorBrightness(hex: string): 'light' | 'dark' {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'dark';

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? 'light' : 'dark';
}
