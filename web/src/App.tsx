import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TelaLogin } from "./pages/TelaLogin";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<TelaLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
