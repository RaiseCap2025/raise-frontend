import React from "react";
import { Box, Select, MenuItem, Button } from "@mui/material";
import styles from "./PipelineSelector.module.scss";

interface PipelineSelectorProps {
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  onCreate: () => void;
}

const PipelineSelector: React.FC<PipelineSelectorProps> = ({ options, selected, onSelect, onCreate }) => {
  return (
    <Box className={styles.pipelineBox}>
      <Select fullWidth value={selected} onChange={(e) => onSelect(e.target.value)} displayEmpty>
        <MenuItem value="">Search data preparation pipeline</MenuItem>
        {options.map((opt, idx) => <MenuItem key={idx} value={opt}>{opt}</MenuItem>)}
      </Select>
      <Button variant="contained" color="primary" onClick={onCreate} className={styles.createBtn}>
        Create new data pipeline +
      </Button>
    </Box>
  );
};

export default PipelineSelector;
