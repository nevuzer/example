import Alert from "@mui/material/Alert";

export const ErrorMessage = (props) => {
  const { message } = props;

  return <Alert severity="error">{message}</Alert>;
};
