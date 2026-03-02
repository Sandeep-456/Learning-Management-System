import { useState } from "react";

export default function useZoomLink() {
  const [zoomLink, setZoomLink] = useState("");

  const updateZoomLink = (link) => {
    setZoomLink(link);
    localStorage.setItem("zoom_link", link);
  };

  return { zoomLink, updateZoomLink };
}
