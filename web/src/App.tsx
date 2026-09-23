import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TelaLogin } from "./pages/TelaLogin";
import { TelaCadastro } from "./pages/TelaCadastro";
import { RotaProtegida } from "./components/RotaProtegida";
import { RotaPublica } from "./components/RotaPublica";
import { HistoryPage } from "./pages/HistoryPage.js";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RotaPublica />}>
          <Route path="/login" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastro />} />
        </Route>
        <Route element={<RotaProtegida />}>
          <Route path="/historico" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
