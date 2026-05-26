import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActivationPage from "./pages/ActivationPage";
import SubscriptionStatusPage from "./pages/SubscriptionStatusPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/activation/:activationCode"
          element={<ActivationPage />}
        />

        <Route
          path="/status"
          element={<SubscriptionStatusPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;