import type { FormValues } from "@/types/shared";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDefaultValuesFromUrl = (): FormValues => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    address: urlParams.get("address") ?? "",
    numBeds: Number(urlParams.get("numBeds")) ?? 0,
    numBaths: Number(urlParams.get("numBaths")) ?? 0,
    squareFootage: Number(urlParams.get("squareFootage")) ?? 0,
  };
};
