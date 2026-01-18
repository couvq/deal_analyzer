import { useAnalytics, useLongTermCashflow } from "@/hooks";
import type { FormValues } from "@/types/shared";
import { useWatch, type Control } from "react-hook-form";

interface AnalysisProps {
  control: Control<FormValues, any, FormValues>;
}

const Analysis = ({ control }: AnalysisProps) => {
  const { monthlyCashFlow, cocReturn } = useAnalytics(control);
  const longTermCashflow = useLongTermCashflow(control);

  return (
    <>
      <p>Monthly cash flow: ${monthlyCashFlow}</p>
      <p>Cash on cash return: {cocReturn}%</p>
    </>
  );
};

export default Analysis;
