import { UserRole } from "@/types/User";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberToTwoDecimals(num: number): string {
  // Check if the number is an integer
  if (Number.isInteger(num)) {
    // Format the number to two decimal places
    return num.toFixed(2);
  }
  // If the number is not an integer, format it to two decimal places without trailing zeros
  return num.toFixed(2).replace(/\.?0+$/, "");
}

export function formatPhoneNumber(phoneNumber: string | number) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

export function isDev(userRole: string) {
  return userRole === UserRole.DEV;
}

export function isAdmin(userRole: string) {
  return userRole === UserRole.ADMIN;
}

export function isAdminOrUp(userRole: string) {
  return userRole === UserRole.ADMIN || userRole === UserRole.DEV;
}

export function formatTupleDate(date: any) {
  const months = [
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

  const d = new Date(date);

  const day = d.getDate();
  const month = months[d.getMonth()];

  return [day, month];
}
