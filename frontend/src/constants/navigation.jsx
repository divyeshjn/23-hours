import {
  House,
  CalendarDays,
  ChartNoAxesCombined,
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
    label: "Settings",
    path: "/settings",
    icon: Settings
  }
];
