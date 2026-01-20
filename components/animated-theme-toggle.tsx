"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Animation types
type AnimationVariant = "circle" | "rectangle";
type AnimationStart = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

interface Animation {
  name: string;
  css: string;
}

// Helper functions for animation
const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" };
    case "top-right":
      return { cx: "40", cy: "0" };
    case "bottom-left":
      return { cx: "0", cy: "40" };
    case "bottom-right":
      return { cx: "40", cy: "40" };
    default:
      return { cx: "20", cy: "20" };
  }
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return "top left";
    case "top-right":
      return "top right";
    case "bottom-left":
      return "bottom left";
    case "bottom-right":
      return "bottom right";
    default:
      return "center";
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (start === "center") return;
  if (variant === "rectangle") return "";

  const positionCoords = getPositionCoords(start);
  const { cx, cy } = positionCoords;

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return "";
};

const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  // Circle animation from corners
  if (variant === "circle" && start !== "center") {
    const getCirclePosition = (position: AnimationStart) => {
      switch (position) {
        case "top-left":
          return "0% 0%";
        case "top-right":
          return "100% 0%";
        case "bottom-left":
          return "0% 100%";
        case "bottom-right":
          return "100% 100%";
        default:
          return "50% 50%";
      }
    };

    const circlePos = getCirclePosition(start);

    return {
      name: `circle-${start}`,
      css: `
        ::view-transition-group(root) {
          /* 🎯 ANIMATION SPEED: Change this duration value to speed up/slow down the theme transition */
          /* Default: 0.7s | Slower: 1s, 1.5s | Faster: 0.3s, 0.5s */
          animation-duration: 1.5s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
              
        ::view-transition-new(root) {
          animation-name: reveal-circle-${start};
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: none;
          z-index: -1;
        }
        
        .dark::view-transition-new(root) {
          animation-name: reveal-circle-${start};
        }

        @keyframes reveal-circle-${start} {
          from {
            clip-path: circle(0% at ${circlePos});
          }
          to {
            clip-path: circle(150% at ${circlePos});
          }
        }
      `,
    };
  }

  // Default circle center animation
  if (variant === "circle" && start === "center") {
    return {
      name: "circle-center",
      css: `
        ::view-transition-group(root) {
          /* 🎯 ANIMATION SPEED: Change this duration value to speed up/slow down the theme transition */
          /* Default: 0.7s | Slower: 1s, 1.5s | Faster: 0.3s, 0.5s */
          animation-duration: 0.7s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
              
        ::view-transition-new(root) {
          animation-name: reveal-center;
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: none;
          z-index: -1;
        }
        
        .dark::view-transition-new(root) {
          animation-name: reveal-center;
        }

        @keyframes reveal-center {
          from {
            clip-path: circle(0% at 50% 50%);
          }
          to {
            clip-path: circle(100% at 50% 50%);
          }
        }
      `,
    };
  }

  // Fallback
  return {
    name: `${variant}-${start}`,
    css: `
      ::view-transition-group(root) {
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }
      ::view-transition-new(root) {
        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale-${start} 1s;
        transform-origin: ${transformOrigin};
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale-${start} 1s;
        transform-origin: ${transformOrigin};
        z-index: -1;
      }
      @keyframes scale-${start} {
        to {
          mask-size: 2000vmax;
        }
      }
    `,
  };
};

// Custom hook for animated theme toggle
export const useAnimatedThemeToggle = ({
  variant = "circle",
  start = "top-right",
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
} = {}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync isDark state with resolved theme after hydration
  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const styleId = "theme-transition-styles";

  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    const animation = createAnimation(variant, start);
    updateStyles(animation.css);

    if (typeof window === "undefined") return;

    const newTheme = theme === "light" ? "dark" : "light";

    const switchTheme = () => {
      setTheme(newTheme);
      setIsDark(newTheme === "dark");
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme, variant, start, updateStyles]);

  return {
    isDark,
    mounted,
    toggleTheme,
  };
};

// Animated Theme Toggle Button Component
export const AnimatedThemeToggle = ({
  className = "",
  variant = "circle",
  start = "top-right",
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
}) => {
  const { isDark, mounted, toggleTheme } = useAnimatedThemeToggle({
    variant,
    start,
  });

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "size-10 cursor-pointer rounded-full bg-neutral-900 dark:bg-white p-0 transition-all duration-300 active:scale-95",
          className,
        )}
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "cursor-pointer transition-all duration-300 active:scale-95 hover:opacity-80",
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        // Moon icon for dark mode (light colored)
        <motion.svg
          key="moon"
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </motion.svg>
      ) : (
        // Sun icon for light mode (dark colored)
        <motion.svg
          key="sun"
          initial={{ scale: 0, rotate: 90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-6 h-6 text-neutral-900"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </motion.svg>
      )}
    </button>
  );
};
