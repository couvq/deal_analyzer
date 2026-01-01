import type { FormValues } from "@/types/shared";
import { useWatch, type Control, type UseFormRegister } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Input } from "../ui/input";

interface IncomeProjectionsProps {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues, any, FormValues>;
}

const IncomeProjections = ({ register, control }: IncomeProjectionsProps) => {
  const monthlyRent = useWatch({
    name: "monthlyRent",
    control,
  });
  const annualRent = monthlyRent * 12

  return (
    <>
      <FieldSet>
        <FieldLegend>Income projections</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="monthlyRent">Monthly rent</FieldLabel>
            <Input type="number" {...register("monthlyRent")} />
            <FieldDescription>${annualRent} annually</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
      <Alert variant="default">
        <AlertTitle>Monthly rent</AlertTitle>
        <AlertDescription>${monthlyRent}</AlertDescription>
      </Alert>
    </>
  );
};

export default IncomeProjections;
