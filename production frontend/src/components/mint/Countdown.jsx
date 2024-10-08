import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Countdown({ targetDate }) {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the remaining time
      const now = new Date();
      const target = new Date(targetDate);

      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
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

Countdown.propTypes = {
  targetDate: PropTypes.string.isRequired, // Adjust type as necessary
};
