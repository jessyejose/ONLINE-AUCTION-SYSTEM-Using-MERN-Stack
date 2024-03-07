import React, { useEffect, useState } from 'react';
import Sellersidebar from "./Sellersidebar";
import Sellernavbar from "./Sellernavbar";
import { Link } from 'react-router-dom';
import Clock from "../Clock";
import Alert from './Alert';

function Seller ({ user }) {

	const airway = {
		color: '#28A745',
		
	}
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetch('http://localhost:4000/viewproduct')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log("Fetched data:", result);
      });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

	const activeAuctions = data.filter((product) => {
		if (product.status === 1 && product.AuctionDate && product.StartTime && product.EndTime && product.Username===user.name) {
		  const auctionStartTime = new Date(`${product.AuctionDate}T${product.StartTime}:00`);
		  const auctionEndTime = new Date(`${product.AuctionDate}T${product.EndTime}:00`);
	
		  return (
			currentTime >= auctionStartTime &&
			currentTime <= auctionEndTime 
		  );
		}
	
		return false;
	});

	const upcomingAuctions = data.filter((product) => {
		const currentTime = new Date();
		const auctionStartTime = new Date(`${product.AuctionDate}T${product.StartTime}:00`);
		return (
		  product.status === 1 &&
		  product.AuctionDate &&
		  currentTime < auctionStartTime &&
		  product.Username===user.name
		);
	  });
	
	  const completedAuctions = data.filter((product) => {
		const currentTime = new Date();
		const auctionEndTime = new Date(`${product.AuctionDate}T${product.EndTime}:00`);
		return (
		  product.status === 1 &&
		  product.AuctionDate &&
		  product.EndTime &&
		  currentTime > auctionEndTime &&
		  product.Username === user.name &&
		  product.BidAmount && product.BidderName
		);
	  });

  return (
    <>
      <Sellersidebar user={user} />
      <div className="content">
        <Sellernavbar user={user} />
		<div class="container-fluid pt-4 px-4">
			<header style={{ textAlign:'center',marginBottom:'30px', padding: '20px',background:'linear-gradient(to right, #f8f8f8, #e6e6e6)',  borderRadius: '10px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' }}>
				<h1 style={{ fontSize: '3rem', color: '#ff9933', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Welcome, {user.name}!</h1>
				<p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '20px' }}>
					Dive into the world of selling at AuctionElite. Showcase your unique products and engage with potential buyers. Experience the satisfaction of successful auctions and the joy of connecting your treasures with new owners.
				</p>
				<p style={{ fontSize: '1.2rem', color: '#777', marginTop: '20px' }}>
					Selling responsibly is crucial. Keep track of auction details and ensure your items are accurately represented. Embark on this journey with confidence, and may every auction be a success. Happy Selling!
				</p>
			</header>
			
			<div class="row g-4">
				<div class="col-sm-12 col-xl-6 alert alert-primary">
					<div class='bg-light rounded h-100 p-4'>
						<h4 class="mb-4 text-center" style={{...airway,fontSize:'22px'}}>Auctioner Profile</h4>
						<div class='text-center'>
							
							<img
								className="rounded-circle me-lg-2"
								src={user.image  ?`http://localhost:4000/${user.image}`  : "/gi.jpg"}
								alt=""
								style={{ width: '100px', height: '100px' }}
							/>
						</div><br/>
						<p class='text-center'><b>Name:</b>{user.name}</p>
						<p class='text-center'><b>Email:</b>{user.email}</p>
						<a href='/sellerprofileview' class='stretched-link'> </a>

					</div>
				</div>
				
				<div class="col-sm-12 col-xl-6 alert alert-success">
					<div class='bg-light rounded h-100 p-4'>
						<h6 className="mb-4 text-center" style={{...airway,fontSize:'22px'}}>									
							<div style={{ display: 'inline-block', position: 'relative' }}>
								Auction History
								{completedAuctions.length > 0 && (
									<div style={{ position: 'absolute', top: '-1px', left: '103%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
										{completedAuctions.length}
									</div>
								)}
							</div>									
						</h6>
						{completedAuctions.length > 0 ? (
							<div className="d-flex flex-wrap">
								{completedAuctions.slice(0, 2).map((auction, index) => (
								<div key={index} className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box">
									<div className="d-flex align-items-center">
									{auction.Images && auction.Images.length > 0 && (
										<img src={`http://localhost:4000/${auction.Images[0]}`} alt={auction.ProductName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
									)}
									<div className="auction-details ms-3">
										<h5>{auction.ProductName}</h5>
										<p><b>Bid Amount:</b> {auction.BidAmount}</p>
										<p><b>Bidder Name:</b> {auction.BidderName}</p>
									</div>
									</div>
								</div>
								))}
							</div>
							) : (
							<div className="d-flex flex-column align-items-center border rounded p-3 m-2 border-2 auction-box">
								<p className="text-muted mb-3">No auctions history</p>
								<p className="text-center">Explore other sections or check back later for updates.</p>
							</div>
						)}
						<Link to='/sellerhistory' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
					</div>
				</div>
			
				<div class="col-sm-12 col-xl-6 alert alert-primary">
					<div class='bg-light rounded h-100 p-4'>
						<h6 className="mb-4 text-center" style={{...airway,fontSize:'22px'}}>									
							<div style={{ display: 'inline-block', position: 'relative' }}>
								Active Auctions
								{activeAuctions.length > 0 && (
									<div style={{ position: 'absolute', top: '-1px', left: '103%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
										{activeAuctions.length}
									</div>
								)}
							</div>									
						</h6>
						{activeAuctions.length > 0 ? (
							<div className="d-flex flex-wrap">
								{activeAuctions.slice(0, 2).map((auction, index) => (
								<div key={index} className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box">
									<div className="d-flex align-items-center">
									{auction.Images && auction.Images.length > 0 && (
										<img src={`http://localhost:4000/${auction.Images[0]}`} alt={auction.ProductName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
									)}
									<div className="auction-details ms-3">
										<h5>{auction.ProductName}</h5>
										<p><b>Auction Date:</b> {auction.AuctionDate}</p>
										<p><b>Minimum Bid Amount:</b> {auction.Minamount}</p>
									</div>
									</div>
								</div>
								))}
							</div>
							) : (
							<div className="d-flex flex-column align-items-center border rounded p-3 m-2 border-2 auction-box">
								<p className="text-muted mb-3">No active auctions</p>
								<p className="text-center">Explore other sections or check back later for updates.</p>
							</div>
						)}
						<Link to='/selleractiveauction' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
					</div>
				</div>

				<div class="col-sm-12 col-xl-6 alert alert-info">
					<div class='bg-light rounded h-100 p-4'>
						<h6 class="mb-4 text-center"  style={{...airway,fontSize:'22px'}}>
							<div style={{ display: 'inline-block', position: 'relative' }}>
								Upcoming items to be auctioned
								{upcomingAuctions.length > 0 && (
									<div style={{ position: 'absolute', top: '-1px', left: '103%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
										{upcomingAuctions.length}
									</div>
								)}
							</div>
						</h6>
						{upcomingAuctions.length > 0 ? (
							<div className="d-flex flex-wrap">
								{upcomingAuctions.slice(0, 2).map((auction, index) => (
								<div key={index} className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box">
									<div className="d-flex align-items-center">
									{auction.Images && auction.Images.length > 0 && (
										<img src={`http://localhost:4000/${auction.Images[0]}`} alt={auction.ProductName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
									)}
									<div className="auction-details ms-3">
										<h5>{auction.ProductName}</h5>
										<p><b>Auction Date:</b> {auction.AuctionDate}</p>
										<p><b>Minimum Bid Amount:</b> {auction.Minamount}</p>
									</div>
									</div>
								</div>
								))}
							</div>
							) : (
								<div className="d-flex flex-column align-items-center border rounded p-3 m-2 border-2 auction-box">
								<p className="text-muted mb-3">No upcoming auctions</p>
								<p className="text-center">Explore other sections or check back later for updates.</p>
								</div>
						)}
						<Link to='/sellerupcoming' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
					</div>
				</div>
			</div>
		</div> 
		<Clock/>
		<Alert user={user}/>

      </div>
    </>
  );
};

export default Seller;
