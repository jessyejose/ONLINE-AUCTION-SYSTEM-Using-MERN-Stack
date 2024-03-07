import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sellersidebar from "./Sellersidebar";
import Sellernavbar from "./Sellernavbar";
import Clock from "../Clock";
import Alert from "./Alert";

function Sellerupcoming({user}) {
  const airway = {
    color: '#28A745',
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/viewproduct')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const upcomingAuctions = data.filter((product) => {
    const currentTime = new Date();
    const auctionStartTime = new Date(`${product.AuctionDate}T${product.StartTime}:00`);
    return (
      product.status === 1 &&
      product.AuctionDate &&
      currentTime < auctionStartTime &&
      product.Username === user.name
    );
  });

  return (
    <>
      <Sellersidebar user={user} />
      <div className="content">
        <Sellernavbar user={user} />
        <Clock />

        <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
          <div className="bg-light rounded p-4">
            <h3 className="mb-4" style={airway}>Upcoming Auctions</h3>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {upcomingAuctions.map((product, index) => (
                <div key={index} className="col">
                  <div className="card h-100">
                      <div className="text-center">
                        <img src={`http://localhost:4000/${product.Images[0]}`} className="card-img-top mx-auto mt-3" alt="Product" style={{ width: '200px', height: '200px'}} />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.ProductName}</h5>
                        <p className="card-text"><b>Description:</b> {product.Description}</p>
                        <p className="card-text"><b>Category:</b> {product.Category}</p>
                        <p className="card-text"><b>Minimum Bid Amount:</b> {product.Minamount}</p>
                        <p className="card-text"><b>Auction Date:</b> {product.AuctionDate}</p>
                        <p className="card-text"><b>Start and End Time:</b> {product.StartTime} - {product.EndTime}</p>
                      </div>
                    </div>
                </div>
              ))}
            </div>
            {upcomingAuctions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '10px', border: '2px solid #f5c6cb', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>No upcoming auctions</p>
                <p style={{ fontSize: '16px', color: '#721c24' }}>Check back later for updates.</p>
              </div>
            )}
          </div>
        </div>
		<Alert user={user} />
      </div>
    </>
  );
}

export default Sellerupcoming;





