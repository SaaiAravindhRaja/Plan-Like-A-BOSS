/**
 * Production-Ready SCIS Course Data (2025-2026)
 * Auto-generated from Book1.xlsx, Book2.xlsx, and Sections.xlsx
 *
 * This file contains ALL courses from both books with ACCURATE section timings
 * from Sections.xlsx. Courses without section data have template timings marked
 * with notes - students should verify and update these from BOSS.
 *
 * Generated: 2025-10-24T09:01:56.779Z
 * Total Courses: 90
 * Courses with Real Section Data: 60
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

export const SCIS_COURSES: PreloadedCourse[] = [
  {
    "courseCode": "COR-IS1704",
    "courseName": "Comp Thinking & Programming",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "ARNE JONNI SUPPE",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "ARNE JONNI SUPPE",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "HE SHENGFENG",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "HE SHENGFENG",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "COR1305",
    "courseName": "Modeling & Data Analytics",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "ZHOU KANKAN",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "ALDY GUNAWAN",
        "venue": "SCIS1 Seminar Room 3-4",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "JASON CHAN",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "JASON CHAN",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "JASON CHAN",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      },
      {
        "sectionId": "SG6",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "ALDY GUNAWAN",
        "venue": "SCIS1 Seminar Room 3-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS101",
    "courseName": "Programming Fundamentals I",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LEE Yeow Leong",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Jason CHAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LEE Yeow Leong",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Jason CHAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS102",
    "courseName": "Programming Fundamentals II",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LEE YEOW LEONG",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LEE YEOW LEONG",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LEE YEOW LEONG",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LEE YEOW LEONG",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS103",
    "courseName": "Linear Algebra 4 Cmpting App",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Manoj THULASIDAS",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Manoj THULASIDAS",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "Manoj THULASIDAS",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Manoj THULASIDAS",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS104",
    "courseName": "Math Foundations of Computing",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Djordje ZIKELIC",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LI Yuchen",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "Djordje ZIKELIC",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LI Yuchen",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS105",
    "courseName": "Stat Thinking for Data Science",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "FANG YUAN",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Thursday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "FANG YUAN",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "FANG YUAN",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "CAO ZHIGUANG",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "CAO ZHIGUANG",
        "venue": "SOE/SCIS2 Seminar Room 2-5",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS106",
    "courseName": "Computer Architecture",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "JASON CHAN",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "JASON CHAN",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "JASON CHAN",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "TANG, TONY",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS201",
    "courseName": "Data Structures and Algorithms",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Hady W. LAUW",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "HUO Yintong",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "Hady W. LAUW",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "HUO Yintong",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS202",
    "courseName": "Design & Analysis of Algorithm",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "PRADEEP REDDY VARAKANTHAM",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "PRADEEP REDDY VARAKANTHAM",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "WANG XINRUN",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "WANG XINRUN",
        "venue": "SCIS1 Seminar Room 3-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS203",
    "courseName": "Collaborative Software Devmt",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "CHRISTOPH TREUDE",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "CHRISTOPH TREUDE",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS204",
    "courseName": "Computer Networks",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "PIUS LEE",
        "venue": "SCIS1 Classroom B1-1",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "PIUS LEE",
        "venue": "SCIS1 Classroom B1-1",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "SWAVEK WLODKOWSKI",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "SWAVEK WLODKOWSKI",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS205",
    "courseName": "Operating Systems",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "NGO Chong Wah",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LOW Siow Meng",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "NGO Chong Wah",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LOW Siow Meng",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS206",
    "courseName": "Software Product Management",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "BENJAMIN GAN",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "SIAU KENG LENG",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Wednesday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "SIAU KENG LENG",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "SIAU KENG LENG",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS301",
    "courseName": "IT Solution Architecture",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "OUH ENG LIEH",
        "venue": "SOE/SCIS2 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "OUH ENG LIEH",
        "venue": "SOE/SCIS2 Seminar Room B1-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS302",
    "courseName": "IT Solution Lifecycle Mgmt",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Chris POSKITT",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Swetha GOTTIPATI",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "Chris POSKITT",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS420",
    "courseName": "Introduction to AI",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LI ZHIZE",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LI ZHIZE",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS421",
    "courseName": "Principles of Machine Learning",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "GUANSONG PANG",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS422",
    "courseName": "Reason'g, Plann'g, Learn'g",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Pradeep Reddy VARAKANTHAM",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Pradeep Reddy VARAKANTHAM",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS423",
    "courseName": "Heuristic Search & Optimisatio",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Djordje ZIKELIC",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Djordje ZIKELIC",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS424",
    "courseName": "Generative AI for Vision",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "ZHOU PAN",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "ZHOU PAN",
        "venue": "SCIS1 Seminar Room 3-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS425",
    "courseName": "Gen AI for Natural Lang Comm",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Wei GAO",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Wei GAO",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS427",
    "courseName": "AI Safety",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "SUN JUN",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS440",
    "courseName": "Foundations of Cybersecurity",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "GUANSONG PANG",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "GUANSONG PANG",
        "venue": "SOE/SCIS2 Seminar Room 2-10",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "HAIYANG XUE",
        "venue": "SOE/SCIS2 Seminar Room 2-5",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "HAIYANG XUE",
        "venue": "SOE/SCIS2 Seminar Room 2-5",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS441",
    "courseName": "Network Security",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "DING XUHUA",
        "venue": "SCIS1 Seminar Room 3-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS442",
    "courseName": "Data Security and Privacy",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "YANG Guomin",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "YANG Guomin",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS443",
    "courseName": "Software and Systems Security",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "DUAN YUE",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "DUAN YUE",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS444",
    "courseName": "Strategic Cybersecurity Mgmt",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Friday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "KE PING FAN",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS445",
    "courseName": "Cyber Threat Intelligence",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LIM YI HAO",
        "venue": "SOE/SCIS2 Seminar Room 3-6",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS446",
    "courseName": "Offensive Cybersecurity",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "SIM CHER BOON",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS460",
    "courseName": "Foundations of Cyber-Phy Sys",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Aarthi KANNALAGAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Aarthi KANNALAGAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS461",
    "courseName": "Mobile & Pervasive Comp & App",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "PIUS LEE",
        "venue": "SCIS1 Classroom B1-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS462",
    "courseName": "IoT: Tech & Appln",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "PIUS LEE",
        "venue": "SCIS1 Classroom B1-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS463",
    "courseName": "Computer Graphics and VR",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "HE SHENGFENG",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS464",
    "courseName": "Full Stack Development",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "LIM YI SHENG",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS465",
    "courseName": "Advanced Database Systems",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LI Yuchen",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LI Yuchen",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "CS466",
    "courseName": "Developing Web3 Applications",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "ZHU FEIDA",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS480",
    "courseName": "CS Project Experience",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "DING XUHUA",
        "venue": "",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "SIS INSTRUCTOR 8",
        "venue": "",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "VINCENT OH YAN MING",
        "venue": "",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "CS490",
    "courseName": "Computer Science WSE",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "CHUA HONG NGOH",
        "venue": "",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS105",
    "courseName": "Business Data Management",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "FIONA LEE",
        "venue": "YPHSL Seminar Room 3-12",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "OKKAR KYAW",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS112",
    "courseName": "Data Management",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "ZHENG BAIHUA",
        "venue": "YPHSL Seminar Room 2-01",
        "notes": ""
      },
      {
        "sectionId": "G10",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "MA YUNSHAN",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G11",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "MA YUNSHAN",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G12",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "SERENA GOH",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G13",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "KOH KWAN CHIN",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G14",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "KOH KWAN CHIN",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G15",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "SERENA GOH",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LIM EE PENG",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Friday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LIM EE PENG",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "SIS INSTRUCTOR 2",
        "venue": "SOE/SCIS2 Seminar Room 2-5",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "ZHENG BAIHUA",
        "venue": "SOE/SCIS2 Seminar Room 5-2",
        "notes": ""
      },
      {
        "sectionId": "G6",
        "day": "Thursday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "LOW SIOW MENG",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G7",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "SWETHA GOTTIPATI",
        "venue": "SOE/SCIS2 Seminar Room B1-2",
        "notes": ""
      },
      {
        "sectionId": "G8",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "SWETHA GOTTIPATI",
        "venue": "SOE/SCIS2 Seminar Room B1-2",
        "notes": ""
      },
      {
        "sectionId": "G9",
        "day": "Thursday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "SWETHA GOTTIPATI",
        "venue": "YPHSL Seminar Room 2-15",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS113",
    "courseName": "Web Application Development I",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LAU YI MENG",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G10",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "NICHOLAS TAN CHEE HIANG",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G11",
        "day": "Friday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "MANOJ THULASIDAS",
        "venue": "SOE/SCIS2 Seminar Room 2-10",
        "notes": ""
      },
      {
        "sectionId": "G12",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "KOH KWAN CHIN",
        "venue": "SOE/SCIS2 Seminar Room 2-5",
        "notes": ""
      },
      {
        "sectionId": "G13",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "KOH KWAN CHIN",
        "venue": "SOE/SCIS2 Seminar Room 2-5",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Thursday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "KYONG JIN SHIM",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "KYONG JIN SHIM",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "SHAR LWIN KHIN",
        "venue": "YPHSL Seminar Room 3-02",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "SHAR LWIN KHIN",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G6",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LI JIANNAN",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G7",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LI JIANNAN",
        "venue": "SOE/SCIS2 Seminar Room 2-10",
        "notes": ""
      },
      {
        "sectionId": "G8",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "NICHOLAS TAN CHEE HIANG",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G9",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "NICHOLAS TAN CHEE HIANG",
        "venue": "SOE/SCIS2 Seminar Room 2-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS114",
    "courseName": "Computing Fundamentals",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "XU Yixin",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Pius LEE",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "Swavek WLODKOWSKI",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "XU Yixin",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G5",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Pius LEE",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G6",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Swavek WLODKOWSKI",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS115",
    "courseName": "Algorithms & Programming",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "MAI ANH TIEN",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Tuesday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "MAI ANH TIEN",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "MAI ANH TIEN",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Wednesday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "MAI ANH TIEN",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "MOK, HENG NGEE",
        "venue": "SOE/SCIS2 Seminar Room 5-2",
        "notes": ""
      },
      {
        "sectionId": "G6",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "MOK, HENG NGEE",
        "venue": "SOE/SCIS2 Seminar Room 5-2",
        "notes": ""
      },
      {
        "sectionId": "G7",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "ZHANG ZHIYUAN",
        "venue": "SOE/SCIS2 Seminar Room 2-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS210",
    "courseName": "Biz Proc. Analysis & Soltning",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Swapna GOTTIPATI",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "TAN Chee Hiang Nicholas",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LAU Yi Meng",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Rafael J. BARROS",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G5",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "KE Ping Fan",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G6",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Swapna GOTTIPATI",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS211",
    "courseName": "Interaction Design Prototyping",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Benjamin GAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "HARA",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "Kotaro",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LEE",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G5",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Min",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G6",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "OUH Eng Lieh",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS212",
    "courseName": "Software Project Management",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Chris POSKITT",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "TAN Chee Hiang Nicholas",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LAU Yi Meng",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "UG Instructor - Joseph SUNG",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G5",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Gabriel LOK",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G6",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Chris POSKITT",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS213",
    "courseName": "Enterprise Solution Developmt",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "JIANG LINGXIAO",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G10",
        "day": "Thursday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "FWA HUA LEONG",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G11",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "FWA HUA LEONG",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "JIANG LINGXIAO",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "JIANG LINGXIAO",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "ALAN MEGARGEL",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "ALAN MEGARGEL",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G6",
        "day": "Friday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "SWETHA GOTTIPATI",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G7",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "SWETHA GOTTIPATI",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G8",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "XIE XIAOFEI",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      },
      {
        "sectionId": "G9",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "XIE XIAOFEI",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS214",
    "courseName": "Enterprise Solution Management",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "RAFAEL J. BARROS",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G10",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "CHENG SHIH-FEN",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      },
      {
        "sectionId": "G11",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "AARTHI KANNALAGAN",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "RAFAEL J. BARROS",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "PAUL ROBERT GRIFFIN",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "PAUL ROBERT GRIFFIN",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "PAUL ROBERT GRIFFIN",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G6",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "KIRUTHIKA RAMANATHAN",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G7",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "KIRUTHIKA RAMANATHAN",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G8",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "KIRUTHIKA RAMANATHAN",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G9",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "CHENG SHIH-FEN",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS215",
    "courseName": "Digital Business",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LO SIAW LING",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G10",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "ARNE JONNI SUPPE",
        "venue": "SOE/SCIS2 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G11",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "ARNE JONNI SUPPE",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LO SIAW LING",
        "venue": "SOE/SCIS2 Seminar Room 2-10",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LO SIAW LING",
        "venue": "SOE/SCIS2 Seminar Room 2-10",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "NAH, FIONA FUI-HOON",
        "venue": "SOE/SCIS2 Seminar Room B1-2",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "NAH, FIONA FUI-HOON",
        "venue": "SCIS1 Seminar Room B1-1",
        "notes": ""
      },
      {
        "sectionId": "G6",
        "day": "Friday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "NAH, FIONA FUI-HOON",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G7",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "NAH, FIONA FUI-HOON",
        "venue": "SCIS1 Seminar Room 2-4",
        "notes": ""
      },
      {
        "sectionId": "G8",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LAU YI MENG",
        "venue": "SOE/SCIS2 Seminar Room 2-10",
        "notes": ""
      },
      {
        "sectionId": "G9",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LAU YI MENG",
        "venue": "SOE/SCIS2 Seminar Room 2-10",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS216",
    "courseName": "Web Application Development II",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Kyong Jin SHIM",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "SHAR Lwin Khin",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "MOK",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G4",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Heng Ngee",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G5",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "UG Instructor - Jason CHUI",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G6",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "FWA Hua Leong",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS217",
    "courseName": "Analytics Foundation",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "TAN KAR WAY",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Thursday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "TAN PANG JIN",
        "venue": "SOE/SCIS2 Seminar Room 3-8",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "SERENA GOH",
        "venue": "SOE/SCIS2 Seminar Room 3-8",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS404",
    "courseName": "Tech Ent Study Mission (Asia)",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "BENJAMIN GAN",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS405",
    "courseName": "TESM (Non-Asia)",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Benjamin GAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Benjamin GAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS412",
    "courseName": "Enterprise Business Solutions",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "SIS INSTRUCTOR 3",
        "venue": "SMUC Active Learning CR 3-2",
        "notes": ""
      },
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "RAFAEL J. BARROS",
        "venue": "SMUC Active Learning CR 3-2",
        "notes": ""
      },
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "LEONARD TAN",
        "venue": "SMUC Active Learning CR 3-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS419",
    "courseName": "Retail Banking & Mobile Tech",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "PATRICK THNG",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS423",
    "courseName": "Financial Mkts Proc & Tech",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Randall E. DURAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Randall E. DURAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS424",
    "courseName": "Data Mining and Bus. Anal.",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "WANG ZHAOXIA",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS428",
    "courseName": "Visual Analytics for Bus. Int.",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LIAO LIZI",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "KAM TIN SEONG",
        "venue": "SCIS1 Classroom B1-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS430",
    "courseName": "Digital Payments & Innovation",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "LAU YI MENG",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS434",
    "courseName": "Social Analytics and Applns",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Wei GAO",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Wei GAO",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS442",
    "courseName": "Object Oriented Programming",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "ZHANG ZHIYUAN",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "ZHANG ZHIYUAN",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Tuesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "ZHANG ZHIYUAN",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS444",
    "courseName": "Digital Bankg Enterprise Archi",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "ALAN MEGARGEL",
        "venue": "SOE/SCIS2 Seminar Room B1-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS445",
    "courseName": "Corporate Banking Technology",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Ramaprasad RAMAKRISHNAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Ramaprasad RAMAKRISHNAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS446",
    "courseName": "Mging Cust Rlns w ANLY",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "RAFAEL J. BARROS",
        "venue": "SCIS1 Seminar Room 2-1",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Friday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LEONARD TAN",
        "venue": "SOE/SCIS2 Seminar Room 3-6",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "ALAN HO",
        "venue": "SOE/SCIS2 Seminar Room 3-6",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS447",
    "courseName": "Smart Healthcare in Asia",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "SEAN LAM",
        "venue": "SMUC Active Learning CR 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS450",
    "courseName": "Text Mining & Lang Processing",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "SWAPNA GOTTIPATI",
        "venue": "SCIS1 Seminar Room 3-4",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "SWAPNA GOTTIPATI",
        "venue": "SCIS1 Seminar Room 3-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS452",
    "courseName": "Blockchain Appl in Fin Svcs",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Paul Robert GRIFFIN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Paul Robert GRIFFIN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS453",
    "courseName": "Financial Analytics",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Thursday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "RANDALL E. DURAN",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Thursday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "SIS INSTRUCTOR 4",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS455",
    "courseName": "OPE: Data Analytics in Asia",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "FWA HUA LEONG",
        "venue": "SCIS1 Seminar Room 2-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS458",
    "courseName": "Cloud Mgmt & Engineering",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "SIM CHER BOON",
        "venue": "SCIS1 Seminar Room 3-2",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS459",
    "courseName": "Big Data Architecture",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "SACHIN GUPTA",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "SIS INSTRUCTOR 5",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS460",
    "courseName": "Machine Learning & Applns",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "WANG ZHAOXIA",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS462",
    "courseName": "Virtual Reality for Business",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "KYONG JIN SHIM",
        "venue": "SCIS1 Seminar Room 3-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS463",
    "courseName": "Digi Tech 4 Env Sustainability",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Kiruthika RAMANATHAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Kiruthika RAMANATHAN",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS464",
    "courseName": "Data Analytics & Tech GEC",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LO SIAW LING",
        "venue": "SOE/SCIS2 Seminar Room 3-4",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS465",
    "courseName": "Quantum Compg in Fin Svcs",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Friday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "PAUL ROBERT GRIFFIN",
        "venue": "SCIS1 Seminar Room 2-3",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS466",
    "courseName": "Dig Ethics 4 Resp. Cmpting",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LIM HOW KHANG",
        "venue": "YPHSL Seminar Room 3-09",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS467",
    "courseName": "Low Code Solution Development",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Wednesday",
        "startTime": "15:30",
        "endTime": "18:45",
        "instructor": "ALAN MEGARGEL",
        "venue": "SOE/SCIS2 Seminar Room B1-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS468",
    "courseName": "Sustainable Digital Cities",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "KAN Siew Ning",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "KAN Siew Ning",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS469",
    "courseName": "Gen AI with LLMS",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Tuesday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "WYNTER LAURA",
        "venue": "SOE/SCIS2 Seminar Room 5-2",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Friday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "WYNTER LAURA",
        "venue": "SOE/SCIS2 Seminar Room B1-1",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS483",
    "courseName": "IS/SMT/C&L Proj Exp (Applns)",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "HOE SIU LOON",
        "venue": "",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "ANTOINE LEDENT",
        "venue": "",
        "notes": ""
      },
      {
        "sectionId": "G3",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "NYAN TUN ZAW",
        "venue": "",
        "notes": ""
      },
      {
        "sectionId": "G4",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "CHOI MING HANG",
        "venue": "",
        "notes": ""
      },
      {
        "sectionId": "G5",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "WANG ZHAOXIA",
        "venue": "",
        "notes": ""
      },
      {
        "sectionId": "G6",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "BENJAMIN GAN",
        "venue": "",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS484",
    "courseName": "IS Project Experience-FinTech",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "SIS INSTRUCTOR 7",
        "venue": "",
        "notes": ""
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "",
        "endTime": "",
        "instructor": "SIS INSTRUCTOR 7",
        "venue": "",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "IS491",
    "courseName": "Analytics & Cloud Tech WSE",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "LO Siaw Ling",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "LO Siaw Ling",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "IS492",
    "courseName": "Cloud Solution Development WSE",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "UG Instructor - CHUA Hong Ngoh",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "UG Instructor - CHUA Hong Ngoh",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "SE101",
    "courseName": "Operating Syst & Networking",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "Swavek WLODKOWSKI",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Swavek WLODKOWSKI",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "SE301",
    "courseName": "Advanced Prog & Design",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "MOK",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "Heng Ngee",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "SE401",
    "courseName": "SE Apprenticeship",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "UG Instructor - Winnie LOH",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "UG Instructor - Winnie LOH",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  },
  {
    "courseCode": "SMT202",
    "courseName": "Anly Applns for Smart Living",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "19:00",
        "endTime": "22:15",
        "instructor": "SACHIN GUPTA",
        "venue": "SCIS1 Seminar Room 3-3",
        "notes": ""
      }
    ]
  },
  {
    "courseCode": "SMT481",
    "courseName": "Smart-City Ops Research",
    "sections": [
      {
        "sectionId": "G1",
        "day": "Monday",
        "startTime": "08:15",
        "endTime": "11:30",
        "instructor": "WANG Hai",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      },
      {
        "sectionId": "G2",
        "day": "Monday",
        "startTime": "12:00",
        "endTime": "15:15",
        "instructor": "WANG Hai",
        "venue": "",
        "notes": "Template timing - verify with BOSS"
      }
    ]
  }
];

/**
 * Statistics about the course data
 */
export const COURSE_STATS = {
  totalCourses: 90,
  totalSections: 270,
  coursesWithRealData: 60,
  coursesWithTemplateData: 30,
  lastUpdated: '2025-10-24T09:01:56.779Z'
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
    const match = c.courseCode.match(/\d+/);
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
