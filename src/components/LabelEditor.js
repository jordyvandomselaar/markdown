import React, { useState } from "react";
import { Chip, ChipSet, ChipText } from "rmwc/Chip";
import { TextField } from "rmwc/TextField";

const LabelEditor = ({ onChange, labels = [] }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!value) return;

    setValue("");
    onChange(value);
  };

  return (
    <div>
      {onChange && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Labels"
            fullwidth
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </form>
      )}
      <ChipSet>
        {labels.map(label => (
          <Chip key={label}>
            <ChipText>{label}</ChipText>
          </Chip>
        ))}
      </ChipSet>
    </div>
  );
};

export default LabelEditor;
