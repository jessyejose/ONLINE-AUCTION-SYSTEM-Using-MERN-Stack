import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountdownTimer = ({ startTime, endTime }) => {
  const calculateTimeRemaining = () => {
    if (!startTime || !endTime) {
      console.error('Invalid startTime or endTime');
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    const currentDate = new Date(); 

    const startDateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${startTime}`;
    const endDateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${endTime}`;

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    console.log('Now:', currentDate);
    console.log('StartDate:', startDate);
    console.log('EndDate:', endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid startDate or endDate format');
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    if (currentDate < startDate) {
      const remainingTime = startDate - currentDate;

      const seconds = Math.floor((remainingTime / 1000) % 60);
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      return { hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds };
    }

    let remainingTime = endDate - currentDate;

    if (remainingTime <= 0) {
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return { hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime,endTime]);

  return (
    <div>
      <p >
        <b style={{fontSize:'20px',color:'#cc0000'}}>Time Remaining:</b><em style={{fontSize:'20px',color:'red'}}> {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}</em>
      </p>
    </div>
  );
};

CountdownTimer.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
};

export default CountdownTimer;
