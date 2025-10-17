export type IconName =
  | "user"
  | "language"
  | "starFilled"
  | "starOutline"
  | "starHalf"
  | "play"
  | "close"
  | "price"
  | "instructor"
  | "duration"
  | "lessons"
  | "level"
  | "certificate"
  | "facebook"
  | "x"
  | "linkedin"
  | "whatsapp"
  | "youtube"
  | "plus"
  | "minus"
  | "lesson"
  | "lock"
  | "check"
  | "arrowRight";

export const iconRegistry: Record<IconName | "default", string> = {
  default: "icon-61",
  user: "icon-61",
  language: "icon-62",
  starFilled: "icon-63",
  starOutline: "icon-64",
  starHalf: "icon-65",
  play: "icon-66",
  close: "icon-67",
  price: "icon-68",
  instructor: "icon-61",
  duration: "icon-69",
  lessons: "icon-70",
  level: "icon-71",
  certificate: "icon-72",
  facebook: "icon-73",
  x: "icon-74",
  linkedin: "icon-75",
  whatsapp: "icon-76",
  youtube: "icon-77",
  plus: "icon-78",
  minus: "icon-79",
  lesson: "icon-80",
  lock: "icon-81",
  check: "icon-82",
  arrowRight: "icon-83",
};

export const getIconClass = (name: IconName, fallback?: string) => {
  return iconRegistry[name] ?? fallback ?? iconRegistry.default;
};
