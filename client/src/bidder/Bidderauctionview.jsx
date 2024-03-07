import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Biddersidebar from "./Biddersidebar";
import Biddernavbar from "./Biddernavbar";
import Clock from "../Clock";
import Alert from "./Alert";
import CountdownTimer from "./CountdownTimer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bidderauctionview({ user }) {
  const location = useLocation();
  const [data, setData] = useState({ Images: [] });
  const [bidAmount, setBidAmount] = useState(0);
  const [bidError, setBidError] = useState("");
  const [auctionResult, setAuctionResult] = useState(null);

  const airway = {
    color: '#00cccc',
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/viewproductbyid`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: location.state.id }),
      });

      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.state.id,auctionResult]);

  const submitBid = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/submitbid/${location.state.id}/${bidAmount}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bidderName: user.name }),
      });

      const result = await response.json();

      if (result.success) {
		toast.success(`Bid amount of Rs.${bidAmount} submitted successfully`, {
			position: 'top-right',
			autoClose: 2000,
		});
        console.log('Bid submitted successfully');
        fetchData();
		setBidAmount(0)
		setBidError('')
      } else {
        setBidError(result.message);
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  useEffect(() => {
    if (data.EndTime && data.BidderName) {
      const timer = setInterval(() => {
        const now = new Date();
        const endTime = new Date(`${data.AuctionDate} ${data.EndTime}`);

        if (now > endTime) {
          if (user.name === data.BidderName || !data.BidderName) {
			setAuctionResult('Congratulations! You are the winner!');
		  } else {
			setAuctionResult(`The winner is ${data.BidderName}`);
		  }
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data, user]);

  return (
    <>
      <Biddersidebar user={user} />
      <div className="content">
        <Biddernavbar user={user} />
        <Clock />
        <Alert />

        <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4" style={airway}>
              Active Product Details
            </h3>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <b style={airway}>Product Name:</b>
                  {data.ProductName}
                </p>
                <p>
                  <b style={airway}>Description: </b>
                  {data.Description}
                </p>
                <p>
                  <b style={airway}>Manufacturing Date:</b> {data.Date}
                </p>
                <p>
                  <b style={airway}>Category:</b> {data.Category}
                </p>
                <p>
                  <b style={airway}>Seller Name:</b> {data.Username}
                </p>
                <p>
                  <b style={airway}>Minimum Bid Amount: </b>
                  {data.Minamount}
                </p>
                {data.BidAmount && (
                  <p>
                    <b style={airway}>Bid Amount: </b>
                    {data.BidAmount}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <Carousel interval={1000}>
                  {data.Images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        style={{ width: '300px', height: '300px' }}
                        src={`http://localhost:4000/${image}`}
                        alt={`Slide ${index}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        
		<div className="col-sm-12 col-xl-12" style={{ margin: '5px' }}>
			<div className="bg-light rounded h-100 p-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				{auctionResult ? (
					<>
						<p style={{ fontSize: '20px', fontWeight: 'bold',marginRight:'15px' }}>{auctionResult}</p>
						{auctionResult === "Congratulations! You are the winner!" 
							&& ( <Link to="/pay" state={{ id: data._id  ,amount:data.BidAmount}} >Pay Now</Link>)
						}
					</>
				) : (
				<form onSubmit={submitBid}>
					<label htmlFor="bidAmount">
					<b style={airway}>
						<span style={{ fontSize: '25px', marginRight: '20px' }}>Enter Bid Amount:</span>
					</b>
					</label>
					<input
					type="number"
					id="bidAmount"
					value={bidAmount}
					onChange={(e) => setBidAmount(e.target.value)}
					required
					style={{ border: '2px solid #00cccc', height: '35px ' }}
					/>
					<button type="submit" style={{ backgroundColor: '#00cccc', border: 'none', height: '35px' }}>
					Submit Bid
					</button>
					{bidError && <p style={{ color: 'red' }}>{bidError}</p>}
				</form>
				)}
			</div>
		</div>

		<div className="bg-light rounded h-100 p-4" style={{ margin: '5px' }}>
			<div style={{display:'flex',justifyContent:'space-between'}}>
				<h3 className="mb-4" style={airway}>Bidding Status</h3>
				<CountdownTimer startTime={data.StartTime} endTime={data.EndTime} />
			</div>
			{data.bids && data.bids.length > 0 ? (
				<table className="table table-bordered" style={{ border: '2px solid #00cccc' }}>
				<thead style={airway}>
					<tr>
					<th scope="col">S.No</th>
					<th scope="col">Bidder Name</th>
					<th scope="col">Bid Amount</th>
					</tr>
				</thead>
				<tbody>
					{data.bids.map((bid, index) => (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{bid.bidderName}</td>
						<td>{bid.bidAmount}</td>
					</tr>
					))}
				</tbody>
				</table>
			) : (
				<div style={{ textAlign: 'center', padding: '20px', background: '#F0FFFF', color: '#721c24', borderRadius: '10px', border: '2px solid #ADD8E6', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
					<p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>No bids yet.</p>
					<p style={{ fontSize: '16px', color: '#721c24' }}><b>Start bidding</b></p>
				</div>
			)}
			<div>
				<Link to="/bidderactiveauction">Back</Link>
			</div>
		</div>


        <Clock />
      </div>
    </>
  );
}

export default Bidderauctionview;


