import {
  calculateMonthlyMortgagePayment,
  roundTwoDecimalPlaces,
} from "@/lib/utils";
import type { FormValues } from "@/types/shared";
import { useWatch, type Control } from "react-hook-form";

export const useMonthlyMortgagePayment = (
  control: Control<FormValues, any, FormValues>
): number => {
  const purchasePrice = useWatch({
    name: "purchasePrice",
    control,
  });
  const downPaymentPercentage =
    0.01 *
    useWatch({
      name: "downPayment",
      control,
    });
  const interestRatePercent =
    0.01 *
    useWatch({
      name: "interestRate",
      control,
    });
  const loanTermInYears = useWatch({
    name: "loanTerm",
    control,
  });

  const monthlyPayment = calculateMonthlyMortgagePayment(
    downPaymentPercentage,
    purchasePrice,
    interestRatePercent,
    loanTermInYears
  );
  return monthlyPayment;
};

export interface UseAnalyticsResponse {
  monthlyCashFlow: number;
  cocReturn: number;
}

export const useAnalytics = (
  control: Control<FormValues, any, FormValues>
): UseAnalyticsResponse => {
  const monthlyRent = useWatch({
    name: "monthlyRent",
    control,
  });
  const monthlyIncome = monthlyRent;

  const monthlyMortgagePayment = useMonthlyMortgagePayment(control);
  const purchasePrice = useWatch({
    name: "purchasePrice",
    control,
  });
  const downPaymentPercentage =
    useWatch({
      name: "downPayment",
      control,
    }) * 0.01;
  const totalCashInvested = downPaymentPercentage * purchasePrice; // todo - there are usually other costs like renovation costs, closing costs, etc.
  const monthlyPropertyTax =
    useWatch({
      name: "annualPropertyTax",
      control,
    }) / 12;
  const monthlyInsurance =
    useWatch({
      name: "annualInsurance",
      control,
    }) / 12;
  const monthlyVacancy =
    useWatch({
      name: "vacancyRate",
      control,
    }) *
    0.01 *
    monthlyRent;
  const monthlyMaintenance =
    useWatch({
      name: "maintenanceRate",
      control,
    }) *
    0.01 *
    monthlyRent;
  const monthlyCapex =
    useWatch({
      name: "capexRate",
      control,
    }) *
    0.01 *
    monthlyRent;
  const monthlyUtilities = useWatch({
    name: "utilities",
    control,
  });

  const monthlyExpenses =
    monthlyMortgagePayment +
    monthlyPropertyTax +
    monthlyInsurance +
    monthlyVacancy +
    monthlyMaintenance +
    monthlyCapex +
    monthlyUtilities;

  const monthlyCashFlow = roundTwoDecimalPlaces(
    monthlyIncome - monthlyExpenses
  );
  const cocReturn = roundTwoDecimalPlaces(
    ((12 * monthlyCashFlow) / totalCashInvested) * 100
  );
  return { monthlyCashFlow, cocReturn };
};
