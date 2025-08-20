"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2025-08-31T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const calculateTime = (ms: number) => {
    if (ms <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = calculateTime(timeLeft);

  return (
    <div className="flex flex-col items-center font-playfair gap-6 w-fit">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <span className="text-6xl lg:text-8xl">{days}</span>
          <span className="text-lg mt-4">hari</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-6xl lg:text-8xl">:</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-6xl lg:text-8xl">{hours.toString().padStart(2, "0")}</span>
          <span className="text-lg mt-4">jam</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-6xl lg:text-8xl">:</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-6xl lg:text-8xl">
            {minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-lg mt-4">menit</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-6xl lg:text-8xl">:</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-6xl lg:text-8xl">
            {seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-lg mt-4">detik</span>
        </div>
      </div>
    </div>
  );
}
