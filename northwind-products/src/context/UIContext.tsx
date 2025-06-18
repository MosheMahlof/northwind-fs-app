import React, { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import {
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";

interface UIContextType {
  showToast: (
    message: string,
    severity?: "success" | "error" | "info" | "warning"
  ) => void;
  setSpinner: (active: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMobile: boolean;
}

export const UIContext = createContext<UIContextType>({
  showToast: () => {},
  setSpinner: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
  isMobile: false,
});

export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const [spinner, setSpinnerState] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const isMobile = useMediaQuery("(max-width:875px)");

  const showToast = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setToast({ open: true, message, severity });
  };

  const setSpinner = (active: boolean) => {
    setSpinnerState(active);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  // Create theme based on dark mode state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: isDarkMode ? "#90caf9" : "#1976d2",
          },
          secondary: {
            main: isDarkMode ? "#f48fb1" : "#dc004e",
          },
          background: {
            default: isDarkMode ? "#121212" : "#f0f0f0",
            paper: isDarkMode ? "#1e1e1e" : "#fff",
          },
          info: {
            main: isDarkMode ? "#64b5f6" : "#0288d1",
          },
          success: {
            main: isDarkMode ? "#81c784" : "#388e3c",
          },
          warning: {
            main: isDarkMode ? "#ffb74d" : "#fbc02d",
          },
          error: {
            main: isDarkMode ? "#e57373" : "#d32f2f",
          },
          text: {
            primary: isDarkMode ? "#fff" : "#222",
            secondary: isDarkMode ? "#aaa" : "#555",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                fontSize: "16px",
              },
              body: {
                scrollbarColor: `${isDarkMode ? "#90caf9" : "#1976d2"} ${
                  isDarkMode ? "#1e1e1e" : "#f0f0f0"
                }`,
                "&::-webkit-scrollbar": {
                  width: 12,
                  backgroundColor: isDarkMode ? "#1e1e1e" : "#f0f0f0",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: isDarkMode ? "#90caf9" : "#1976d2",
                  borderRadius: 8,
                  border: `2px solid ${isDarkMode ? "#1e1e1e" : "#f0f0f0"}`,
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: isDarkMode ? "#64b5f6" : "#1565c0",
                },
                "&::-webkit-scrollbar-corner": {
                  backgroundColor: isDarkMode ? "#1e1e1e" : "#f0f0f0",
                },
              },
            },
          },

          MuiTableCell: {
            styleOverrides: {
              root: {
                border: "none",
              },
              head: {
                fontWeight: 600,
                whiteSpace: "nowrap",
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <UIContext.Provider
      value={{ showToast, setSpinner, isDarkMode, toggleDarkMode, isMobile }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={toast.severity}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
          open={spinner}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </UIContext.Provider>
  );
};
