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
  primary: {
    main: "#1A2228",
    light: "#1A2228",
    dark: "#1A2228",
    contrastText: "#fff",
  },
  secondary: {
    main: "#1A2228",
    light: "#1A2228",
    dark: "#1A2228",
    contrastText: "#fff",
  },
  text: {
    primary: "#000000",
    secondary: "#999",
  },
};

export default lightPalette;
