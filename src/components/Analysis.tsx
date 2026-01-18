import { useAnalytics } from "@/hooks";
import type { FormValues } from "@/types/shared";
import { type Control } from "react-hook-form";
import CashflowLineChart from "./charts/CashflowLineChart";

interface AnalysisProps {
  control: Control<FormValues, any, FormValues>;
}

const Analysis = ({ control }: AnalysisProps) => {
  const { monthlyCashFlow, cocReturn } = useAnalytics(control);

  return (
    <>
      <p>Monthly cash flow: ${monthlyCashFlow}</p>
      <p>Cash on cash return: {cocReturn}%</p>
      <CashflowLineChart control={control} />
    </>
  );
};

export default Analysis;
