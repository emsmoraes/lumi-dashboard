import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { tanstack } from "./lib/tanstack";

function App() {
  return (
    <QueryClientProvider client={tanstack}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
