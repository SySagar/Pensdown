/**
 * @typedef {Object} CustomPalette
 * @property {import("@mui/material").PaletteColorOptions} onPrimary
 * @property {import("@mui/material").PaletteColorOptions} primaryContainer
 * @property {import("@mui/material").PaletteColorOptions} onPrimaryContainer
 * @property {import("@mui/material").PaletteColorOptions} onSecondary
 * @property {import("@mui/material").PaletteColorOptions} secondaryContainer
 * @property {import("@mui/material").PaletteColorOptions} onSecondaryContainer
 * @property {import("@mui/material").PaletteColorOptions} tertiary
 * @property {import("@mui/material").PaletteColorOptions} onTertiary
 * @property {import("@mui/material").PaletteColorOptions} tertiaryContainer
 * @property {import("@mui/material").PaletteColorOptions} onTertiaryContainer
 * @property {import("@mui/material").TypeBackground} onBackground
 */

/**
 * @type {import("@mui/material").PaletteOptions & CustomPalette}
 */
const lightPalette = {
  secondary: {
    main: "#BFDBBD",
    light: "#BFDBBD",
    dark: "#BFDBBD",
    contrastText: "#478585",
  },
  primary: {
    main: "#478585",
    light: "#478585",
    dark: "#478585",
    contrastText: "#FAF7FF",
  },
  background: {
    default: "#EFECDC",
    main: "#EFECDC",
    paper: "#EFECDC",
  },
  text: {
    primary: "#478585",
    secondary: "#4D4D4D",
  },
};

export default lightPalette;
