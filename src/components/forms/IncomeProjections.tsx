import type { FormValues } from "@/types/shared";
import {
  useFieldArray,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAnnualIncome } from "@/hooks";

interface IncomeProjectionsProps {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues, any, FormValues>;
}

const IncomeProjections = ({ register, control }: IncomeProjectionsProps) => {
  const { fields, append } = useFieldArray({
    name: "units",
    control,
  });
  const annualIncome = useAnnualIncome(control);

  const handleAddUnit = () => {
    append({ name: `Unit ${fields.length + 1}`, monthlyRent: 0 });
  };

  return (
    <>
      <FieldSet>
        <FieldLegend>Income projections</FieldLegend>
        <FieldGroup>
          {fields.map((unit, index) => (
            <Field key={unit.id}>
              <FieldLabel htmlFor={unit.id}>{unit.name}</FieldLabel>
              <Input
                type="number"
                {...register(`units.${index}.monthlyRent`)}
              />
            </Field>
          ))}
        </FieldGroup>
        <Button onClick={handleAddUnit}>Add unit</Button>
        <p>${annualIncome} annually</p>
      </FieldSet>
    </>
  );
};

export default IncomeProjections;
