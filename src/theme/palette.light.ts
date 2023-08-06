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
    main: "#BDBDBD",
    light: "#BDBDBD",
    dark: "#BDBDBD",
    contrastText: "#474747"
  },
  secondary: {
    main: "#474747",
    light: "#474747",
    dark: "#474747",
    contrastText: "#FAF7FF"
  },
  text: {
    primary: "#474747",
    secondary: "#474747",
  },
};

export default lightPalette;
