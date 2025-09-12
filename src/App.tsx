import "./App.css";
import Page from "./dashboard/page";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
