import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TelaLogin } from "./pages/TelaLogin";
import { TelaCadastro } from "./pages/TelaCadastro";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
