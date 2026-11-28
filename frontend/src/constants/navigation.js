import {
  House,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardCheck,
  Settings
} from "lucide-react";

export const navigation = [
  {
    label: "Today",
    path: "/",
    icon: House
  },
  {
    label: "History",
    path: "/history",
    icon: CalendarDays
  },
  {
    label: "Progress",
    path: "/progress",
    icon: ChartNoAxesCombined
  },
  {
    label: "Check-in",
    path: "/weekly-checkin",
    icon: ClipboardCheck
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings
  }
];