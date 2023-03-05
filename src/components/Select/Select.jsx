import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MUISelect from "@mui/material/Select";

export const Select = (props) => {
  const { value, onChange, label, options, disabled } = props;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <MUISelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>
    </Box>
  );
};
