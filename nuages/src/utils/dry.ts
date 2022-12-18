export const asyncFetchDataFromBackend = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTimeElapsed = (dateString: string) => {
  // Get the current time
  const currentTime = new Date();
  const date = new Date(dateString);

  // Calculate the time elapsed in milliseconds
  const elapsedTime = currentTime.getTime() - date.getTime();

  // Convert the elapsed time to minutes
  const elapsedTimeInMinutes = Math.floor(elapsedTime / (1000 * 60));

  // If the elapsed time is less than 1 minute, return 'just now'
  if (elapsedTimeInMinutes === 0) {
    return "just now";
  }

  // If the elapsed time is less than 60 minutes (1 hour), return the elapsed time in minutes
  if (elapsedTimeInMinutes < 60) {
    return `${elapsedTimeInMinutes} min ago`;
  }

  // Convert the elapsed time to hours
  const elapsedTimeInHours = Math.floor(elapsedTimeInMinutes / 60);

  // If the elapsed time is less than 24 hours (1 day), return the elapsed time in hours
  if (elapsedTimeInHours < 24) {
    return `${elapsedTimeInHours} hour ago`;
  }

  // Convert the elapsed time to days
  const elapsedTimeInDays = Math.floor(elapsedTimeInHours / 24);

  // If the elapsed time is less than 30 days (1 month), return the elapsed time in days
  if (elapsedTimeInDays < 30) {
    return `${elapsedTimeInDays} days ago`;
  }

  // Convert the elapsed time to months
  const elapsedTimeInMonths = Math.floor(elapsedTimeInDays / 30);

  // If the elapsed time is less than 12 months (1 year), return the elapsed time in months
  if (elapsedTimeInMonths < 12) {
    return `${elapsedTimeInMonths} month ago`;
  }

  // Otherwise, return the elapsed time in years
  const elapsedTimeInYears = Math.floor(elapsedTimeInMonths / 12);
  return `${elapsedTimeInYears} year ago`;
};
