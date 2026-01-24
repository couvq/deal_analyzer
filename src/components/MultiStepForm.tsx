import { useStep, useStepDispatch, type StepType } from "@/context/StepContext";
import { getDefaultValuesFromUrl } from "@/lib/utils";
import type { FormValues } from "@/types/shared";
import { useForm } from "react-hook-form";
import Analysis from "./Analysis";
import PaginationButtons from "./PaginationButtons";
import FinancingDetails from "./forms/FinancingDetails";
import IncomeProjections from "./forms/IncomeProjections";
import OperatingExpenses from "./forms/OperatingExpenses";
import PropertyInfo from "./forms/PropertyInfo";
import { Card, CardFooter } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import GrowthAssumptions from "./forms/GrowthAssumptions";

const MultiStepForm = () => {
  const { register, control } = useForm<FormValues>({
    defaultValues: getDefaultValuesFromUrl(),
  });

  const { activeStep } = useStep();
  const dispatch = useStepDispatch();

  return (
    <Card className="p-0">
      <Tabs
        value={activeStep}
        onValueChange={(newStep) =>
          dispatch({ type: "change", newStep: newStep as StepType })
        }
      >
        <TabsList>
          <TabsTrigger value="propertyInfo">Property</TabsTrigger>
          <TabsTrigger value="financing">Financing</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="growthAssumptions">Growth</TabsTrigger>
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
          <TabsContent value="growthAssumptions">
            <GrowthAssumptions register={register} />
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
