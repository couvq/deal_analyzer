import { calculateMonthlyMortgagePayment } from "@/lib/utils";
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
