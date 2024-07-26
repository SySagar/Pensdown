import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

const ImageWithLoading = ({ src, alt, width, height, ...props }: any) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = handleImageLoad;
  }, [src]);

  return (
    <div>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{ backgroundColor: "secondary.main" }}
        />
      ) : (
        <img src={src} alt={alt} onLoad={handleImageLoad} {...props.style} />
      )}
    </div>
  );
};

export default ImageWithLoading;
