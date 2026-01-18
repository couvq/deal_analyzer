import {
  buildCashflowForLoanPeriod,
  calculateMonthlyMortgagePayment,
  roundTwoDecimalPlaces,
} from "@/lib/utils";
import type { CashflowLineChartMetadata, FormValues } from "@/types/shared";
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

export const useAnnualIncome = (
  control: Control<FormValues, any, FormValues>
): number => {
  const units = useWatch({
    name: "units",
    control,
  });

  const annualIncome =
    12 * units.reduce((acc, cur) => acc + Number(cur.monthlyRent), 0);
  return annualIncome;
};

export const useAnnualExpenses = (
  control: Control<FormValues, any, FormValues>
): number => {
  const annualIncome = useAnnualIncome(control);
  const monthlyIncome = annualIncome / 12;
  const monthlyMortgagePayment = useMonthlyMortgagePayment(control);
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
    monthlyIncome;
  const monthlyMaintenance =
    useWatch({
      name: "maintenanceRate",
      control,
    }) *
    0.01 *
    monthlyIncome;
  const monthlyCapex =
    useWatch({
      name: "capexRate",
      control,
    }) *
    0.01 *
    monthlyIncome;
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

  const annualExpenses = monthlyExpenses * 12;
  return annualExpenses;
};

export interface UseAnalyticsResponse {
  monthlyCashFlow: number;
  cocReturn: number;
}

export const useAnalytics = (
  control: Control<FormValues, any, FormValues>
): UseAnalyticsResponse => {
  const annualIncome = useAnnualIncome(control);
  const monthlyIncome = annualIncome / 12;

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
  const annualExpenses = useAnnualExpenses(control);
  const monthlyExpenses = annualExpenses / 12;

  const monthlyCashFlow = roundTwoDecimalPlaces(
    monthlyIncome - monthlyExpenses
  );
  const cocReturn = roundTwoDecimalPlaces(
    ((12 * monthlyCashFlow) / totalCashInvested) * 100
  );
  return { monthlyCashFlow, cocReturn };
};

export const useCashFlowLineChart = (
  control: Control<FormValues, any, FormValues>
): CashflowLineChartMetadata[] => {
  const annualIncome = useAnnualIncome(control);
  const annualExpenses = useAnnualExpenses(control);
  const loanTermInYears = useWatch({
    name: "loanTerm",
    control,
  });
  const annualRentGrowth =
    useWatch({
      name: "annualRentGrowth",
      control,
    }) * 0.01;
  const annualOperatingExpenseIncrease =
    useWatch({
      name: "annualOperatingExpenseIncrease",
      control,
    }) * 0.01;

  return buildCashflowForLoanPeriod(
    annualIncome,
    annualExpenses,
    loanTermInYears,
    annualRentGrowth,
    annualOperatingExpenseIncrease
  );
};
