import { Box } from "@mui/material";
import { SectionLogin } from "../components/SectionLogin";
import { FormCadastro } from "../components/FormCadastro";

export function TelaCadastro() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SectionLogin texto="Crie sua conta e comece a encurtar links, acompanhar cliques e organizar tudo em um só lugar." />
      <FormCadastro />
    </Box>
  );
}
