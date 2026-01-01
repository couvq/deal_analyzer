import { useMonthlyMortgagePayment } from "@/hooks";
import type { FormValues } from "@/types/shared";
import { type Control, type UseFormRegister } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";

interface FinancingDetailsProps {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues, any, FormValues>;
}

const FinancingDetails = ({ register, control }: FinancingDetailsProps) => {
  const monthlyPayment = useMonthlyMortgagePayment(control);

  return (
    <>
      <FieldSet>
        <FieldLegend>Financing details</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="downPayment">Down payment (%)</FieldLabel>
            <Input type="number" {...register("downPayment")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="interestRate">Interest rate (%)</FieldLabel>
            <Input type="number" {...register("interestRate")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="loanTerm">Loan term (years)</FieldLabel>
            <Input type="number" {...register("loanTerm")} />
          </Field>
        </FieldGroup>
      </FieldSet>
      <Alert variant="default">
        <AlertTitle>Monthly mortgage payment</AlertTitle>
        <AlertDescription>{monthlyPayment}</AlertDescription>
      </Alert>
    </>
  );
};

export default FinancingDetails;
