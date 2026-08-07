import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx'
import {ThemeProvider} from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "./theme/theme.ts"
import {Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')!).render(
   <BrowserRouter>
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </ThemeProvider>
</BrowserRouter>
)
