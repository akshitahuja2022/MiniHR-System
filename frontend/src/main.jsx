import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import AuthContextProvider from "./Context/AuthContextProvider.jsx";
import LeaveContextProvider from "./Context/LeaveContextProvider.jsx";
import AttendanceProvider from "./Context/AttendenceContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <LeaveContextProvider>
        <AttendanceProvider>
          <App />
        </AttendanceProvider>
      </LeaveContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
