export enum PROJECT_STATUS {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export const STATUS_MAP: Record<PROJECT_STATUS, string> = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN PROGRESS",
  COMPLETED: "COMPLETED",
};

export const STATUS_COLOR_MAP: Record<PROJECT_STATUS, string> = {
  OPEN: "#fe5757",
  IN_PROGRESS: "#fbb040",
  COMPLETED: "#00b761",
};
