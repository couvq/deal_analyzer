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
    purchasePrice: Number(urlParams.get("price")) ?? 0,
    numBeds: Number(urlParams.get("numBeds")) ?? 0,
    numBaths: Number(urlParams.get("numBaths")) ?? 0,
    squareFootage: Number(urlParams.get("squareFootage")) ?? 0,
    downPayment: 20,
    interestRate: 6, // TODO - this default could be a bit "smarter" since we know what the going interest rate is
    loanTerm: 30,
    monthlyRent: Number(urlParams.get("rentZestimate")) ?? 0,
    annualPropertyTax: 0,
    annualInsurance: 0,
    vacancyRate: 8,
    maintenanceRate: 8,
    capexRate: 8,
    utilities: 0,
    miscExpenses: 0
  };
};

/**
 * Step-by-Step Calculation
  1. Determine the Principal (P): Subtract your down payment amount from the home's purchase price to find the actual loan amount.
  2. Calculate Monthly Interest Rate (i): Divide the annual interest rate (as a decimal) by 12. (e.g., 6% annual rate becomes 0.06 / 12 = 0.005).
  3. Calculate Number of Payments (n): Multiply the loan term in years by 12. (e.g., a 30-year loan is 30 * 12 = 360 payments).
  4. Apply the Formula: Plug your P, i, and n into the mortgage formula:
      M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
      M = Your total monthly payment (Principal & Interest). 
 */
export const calculateMonthlyMortgagePayment = (
  downPaymentPercentage: number,
  purchasePrice: number,
  interestRatePercent: number,
  loanTermInYears: number
): number => {
  const downPayment = downPaymentPercentage * purchasePrice;
  const principal = purchasePrice - downPayment;
  const monthlyInterestRate = interestRatePercent / 12;
  const numberOfPayments = loanTermInYears * 12;

  // Check for edge case where interest rate is 0 to prevent division by zero
  if (interestRatePercent === 0) {
    return principal / numberOfPayments;
  }

  // Calculate the common term (1 + i)^n
  const powerTerm = Math.pow(1 + monthlyInterestRate, numberOfPayments);

  // Calculate the numerator: i * (1 + i)^n
  const numerator = monthlyInterestRate * powerTerm;

  // Calculate the denominator: (1 + i)^n - 1
  const denominator = powerTerm - 1;

  // Calculate the final result: P * (numerator / denominator)
  const monthlyPayment = principal * (numerator / denominator);

  // round to two decimal places
  return Math.round(monthlyPayment * 100) / 100;
};
