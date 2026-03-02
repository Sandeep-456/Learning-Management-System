export const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);
export const dateKey = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

export const typeToTone = (t) => {
  switch (t) {
    case "LEARNING":
      return { tone: "learn", label: "LEARNING" };
    case "PRACTICE":
      return { tone: "practice", label: "PRACTICE" };
    case "PROJECT":
      return { tone: "project", label: "PROJECT" };
    case "QUIZ":
      return { tone: "quiz", label: "QUIZ" };
    case "LIVE_CLASS":
      return { tone: "live", label: "LIVE CLASS" };
    case "LIVE_DOUBT_SESSION":
      return { tone: "live", label: "LIVE DOUBT SESSION" };
    case "PREVIOUS_DAY_RECORDING":
      return { tone: "recording", label: "RECORDING" };
    case "DOUBT_CLARIFICATION":
      return { tone: "doubt", label: "DOUBT SESSION" };
    case "HOLIDAY":
      return { tone: "holiday", label: "HOLIDAY" };
    default:
      return { tone: "neutral", label: "TASK" };
  }
};

import { catalog } from "../../data/homePageCatalog";
import weeklyData from "../../data/weeklyData.json";

export function buildSchedule({
  startDate = new Date(),
  months = 6,
  perDay = 4,
}) {
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + months);

  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const schedule = {};

  for (let i = 0; i <= totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    d.setHours(0, 0, 0, 0);

    // Calculate Week Number (0-based index)
    const weekIndex = Math.floor(i / 7);
    const currentWeekData = weeklyData[weekIndex];

    const key = dateKey(d);
    const dayItems = [];
    const dayOfWeek = d.getDay();

    switch (dayOfWeek) {
      case 0: // Sunday
        dayItems.push({
          type: "LIVE_DOUBT_SESSION",
          title: "Live Doubt Session",
          description: "Clear your doubts in this interactive session.",
          duration: "90 mins",
          zoomLink: "https://zoom.us/j/1234567890",
          // No topic/subtopic for Sunday
        });
        break;
      case 5: // Friday
      case 6: // Saturday
        const dayKey = dayOfWeek === 5 ? "friday" : "saturday";
        const dayData = currentWeekData?.[dayKey];

        if (dayData) {
          dayItems.push({
            type: "LIVE_CLASS",
            title: dayData.topic || "Live Session",
            description: dayData.subtopic || "Join the live interactive session.",
            duration: "90 mins",
            zoomLink: dayData.zoomLink || "https://zoom.us/j/1234567890",
            topic: dayData.topic,
            subtopic: dayData.subtopic,
          });
        }
        break;
      case 1: // Monday
      case 2: // Tuesday
        dayItems.push({
          type: "PRACTICE",
          title: "Lab Session",
          description: "Practice what you've learned in a hands-on environment.",
          duration: "90 mins",
          link: "/video",
        });
        break;
      case 3: // Wednesday
        dayItems.push({
          type: "PROJECT",
          title: "Project Work",
          description: "Apply your skills to a real-world project.",
          duration: "2 hours",
        });
        break;
      case 4: // Thursday
        dayItems.push({
          type: "QUIZ",
          title: "Assessment",
          description: "Test your knowledge with a short assessment.",
          duration: "1 hour",
        });
        break;
      default:
        break;
    }

    schedule[key] = dayItems;
  }

  return schedule;
}
