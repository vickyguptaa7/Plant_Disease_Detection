import React, { useEffect, useState } from "react";

const ImagePlayer = ({detectData}) => {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurr((prev) => (prev + 1) % detectData?.full_images?.length);
    },50);
    return () => clearInterval(interval);
  }, [detectData]);

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ maxWidth: "600px" }}
    >
      <img
        className="w-100 h-100"
        style={{}}
        src={`data:image/png;base64,${detectData?.full_images?.[curr]}`}
        alt="face"
      />
    </div>
  );
};

export default ImagePlayer;
