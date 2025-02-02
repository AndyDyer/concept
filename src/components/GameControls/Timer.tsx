import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onTimeUp();
    }
  }, [time, onTimeUp]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold">Time Remaining: {time}s</h2>
    </div>
  );
};

export default Timer;