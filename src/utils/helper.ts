export function timeAgoFromString(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  if (diffMs <= 0) return "now";

  const sec = 1000;
  const min = 60 * sec;
  const hour = 60 * min;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < 30 * sec) return "now";
  if (diffMs < hour) return `${Math.floor(diffMs / min)}m ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`;
  if (diffMs < week) return `${Math.floor(diffMs / day)}d ago`;
  if (diffMs < month) return `${Math.floor(diffMs / week)}w ago`;
  if (diffMs < year) return `${Math.floor(diffMs / month)}mo ago`;
  return `${Math.floor(diffMs / year)}y ago`;
}
