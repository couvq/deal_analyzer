import { getDefaultValuesFromUrl } from "@/lib/utils";
import type { FormValues } from "@/types/shared";
import { useForm } from "react-hook-form";
import PropertyInfo from "./forms/PropertyInfo";
import Analysis from "./Analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTabs, useTabsDispatch, type TabType } from "@/context/TabsContext";
import PaginationButtons from "./PaginationButtons";
import FinancingDetails from "./forms/FinancingDetails";
import IncomeProjections from "./forms/IncomeProjections";
import OperatingExpenses from "./forms/OperatingExpenses";
import { Card, CardFooter } from "./ui/card";

const MultiStepForm = () => {
  const { register, control } = useForm<FormValues>({
    defaultValues: getDefaultValuesFromUrl(),
  });

  const { activeTab } = useTabs();
  const dispatch = useTabsDispatch();

  return (
    <Card className="p-0">
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
        <div className="p-4">
          <TabsContent value="propertyInfo">
            <PropertyInfo register={register} />
          </TabsContent>
          <TabsContent value="financing">
            <FinancingDetails register={register} control={control} />
          </TabsContent>
          <TabsContent value="income">
            <IncomeProjections register={register} control={control} />
          </TabsContent>
          <TabsContent value="expenses">
            <OperatingExpenses register={register} />
          </TabsContent>
          <TabsContent value="analysis">
            <Analysis control={control} />
          </TabsContent>
        </div>
      </Tabs>
      <CardFooter className="pb-4">
        <PaginationButtons />
      </CardFooter>
    </Card>
  );
};

export default MultiStepForm;
