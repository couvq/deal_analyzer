import { useForm } from "react-hook-form";
import Analysis from "./components/Analysis";
import PropertyInfo from "./components/forms/PropertyInfo";
import type { FormValues } from "./types/shared";
import { getDefaultValuesFromUrl } from "./lib/utils";

const App = () => {
  const { register, control } = useForm<FormValues>({
    defaultValues: getDefaultValuesFromUrl()
  });

  return (
    <>
      <h1 className="text-4xl">Deal analyzer</h1>
      <p>Analyze investment properties in seconds.</p>
      <PropertyInfo register={register} />
      <Analysis control={control} />
    </> 
  );
};

export default App;
