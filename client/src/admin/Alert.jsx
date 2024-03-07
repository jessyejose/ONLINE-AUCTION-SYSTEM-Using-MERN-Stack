import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Port from "../Port";

function Alert() {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAlert, hideAlert] = useState(false);

  useEffect(() => {
    fetch(`${Port}/viewproduct`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const activeAuctions = data.filter((product) => {
      if (product.status === 1 && product.AuctionDate && product.StartTime && product.EndTime) {
        const auctionStartTime = new Date(`${product.AuctionDate}T${product.StartTime}:00`);
        const auctionEndTime = new Date(`${product.AuctionDate}T${product.EndTime}:00`);

        return currentTime >= auctionStartTime && currentTime <= auctionEndTime;
      }

      return false;
    });

    hideAlert(activeAuctions.length > 0);

  }, [data, currentTime]);

  useEffect(() => {
    if (showAlert) {
      const intervalId = setInterval(() => {
        hideAlert((prevShowAlert) => !prevShowAlert);
      }, 1000); 
      return () => clearInterval(intervalId);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <Link to="/adminactiveauction" onClick={hideAlert}>
          <div
            style={{
				position: 'fixed',
				top: '70px',
				right: '10px',
				backgroundColor: '#880085',
				color: 'white',
				padding: '10px',
				borderRadius: '50%',
				zIndex: '1000',
            }}
          >
            Active<br/> Auction 
          </div>
        </Link>
      )}
    </>
  );
}

export default Alert;

