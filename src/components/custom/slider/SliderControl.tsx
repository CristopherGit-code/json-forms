import { withJsonFormsControlProps } from "@jsonforms/react";
import { ControlProps } from "@jsonforms/core";
import { Slider } from "./Slider";

interface SliderControlProps extends ControlProps {}

const SliderControl = ({ data, handleChange, path, label, schema }: SliderControlProps) => {
  const min = schema?.minimum ?? 0;
  const max = schema?.maximum ?? 100;
  const step = schema?.multipleOf ?? 1;
  const defaultValue = schema?.default ?? min;

  return (
    <Slider
      value={data ?? defaultValue}
      updateValue={(newValue) => handleChange(path, newValue)}
      min={min}
      max={max}
      step={step}
      label={(schema?.description) ? schema?.description : "Data slider"}
    />
  );
};

export default withJsonFormsControlProps(SliderControl);