import React, { useState, useEffect } from "react";
import "./Timer.css"


const Timer = () => {
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [isCounting, setIsCounting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      startCountdown();
    }
  };

  const startCountdown = () => {
    setIsCounting(true);
    setIsFinished(false);
    const totalSeconds = time.minutes * 60;
    let remainingSeconds = totalSeconds;

    const countdownInterval = setInterval(() => {
      remainingSeconds--;
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingSecondsFormatted = remainingSeconds % 60;

      setTime({
        minutes: remainingMinutes,
        seconds: remainingSecondsFormatted,
      });

      if (remainingSeconds === 0) {
        clearInterval(countdownInterval);
        setIsCounting(false);
        setIsFinished(true);
      }
    }, 1000);
  };

  useEffect(() => {
    if (isFinished) {
    }
  }, [isFinished]);

  return (
    <div className="timer__container">

<input
  type="number"
  defaultValue={time.minutes} 
  min={0}
  onChange={(event) => setTime({ ...time, minutes: parseInt(event.target.value) })}
  onKeyDown={handleKeyPress}
/>

      {isCounting && (
        <div className="timer__countdown">
          Осталось времени: {time.minutes} минут {time.seconds} секунд
        </div>  
      )}

      {isFinished && (
        <div className="timer__finished">
          Готово
        </div>
      )}

    </div>
  );
}

export default Timer;
