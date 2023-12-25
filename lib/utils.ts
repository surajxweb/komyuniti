import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// generated by shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// created by chatgpt
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

// created by chatgpt
export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

// created by chatgpt
export function formatPostCount(count: number): string {
  if (count === 0) {
    return "No Posts";
  } else {
    const postCount = count.toString().padStart(2, "0");
    const postWord = count === 1 ? "Post" : "Posts";
    return `${postCount} ${postWord}`;
  }
}

export function calculateTimeAgo(timestamp: string) {
  const postTime = new Date(timestamp);
  const currentTime = new Date();

  const correctedPostTime = new Date(
    Math.min(postTime.getTime(), currentTime.getTime())
  );

  const timeDifference = Math.floor(
    (currentTime.getTime() - correctedPostTime.getTime()) / 1000
  ); // in seconds

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInMonth = 2628000;
  const secondsInYear = 31536000;

  if (timeDifference < secondsInMinute) {
    return `${timeDifference}s ago`;
  } else if (timeDifference < secondsInHour) {
    return `${Math.floor(timeDifference / secondsInMinute)}m ago`;
  } else if (timeDifference < secondsInDay) {
    return `${Math.floor(timeDifference / secondsInHour)}h ago`;
  } else if (timeDifference < secondsInWeek) {
    return `${Math.floor(timeDifference / secondsInDay)}d ago`;
  } else if (timeDifference < secondsInMonth) {
    return `${Math.floor(timeDifference / secondsInWeek)}w ago`;
  } else if (timeDifference < secondsInYear) {
    return `${Math.floor(timeDifference / secondsInMonth)}mo ago`;
  } else {
    return `${Math.floor(timeDifference / secondsInYear)}y ago`;
  }
}
