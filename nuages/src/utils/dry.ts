import { Pharmacy, PharmacyFullState } from "../types";

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

export const getTags = (pharmacy: PharmacyFullState) => {
  const tags = [];
  if (pharmacy.active) {
    tags.push("Active");
  } else {
    tags.push("Inactive");
  }
  if (pharmacy.open) {
    tags.push("Open");
  }

  return tags;
};

export const orderBy = (by: "Name" | "Date", data: Pharmacy[]) => {
  if (by === "Name") {
    return data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  } else {
    return data.sort((a, b) => {
      return (
        new Date(a.date_created).getTime() - new Date(b.date_created).getTime()
      );
    });
  }
};

export const isValidFloatNumber = (value: string | number) => {
  if (typeof value === "number") {
    return true;
  }
  const regex = /^-?\d*(\.\d+)?$/;
  return regex.test(value);
};

// Function to check if a value is a valid latitude
export const isValidCoordinateValue = (value: string | number) => {
  return -90 <= value && value <= 90;
};

export const getSemicolonSeparatedStringFromArray = (array: string[]) => {
  return array.join(";");
};

export const getArrayFromSemicolonSeparatedString = (string: string) => {
  if (!string) {
    return [];
  }
  return string.split(";");
};

export const getArrayFromObject = (object: any) => {
  return Object.keys(object).map((key) => object[key]);
};
