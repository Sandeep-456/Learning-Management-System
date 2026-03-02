import React from "react";
import { FaPlay, FaFilm } from "react-icons/fa";

export default function VideoPlayer({ videoUrl, title }) {
  const isGoogleDrive = videoUrl && videoUrl.includes("drive.google.com");

  // if (isGoogleDrive) {
  //   return (
  //     <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
  //       <iframe
  //         src={videoUrl}
  //         className="absolute top-0 left-0 w-full h-full"
  //         allow="autoplay; encrypted-media"
  //         allowFullScreen
  //         title="Video Player"
  //       ></iframe>
  //     </div>
  //   );
  // }

  return (
    <div className="relative font-sans">
      {/* DECORATIVE BACKDROP BLOBS */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      {/* MAIN CLAY CARD */}
      <div
        className="relative z-10 bg-[#F0F4F8] rounded-[2.5rem] px-4 py-8 md:p-8"
        style={{
          // Claymorphism: Floating Effect
          boxShadow: "20px 20px 60px #cedbe7, -20px -20px 60px #ffffff",
        }}
      >
        {/* HEADER (Optional Title Display) */}
        <div className="flex items-center gap-4 mb-6 px-2">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white transform rotate-[-3deg]"
            style={{
              background: "linear-gradient(145deg, #f43f5e, #e11d48)", // Pink/Red gradient for Video
              boxShadow: "5px 5px 15px #c1c9d2, -5px -5px 15px #ffffff",
            }}
          >
            <FaPlay className="text-lg drop-shadow-md ml-1" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none">
              Session Recording
            </h2>
            <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mt-1">
              {title || "Class Video"}
            </p>
          </div>
        </div>

        {/* --- VIDEO SCREEN CONTAINER --- */}
        <div
          className="w-full rounded-3xl overflow-hidden relative bg-slate-900"
          // Inner shadow to look like a recessed screen
          style={
            !videoUrl
              ? {
                  boxShadow:
                    "inset 10px 10px 20px #d1d9e6, inset -10px -10px 20px #ffffff",
                  background: "#F0F4F8", // Match bg for empty state
                  minHeight: "400px",
                }
              : {
                  boxShadow:
                    "inset 5px 5px 10px rgba(0,0,0,0.5), inset -5px -5px 10px rgba(255,255,255,0.1)",
                }
          }
        >
          {videoUrl ? (
            isGoogleDrive ? (
              // GOOGLE DRIVE IFRAME
              <div
                className="relative w-full h-full"
                style={{ paddingBottom: "56.25%", height: 0 }}
              >
                <iframe
                  src={videoUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Video Player"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            ) : (
              // NATIVE VIDEO TAG
              <video
                src={videoUrl}
                className="w-full h-auto block"
                controls
                playsInline
                controlsList="nodownload"
                style={{ maxHeight: "70vh" }}
              />
            )
          ) : (
            // --- EMPTY STATE (WAITING MESSAGE) ---
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="relative mb-6">
                {/* Floating Icon Circle */}
                <div
                  className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-rose-400 animate-[float_3s_ease-in-out_infinite]"
                  style={{
                    boxShadow:
                      "10px 10px 30px #d1d9e6, -10px -10px 30px #ffffff",
                  }}
                >
                  <FaFilm className="text-4xl" />
                </div>
                {/* Shadow underneath */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-slate-300 rounded-full blur-md opacity-40 animate-[shadow_3s_ease-in-out_infinite]"></div>
              </div>

              <h3 className="text-2xl font-black text-slate-700 mb-2">
                Processing Video
              </h3>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed text-sm">
                The recording for this session is currently being processed or
                uploaded. Please check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
