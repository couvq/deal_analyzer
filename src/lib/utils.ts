import type { FormValues } from "@/types/shared";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Reads property listing info from url and returns them as form values 
 * with sensible defaults if no value is present.
 */
export const getDefaultValuesFromUrl = (): FormValues => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    address: urlParams.get("address") ?? "",
    purchasePrice: Number(urlParams.get('price')) ?? 0,
    numBeds: Number(urlParams.get("numBeds")) ?? 0,
    numBaths: Number(urlParams.get("numBaths")) ?? 0,
    squareFootage: Number(urlParams.get("squareFootage")) ?? 0,
  };
};
