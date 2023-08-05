/**
 * @type {import("@mui/material").Components}
 */
const componentOverrides: any = {
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        borderRadius: "6px",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#000",
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundImage: "none",
      },
    },
  },
};

export default componentOverrides;
