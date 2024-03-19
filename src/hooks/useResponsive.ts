import useMediaQuery from "@mui/material/useMediaQuery";

export const useResponsive = () => {
  const isLaptop = useMediaQuery("(max-width:1000px)");
  const isTablet = useMediaQuery("(max-width:700px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  return {
    isLaptop,
    isTablet,
    isMobile,
  };
};
