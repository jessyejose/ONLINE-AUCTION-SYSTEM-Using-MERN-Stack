import React, { useState, useEffect } from "react";
import Biddersidebar from "./Biddersidebar";
import Biddernavbar from "./Biddernavbar";
import Clock from "../Clock";
import Alert from "./Alert";
import { Link } from "react-router-dom";

function Bidderhistory({user}) {
  const airway = {
    color: '#00cccc',
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/viewproduct')
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
	  product.BidderName === user.name
    );
  });

  const InvolvedAuction = data.filter((product) => {
	const currentTime = new Date();
	const auctionEndTime = new Date(`${product.AuctionDate}T${product.EndTime}:00`);
  
	return (
	  product.status === 1 &&
	  product.AuctionDate &&
	  product.EndTime &&
	  currentTime > auctionEndTime &&
	  product.bids && product.bids.some((bid) => bid.bidderName === user.name) &&
	  product.BidderName !== user.name
	);
  });

  return (
    <>
      <Biddersidebar user={user}/>
      <div className="content">
        <Biddernavbar user={user}/>

        <Clock />
		<Alert/>

        <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4" style={airway}>Auction History</h3><br/>
			{completedAuctions.length > 0 && (
				<>
					<h4 className="mb-4" style={{ color: 'green' }}>Auction Victory</h4>
					<table className="table table-bordered" style={{ border: '2px solid #00cccc' }}>
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
							<th scope="col">Winner Name</th>
							<th>Action</th>
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
							<td>{product.BidAmount}</td>
							<td>{product.BidderName}</td>
							<td>
								{product.paymentStatus === 'yes' ? (
									<span style={{ color: 'green' }}>Paid</span>
								) : (
									<Link to="/pay" state={{ id: product._id, amount: product.BidAmount }} className="btn btn-primary">
									Pay Now
									</Link>
								)}
							</td>
							</tr>
						))}
						</tbody>
					</table>
				</>
			)}<br/>
			{InvolvedAuction.length > 0 && (
				<>
					<h4 className="mb-4" style={{ color: 'black' }}>Engaged Auction</h4>
					<table className="table table-bordered" style={{ border: '2px solid #00cccc' }}>
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
							<th scope="col">Winner Name</th>
							<th scope="col" style={{color:'red'}}>My Bid</th> 
						</tr>
						</thead>
						<tbody>
						{InvolvedAuction.map((product, index) => (
							<tr key={index}>
							<td>{product.Username}</td>
							<td>{product.ProductName}</td>
							<td>{product.Category}</td>
							<td>{product.Minamount}</td>
							<td>{product.AuctionDate}</td>
							<td>{product.StartTime}</td>
							<td>{product.EndTime}</td>
							<td>{product.BidAmount}</td>
							<td>{product.BidderName}</td>
							<td>
								{product.bids.some((bid) => bid.bidderName === user.name)  &&(
									product.bids.find((bid) => bid.bidderName === user.name).bidAmount
								)}
							</td>
							</tr>
						))}
						</tbody>
					</table>
				</>
			)}
            {completedAuctions.length === 0 && InvolvedAuction.length === 0 && (
				<div style={{ textAlign: 'center', padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '10px', border: '2px solid #f5c6cb', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
					<p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>No auctions History</p>
					<p style={{ fontSize: '16px', color: '#721c24' }}>Check back later for updates.</p>
				</div>
			)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Bidderhistory;
