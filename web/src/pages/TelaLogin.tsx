import { Box } from "@mui/material";
import { SectionLogin } from "../components/SectionLogin";
import { FormLogin } from "../components/FormLogin";

export function TelaLogin() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SectionLogin />
      <FormLogin />
    </Box>
  );
}
