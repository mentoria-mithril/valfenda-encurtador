import { Box } from "@mui/material";
import { SectionLogin } from "../components/SectionLogin";
import { FormLogin } from "../components/FormLogin";

export function TelaLogin() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SectionLogin texto="Links longos ficam difíceis de lembrar e de compartilhar. Encurte os seus, acompanhe cliques e organize tudo em um só lugar." />
      <FormLogin />
    </Box>
  );
}
