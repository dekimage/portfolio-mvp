"use client";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ timeLeft: initialTimeLeft, onlyNumbers }) => {
  const calculateTimeLeft = () => {
    // Using "initialTimeLeft" to avoid shadowing the "timeLeft" prop
    const difference = initialTimeLeft - Date.now();
    let timeRemaining = {};

    if (difference > 0) {
      timeRemaining = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeRemaining;
  };

  const [countdown, setCountdown] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => {
    // Ensure that time is always two digits
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="font-mono text-lg text-center p-4 bg-gray-800 text-white rounded-lg">
      {countdown.days !== undefined ? (
        <>
          {onlyNumbers ? (
            <div>
              {formatTime(countdown.days)}:{formatTime(countdown.hours)}:
              {formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
            </div>
          ) : (
            <div>
              {formatTime(countdown.days)}D:{formatTime(countdown.hours)}H:
              {formatTime(countdown.minutes)}M:{formatTime(countdown.seconds)}S
            </div>
          )}
        </>
      ) : (
        <div>Time`s up!</div>
      )}
    </div>
  );
};

export default CountdownTimer;
