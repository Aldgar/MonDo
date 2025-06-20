"use client";
import React from "react";

export default function AnimatedLogo() {
  // Scroll handler for the scroll-down element
  const handleScroll = () => {
    const main = document.getElementById("main-content");
    if (main) {
      main.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      {/* Logo */}
      <a
        href="https://www.aldgar.dev/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform transform hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
      >
        <svg
          className="w-72 h-72"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B">
                <animate
                  attributeName="stop-color"
                  values="#FF6B6B;#FFD93D;#6BCB77;#4D96FF;#FF6B6B"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#4D96FF">
                <animate
                  attributeName="stop-color"
                  values="#4D96FF;#6BCB77;#FFD93D;#FF6B6B;#4D96FF"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>

          <style>
            {`
              .path {
                fill: none;
                stroke: url(#grad);
                stroke-width: 8;
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw 3s ease forwards;
              }

              .logo-text {
                opacity: 0;
                animation: fadeInColor 4s ease forwards 2s;
                font-family: 'Arial', sans-serif;
                font-weight: bold;
              }

              @keyframes draw {
                to {
                  stroke-dashoffset: 0;
                }
              }

              @keyframes fadeInColor {
                0% { opacity: 0; fill: #FF6B6B; }
                25% { fill: #FFD93D; }
                50% { fill: #6BCB77; }
                75% { fill: #4D96FF; }
                100% { opacity: 1; fill: #FF6B6B; }
              }
            `}
          </style>

          <circle className="path" cx="150" cy="150" r="100" />
          <text x="90" y="160" fontSize="32" className="logo-text">
            MonDo
          </text>
        </svg>
      </a>

      {/* Scroll Down Element */}
      <button
        onClick={handleScroll}
        className="mt-10 flex flex-col items-center space-y-3 focus:outline-none"
        aria-label="Scroll Down"
      >
        <span className="text-sm uppercase tracking-wide font-medium text-white opacity-80 animate-pulse">
          Scroll Down to see Thoughts!
        </span>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          className="animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B">
                <animate
                  attributeName="stop-color"
                  values="#FF6B6B;#FFD93D;#6BCB77;#4D96FF;#FF6B6B"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#4D96FF">
                <animate
                  attributeName="stop-color"
                  values="#4D96FF;#6BCB77;#FFD93D;#FF6B6B;#4D96FF"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <path d="M12 16l-6-6h12l-6 6z" fill="url(#scrollGrad)" />
        </svg>
      </button>
    </div>
    );
  }