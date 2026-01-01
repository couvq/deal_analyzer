import { getDefaultValuesFromUrl } from "@/lib/utils";
import type { FormValues } from "@/types/shared";
import { useForm } from "react-hook-form";
import PropertyInfo from "./forms/PropertyInfo";
import Analysis from "./Analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const MultiStepForm = () => {
  const { register, control } = useForm<FormValues>({
    defaultValues: getDefaultValuesFromUrl(),
  });

  return (
    <>
      <Tabs defaultValue="propertyInfo">
        <TabsList>
          <TabsTrigger value="propertyInfo">Property</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="propertyInfo">
          <PropertyInfo register={register} />
        </TabsContent>
        <TabsContent value="analysis">
          <Analysis control={control} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MultiStepForm;
