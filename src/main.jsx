import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import App from "@/App.jsx";
import "@/index.css";
import "react-toastify/dist/ReactToastify.css";

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={client}>
      <App />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </QueryClientProvider>
  </Router>
);
