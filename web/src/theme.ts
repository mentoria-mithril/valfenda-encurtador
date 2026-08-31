import { createTheme } from "@mui/material/styles";

export const tema = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8ab4f8" },
    background: { default: "#0f1115", paper: "#171a21" },
  },
  shape: { borderRadius: 10 },
});
