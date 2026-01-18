import { useAnnualIncome } from "@/hooks";
import type { FormValues } from "@/types/shared";
import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { Button } from "../ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Plus, Trash } from "lucide-react";

interface IncomeProjectionsProps {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues, any, FormValues>;
}

const IncomeProjections = ({ register, control }: IncomeProjectionsProps) => {
  const { fields, append, remove } = useFieldArray({
    name: "units",
    control,
  });
  const annualIncome = useAnnualIncome(control);

  const handleAddUnit = () =>
    append({ name: `Unit ${fields.length + 1}`, monthlyRent: 0 });

  const handleDeleteUnit = (index: number) => remove(index);

  return (
    <>
      <FieldSet>
        <FieldLegend>Income projections</FieldLegend>
        <FieldGroup>
          {fields.map((unit, index) => (
            <Field key={unit.id} className="flex flex-row">
              <div>
                <FieldLabel htmlFor={`units.${index}.monthlyRent`}>
                  {unit.name}
                </FieldLabel>
                <Input
                  type="number"
                  {...register(`units.${index}.monthlyRent`)}
                />
              </div>
              <Button className="max-w-max self-end" variant="ghost" onClick={() => handleDeleteUnit(index)}>
                <Trash />
              </Button>
            </Field>
          ))}
        </FieldGroup>
        <Button className="max-w-max" onClick={handleAddUnit}>
          Add unit <Plus />
        </Button>
        <p>${annualIncome} annually</p>
      </FieldSet>
    </>
  );
};

export default IncomeProjections;
