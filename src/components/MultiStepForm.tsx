import { getDefaultValuesFromUrl } from "@/lib/utils";
import type { FormValues } from "@/types/shared";
import { useForm } from "react-hook-form";
import PropertyInfo from "./forms/PropertyInfo";
import Analysis from "./Analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTabs, useTabsDispatch, type TabType } from "@/context/TabsContext";
import PaginationButtons from "./PaginationButtons";

const MultiStepForm = () => {
  const { register, control } = useForm<FormValues>({
    defaultValues: getDefaultValuesFromUrl(),
  });

  const { activeTab } = useTabs();
  const dispatch = useTabsDispatch();

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={(newTab) =>
          dispatch({ type: "change", newTab: newTab as TabType })
        }
      >
        <TabsList>
          <TabsTrigger value="propertyInfo">Property</TabsTrigger>
          <TabsTrigger value="financing">Financing</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="propertyInfo">
          <PropertyInfo register={register} />
        </TabsContent>
        <TabsContent value="financing">Financing</TabsContent>
        <TabsContent value="income">Income</TabsContent>
        <TabsContent value="expenses">Expenses</TabsContent>
        <TabsContent value="analysis">
          <Analysis control={control} />
        </TabsContent>
      </Tabs>
      <PaginationButtons />
    </>
  );
};

export default MultiStepForm;
