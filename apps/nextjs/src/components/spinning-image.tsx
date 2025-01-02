"use client";

import React, { Suspense, useEffect, useState } from "react";
import { PulsatingSpinner } from "./pulsating-spinner";

interface ThreadUnrollSuspenseSpinnerProps {
  children?: React.ReactNode;
  imageUrl?: string;
  waitTime?: number;
  minSize?: number;
  maxSize?: number;
  spinSpeed?: number;
  pulseSpeed?: number;
}

export function ThreadUnrollSuspenseSpinner({
  children,
  imageUrl = "/default-spinner.jpg",
  waitTime = 0,
  minSize,
  maxSize,
  spinSpeed,
  pulseSpeed,
}: ThreadUnrollSuspenseSpinnerProps) {
  const [isWaiting, setIsWaiting] = useState(waitTime > 0);

  useEffect(() => {
    if (waitTime > 0) {
      const timer = setTimeout(() => {
        setIsWaiting(false);
      }, waitTime);

      return () => clearTimeout(timer);
    }
  }, [waitTime]);

  const spinner = (
    <PulsatingSpinner
      imageUrl={imageUrl}
      minSize={minSize}
      maxSize={maxSize}
      spinSpeed={spinSpeed}
      pulseSpeed={pulseSpeed}
      onComplete={() => setIsWaiting(false)}
    />
  );

  if (children) {
    return (
      <Suspense fallback={spinner}>{isWaiting ? spinner : children}</Suspense>
    );
  }

  return spinner;
}

