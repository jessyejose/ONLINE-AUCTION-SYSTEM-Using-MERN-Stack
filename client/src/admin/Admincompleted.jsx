import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock";
import Alert from "./Alert";
import Port from "../Port";

function Admincompletedauction() {
  const airway = {
    color: '#880085',
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${Port}/viewproduct`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const completedAuctions = data.filter((product) => {
    const currentTime = new Date();
    const auctionEndTime = new Date(`${product.AuctionDate}T${product.EndTime}:00`);
    return (
      product.status === 1 &&
      product.AuctionDate &&
      product.EndTime &&
      currentTime > auctionEndTime &&
      product.BidAmount &&
      product.BidderName
    );
  });

  const rescheduleProducts = data.filter((product) => {
    const currentTime = new Date();
    const auctionEndTime = new Date(`${product.AuctionDate}T${product.EndTime}:00`);
    return (
      product.status === 1 &&
      product.AuctionDate &&
      product.EndTime &&
      currentTime > auctionEndTime &&
      (!product.BidAmount || !product.BidderName)
    );
  });

  return (
    <>
      <Adminsidebar />
      <div className="content">
        <Adminnavbar />

        <Clock />
        <Alert />

        <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4" style={airway}>Auction History</h3>

            {completedAuctions.length > 0 && (
              <div>
                <h4>Victorious Auctions</h4>
                <table className="table table-bordered" style={{ border: '2px solid #880085' }}>
                  <thead style={airway}>
                    <tr>
                      <th scope="col">Seller Name</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Minimum Bid Amount</th>
                      <th scope="col">Auction Date</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                      <th scope="col">Bid Amount</th>
                      <th scope="col">Bidder Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedAuctions.map((product, index) => (
                      <tr key={index}>
                        <td>{product.Username}</td>
                        <td>{product.ProductName}</td>
                        <td>{product.Category}</td>
                        <td>{product.Minamount}</td>
                        <td>{product.AuctionDate}</td>
                        <td>{product.StartTime}</td>
                        <td>{product.EndTime}</td>
                        <td>{product.BidAmount || 'N/A'}</td>
                        <td>{product.BidderName || 'N/A'}</td>
                        <td>
                          {product.BidAmount && product.BidderName ? (
                            <span style={{ color: 'green' }}>Successfully</span>
                          ) : (
                            <Link to="/schedulesingleproduct" state={{ id: product._id }} style={{ background: '#007bff', color: 'white', padding: '7px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>Reschedule</Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {rescheduleProducts.length > 0 && (
              <div>
                <h4>Silent Auction</h4>
                <table className="table table-bordered" style={{ border: '2px solid #880085' }}>
                  <thead style={airway}>
                    <tr>
                      <th scope="col">Seller Name</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Minimum Bid Amount</th>
                      <th scope="col">Auction Date</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rescheduleProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.Username}</td>
                        <td>{product.ProductName}</td>
                        <td>{product.Category}</td>
                        <td>{product.Minamount}</td>
                        <td>{product.AuctionDate}</td>
                        <td>{product.StartTime}</td>
                        <td>{product.EndTime}</td>
                        <td>
                          <Link to="/schedulesingleproduct" state={{ id: product._id }} style={{ background: '#007bff', color: 'white', padding: '7px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>Reschedule</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {completedAuctions.length === 0 && rescheduleProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '10px', border: '2px solid #f5c6cb', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>No completed auctions or reschedule products</p>
                <p style={{ fontSize: '16px', color: '#721c24' }}>Check back later for updates.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admincompletedauction;



