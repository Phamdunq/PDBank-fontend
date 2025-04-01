import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext"; // Import đúng AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* Bọc toàn bộ App trong AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
