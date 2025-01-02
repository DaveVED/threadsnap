"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";

interface ThreadUnrollSuspenseSpinnerProps {
  children?: React.ReactNode;
  imageUrl?: string;
  waitTime?: number; // in milliseconds
}

const SpinningImage = ({
  imageUrl,
  onComplete,
}: {
  imageUrl: string;
  onComplete: () => void;
}) => {
  const [size, setSize] = useState(100);
  const [isGrowing, setIsGrowing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSize((prevSize) => {
        if (prevSize >= 120) setIsGrowing(false);
        if (prevSize <= 80) setIsGrowing(true);
        return isGrowing ? prevSize + 1 : prevSize - 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isGrowing]);

  return (
    <div className="flex h-40 items-center justify-center">
      <div
        className="animate-spin transition-all duration-300 ease-in-out"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
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
};

export function ThreadUnrollSuspenseSpinner({
  children,
  imageUrl = "/default-spinner.jpg",
  waitTime = 0,
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
    <SpinningImage imageUrl={imageUrl} onComplete={() => setIsWaiting(false)} />
  );

  if (children) {
    return (
      <Suspense fallback={spinner}>{isWaiting ? spinner : children}</Suspense>
    );
  }

  return spinner;
}
