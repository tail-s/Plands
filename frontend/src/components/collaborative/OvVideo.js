import React, { useRef, useEffect } from "react";
import { CustomVideo } from "./OvVideo.style";
const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager]);

  return <CustomVideo autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;
