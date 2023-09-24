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
        // backgroundColor: "#474747",
        // color: "#FAF7FF",
        "&:hover": {
          backgroundColor: "#333333",
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
