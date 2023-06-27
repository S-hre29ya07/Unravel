import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css";

export default function Video({ video_url }) {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const vidRef = useRef();

  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current.pause();
      setisVideoPlaying(false);
    } else {
      vidRef.current.play();
      setisVideoPlaying(true);
    }
  };

  useEffect(() => {
    const scroll = document.getElementById("videoPlayer");

    const handleScroll = () => {
      const rect = vidRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (isVisible && !isVideoPlaying) {
        vidRef.current.play();
        setisVideoPlaying(true);
      } else if (!isVisible && isVideoPlaying) {
        vidRef.current.pause();
        setisVideoPlaying(false);
      }
    };

    if (scroll) {
      scroll.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scroll) {
        scroll.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isVideoPlaying]);

  return (
    <div className="videoFrames">
      <video
        onClick={onVideoClick}
        className="videoParticularPlayer"
        ref={vidRef}
        src={video_url}
        loop
      />
    </div>
  );
}
