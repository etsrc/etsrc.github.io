import "./App.css";
import Page from "./dashboard/page";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Page />
    </ThemeProvider>
  );
}

export default App;
