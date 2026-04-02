import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VariablesPage from "./pages/VariablesPage";
import VariableDetailsPage from "./pages/VariableDetailsPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/variables" element={<VariablesPage />} />
            <Route path="/variables/:id" element={<VariableDetailsPage />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
