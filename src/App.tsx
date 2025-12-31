import { useForm } from "react-hook-form";
import Analysis from "./components/Analysis";
import PropertyInfo from "./components/forms/PropertyInfo";
import type { FormValues } from "./types/shared";

const App = () => {
  const { register, control } = useForm<FormValues>({
    defaultValues: {
      address: "",
    },
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
