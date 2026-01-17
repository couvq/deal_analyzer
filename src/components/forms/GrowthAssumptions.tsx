import type { FormValues } from "@/types/shared";
import type { UseFormRegister } from "react-hook-form";
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

interface GrowthAssumptionsProps {
  register: UseFormRegister<FormValues>;
}

const GrowthAssumptions = ({ register }: GrowthAssumptionsProps) => {
  return (
    <FieldSet>
      <FieldLegend>Growth assumptions</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="annualRentGrowth">Annual rent growth (%)</FieldLabel>
          <Input {...register("annualRentGrowth")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="annualAppreciation">Annual appreciation (%)</FieldLabel>
          <Input {...register("annualAppreciation")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="annualOperatingExpenseIncrease">Annual operating expense increase (%)</FieldLabel>
          <Input {...register("annualOperatingExpenseIncrease")} />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default GrowthAssumptions;
