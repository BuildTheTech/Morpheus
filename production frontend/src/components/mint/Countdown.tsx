import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the remaining time
      const now = Date.now();
      const target = targetDate.getTime();

      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining(` ${hours}h:${minutes}m:${seconds}s`);
      } else {
        setTimeRemaining("00h:00m:0s");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <span>{timeRemaining}</span>;
}
