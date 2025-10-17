import { FC } from "react";
import { InputLabel, Slider as MuiSlider, Box } from "@mui/material";

interface SliderProps {
  id?: string
  value: number
  updateValue: (newValue: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  description?: string
}

export const Slider: FC<SliderProps> = ({ id, value, updateValue, min = 0, max = 100, step = 1, label = "", description = "" }) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      updateValue(newValue);
    }
  };

  const range = max - min;
  const customStep = (range > 100 ? 500 : range > 50 ? 5 : 1);

  const marks: { value: number; label: string }[] = [];
  for (let val = min; val <= max; val += customStep) {
    marks.push({ value: val, label: `${val}` });
  }
  if (marks[marks.length - 1].value !== max) {
    marks.push({ value: max, label: `${max}` });
  }


  return (
    <Box sx={{ width: "100%", marginTop: 2 }}>
      {label && (
        <InputLabel shrink style={{ marginBottom: "0.5em", fontSize: "1.2rem" }}>
          {label}: {description}
        </InputLabel>
      )}
      <MuiSlider
        id={id}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={customStep}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
};
