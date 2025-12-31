import type { FormValues } from "@/types/shared";
import { useWatch, type Control } from "react-hook-form";

interface AnalysisProps {
    control: Control<FormValues, any, FormValues>
}

const Analysis = ({ control }: AnalysisProps) => {
  const formValues = useWatch({ control: control });

  return (
    <>
      <h4>Current Form Values (Display Component)</h4>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default Analysis;
