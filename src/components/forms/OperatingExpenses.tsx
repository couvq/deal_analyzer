import type { FormValues } from "@/types/shared";
import type { UseFormRegister } from "react-hook-form";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";

interface OperatingExpensesProps {
  register: UseFormRegister<FormValues>;
}

const OperatingExpenses = ({ register }: OperatingExpensesProps) => {
  return (
    <FieldSet>
      <FieldLegend>Operating expenses</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="annualPropertyTax">
            Annual property tax
          </FieldLabel>
          <Input type="number" {...register("annualPropertyTax")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="annualInsurance">Annual insurance</FieldLabel>
          <Input type="number" {...register("annualInsurance")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="vacancyRate">Vacancy rate (%)</FieldLabel>
          <Input type="number" {...register("vacancyRate")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="maintenanceRate">
            Maintenance (% of rent)
          </FieldLabel>
          <Input type="number" {...register("maintenanceRate")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="capexRate">
            Capital expenditures (% of rent)
          </FieldLabel>
          <Input type="number" {...register("capexRate")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="utilities">Utilities</FieldLabel>
          <Input type="number" {...register("utilities")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="miscExpenses">Other expenses</FieldLabel>
          <Input type="number" {...register("miscExpenses")} />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default OperatingExpenses;
