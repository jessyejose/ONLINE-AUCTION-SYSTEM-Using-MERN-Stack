import React, { useState, useEffect } from "react";
import Sellersidebar from "./Sellersidebar";
import Sellernavbar from "./Sellernavbar";
import Clock from "../Clock";
import Alert from "./Alert";

function Sellerhistory({ user }) {
  const airway = {
    color: '#28A745',
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/viewproduct')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log("Fetched data:", result);
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
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4" style={airway}> Auction History</h3>
            {completedAuctions.length > 0 ? (
              <>
                <h4>Successful Bidding</h4>
                <table className="table table-bordered" style={{ border: '2px solid #28A745' }}>
                  <thead style={airway}>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Minimum Bid Amount</th>
                      <th scope="col">Auction Date</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                      <th scope="col">Bid Amount</th>
                      <th scope="col">Bidder Name</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedAuctions.map((product, index) => (
                      product.BidAmount && product.BidderName ? (
                        <tr key={index}>
                          <td>{product.ProductName}</td>
                          <td>{product.Category}</td>
                          <td>{product.Minamount}</td>
                          <td>{product.AuctionDate}</td>
                          <td>{product.StartTime}</td>
                          <td>{product.EndTime}</td>
                          <td>{product.BidAmount}</td>
                          <td>{product.BidderName}</td>
                          <td style={{ color: '#294B29' }}><b>Successful</b></td>
                        </tr>
                      ) : null
                    ))}
                  </tbody>
                </table>

                {completedAuctions.every((product) => !product.BidAmount && !product.BidderName) ? null : (
					<>
                   <h4>Failed Bid</h4>
                  <table className="table table-bordered" style={{ border: '2px solid #28A745', marginTop: '20px' }}>
                    <thead style={airway}>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Minimum Bid Amount</th>
                        <th scope="col">Auction Date</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Bid Amount</th>
                        <th scope="col">Bidder Name</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedAuctions.map((product, index) => (
                        !product.BidAmount && !product.BidderName ? (
                          <tr key={index}>
                            <td>{product.ProductName}</td>
                            <td>{product.Category}</td>
                            <td>{product.Minamount}</td>
                            <td>{product.AuctionDate}</td>
                            <td>{product.StartTime}</td>
                            <td>{product.EndTime}</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td style={{ color: 'red' }}>No Bids</td>
                          </tr>
                        ) : null
                      ))}
                    </tbody>
                  </table>
				  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '10px', border: '2px solid #f5c6cb', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>No auctions History</p>
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

export default Sellerhistory;


