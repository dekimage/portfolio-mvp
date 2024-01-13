export function getRelativeTime(timestamp) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);
  const timeDifference = currentDate - inputDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

export function getDateTime(timestamp) {
  const date = new Date(timestamp);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate().toString();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export function getDateTimeDay(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return formattedDate;
}

export function formatSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function formatSecondsToHumanReadable(seconds) {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = `${hours} hour${hours !== 1 ? "s" : ""}`;
    const formattedMinutes = `${remainingMinutes} minute${
      remainingMinutes !== 1 ? "s" : ""
    }`;
    const formattedSeconds = `${remainingSeconds} second${
      remainingSeconds !== 1 ? "s" : ""
    }`;

    const timeParts = [];
    if (hours > 0) {
      timeParts.push(formattedHours);
    }
    if (remainingMinutes > 0) {
      timeParts.push(formattedMinutes);
    }
    if (remainingSeconds > 0) {
      timeParts.push(formattedSeconds);
    }

    return timeParts.join(" ");
  }
}

export function formatTimeRange(startMs, endMs) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const startTime = formatTime(startMs);
  const endTime = formatTime(endMs);

  return `${startTime} - ${endTime}`;
}
