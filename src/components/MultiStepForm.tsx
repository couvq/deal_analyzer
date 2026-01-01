import { getDefaultValuesFromUrl } from "@/lib/utils";
import type { FormValues } from "@/types/shared";
import { useForm } from "react-hook-form";
import PropertyInfo from "./forms/PropertyInfo";
import Analysis from "./Analysis";

const MultiStepForm = () => {
  const { register, control } = useForm<FormValues>({
    defaultValues: getDefaultValuesFromUrl(),
  });
  
  return (
    <>
      <PropertyInfo register={register} />
      <Analysis control={control} />
    </>
  );
};

export default MultiStepForm;
