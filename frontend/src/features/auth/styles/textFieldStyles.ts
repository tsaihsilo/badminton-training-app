export const textFieldStyles = {
    InputLabelProps: {
      sx: {
        color: "rgba(135, 229, 239, 0.5)",
        "&.Mui-focused": {
          color: "rgba(135, 229, 239, 1)",
        },
      },
    },
    InputProps: {
      sx: {
        color: "rgba(135, 229, 239, 1)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(135, 229, 239, 0.5)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(135, 229, 239, 0.75)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(135, 229, 239, 1)",
        },
      },
    },
  };