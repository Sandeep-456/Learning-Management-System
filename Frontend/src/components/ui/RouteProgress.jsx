import React from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Customize progress bar appearance
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 80,
  easing: "ease",
  speed: 500,
});

export default function RouteProgress() {
  const location = useLocation();

  React.useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => NProgress.done(), 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return null;
}
