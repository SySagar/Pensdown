import { ThemeProvider, createTheme } from "@mui/material";
import componentOverrides from "./components";
import lightPalette from "./palette.light";
import typography from "./typography";

const AppThemeProvider = ({ children }:any) => {
  const theme = createTheme({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    components: componentOverrides,
    palette: lightPalette,
    typography,
  });

  return <ThemeProvider theme={theme}>
  {children}
  </ThemeProvider>;
};

export default AppThemeProvider;
