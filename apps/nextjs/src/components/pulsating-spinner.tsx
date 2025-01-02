"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "~/lib/utils";

export interface PulsatingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  minSize?: number;
  maxSize?: number;
  spinSpeed?: number;
  pulseSpeed?: number;
  onComplete?: () => void;
}

const PulsatingSpinner = React.forwardRef<
  HTMLDivElement,
  PulsatingSpinnerProps
>(
  (
    {
      className,
      imageUrl,
      minSize = 80,
      maxSize = 120,
      spinSpeed = 1,
      pulseSpeed = 1,
      onComplete,
      ...props
    },
    ref,
  ) => {
    const [size, setSize] = React.useState(minSize);
    const [isGrowing, setIsGrowing] = React.useState(true);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setSize((prevSize) => {
          if (prevSize >= maxSize) setIsGrowing(false);
          if (prevSize <= minSize) setIsGrowing(true);
          return isGrowing ? prevSize + 1 : prevSize - 1;
        });
      }, 20 / pulseSpeed);

      return () => clearInterval(interval);
    }, [isGrowing, maxSize, minSize, pulseSpeed]);

    return (
      <div
        className={cn("flex items-center justify-center", className)}
        ref={ref}
        {...props}
      >
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animation: `${2 / spinSpeed}s linear infinite`,
            animationName: "spin",
          }}
        >
          <style jsx>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
          <Image
            src={imageUrl}
            alt="Loading spinner"
            width={size}
            height={size}
            className="rounded-full"
            onLoadingComplete={onComplete}
          />
        </div>
      </div>
    );
  },
);

PulsatingSpinner.displayName = "PulsatingSpinner";

export { PulsatingSpinner };
