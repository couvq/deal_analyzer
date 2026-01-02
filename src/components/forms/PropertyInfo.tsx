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
  const urlParams = new URLSearchParams(window.location.search);
  const zillowHomeDetailsLink = urlParams.get("zillowHomeDetailsLink");

  return (
    <FieldSet>
      <FieldLegend>Property information</FieldLegend>
      {zillowHomeDetailsLink && (
        <a target="_blank" href={zillowHomeDetailsLink}>
          Zillow home details link
        </a>
      )}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Input {...register("address")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="purchasePrice">Purchase price</FieldLabel>
          <Input type="number" {...register("purchasePrice")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="numBeds">Beds</FieldLabel>
          <Input type="number" {...register("numBeds")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="numBaths">Baths</FieldLabel>
          <Input type="number" {...register("numBaths")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="squareFootage">Square feet</FieldLabel>
          <Input type="number" {...register("squareFootage")} />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default PropertyInfo;
