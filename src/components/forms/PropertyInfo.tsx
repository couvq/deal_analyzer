import type { UseFormRegister } from "react-hook-form";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import type { FormValues } from "@/types/shared";

interface PropertyInfoProps {
  register: UseFormRegister<FormValues>;
}

const PropertyInfo = ({ register }: PropertyInfoProps) => {
  return (
    <>
      <FieldSet>
        <FieldLegend>Property information</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input {...register("address")} />
          </Field>
        </FieldGroup>
      </FieldSet>
    </>
  );
};

export default PropertyInfo;
