import React,{useEffect,useState} from "react";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock"; 
import Alert from "./Alert";
import { Link } from 'react-router-dom'; 
import Port from "../Port";
function Admin() {
	const airway = {
		color: '#880085',
		
	};
	const [data, setData] = useState([]);
	const [currentTime, setCurrentTime] = useState(new Date());
  
	useEffect(() => {
	  fetch(`${Port}/viewproduct`)
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
	  if (product.status === 1 && product.AuctionDate && product.StartTime && product.EndTime) {
		const auctionStartTime = new Date(`${product.AuctionDate}T${product.StartTime}:00`);
		const auctionEndTime = new Date(`${product.AuctionDate}T${product.EndTime}:00`);
  
		return currentTime >= auctionStartTime && currentTime <= auctionEndTime;
	  }
  
	  return false;
	});

	const upcomingAuctions = data.filter((product) => {
		const currentTime = new Date();
		const auctionStartTime = new Date(`${product.AuctionDate}T${product.StartTime}:00`);
		return (
		  product.status === 1 &&
		  product.AuctionDate &&
		  currentTime < auctionStartTime
		);
	  });

	  const completedAuctions = data.filter((product) => {
		const currentTime = new Date();
		const auctionEndTime = new Date(`${product.AuctionDate}T${product.EndTime}:00`);
		return (
		  product.status === 1 &&
		  product.AuctionDate &&
		  product.EndTime &&
		  currentTime > auctionEndTime && product.BidAmount && product.BidderName
		);
	  });

	  const pendingItems = data.filter(item => item.status === undefined);

  const scheduledAuction = data.filter((value) => value.status === 1 && !value.AuctionDate);
  const rescheduledAuctions = data.filter((value) => value.AuctionDate  && !value.BidAmount);



    return (
        <>
            <Adminsidebar />
            <div class="content">
                <Adminnavbar />
				
				
				<div class="container-fluid pt-4 px-4" >
					<div class="row g-4">
						
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
								<Link to='/adminactiveauction' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
							</div>
						</div>
						
						<div class="col-sm-12 col-xl-6 alert alert-success">
							<div class='bg-light rounded h-100 p-4'>
								<h6 class="mb-4 text-center" style={{...airway,fontSize:'22px'}}> 
									<div style={{ display: 'inline-block', position: 'relative' }}>
										Upcoming Auction
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
								<Link to='/adminupcoming' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
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
											<p><b>Minimum Bid Amount:</b> {auction.Minamount}</p>
											<p><b>Bid Amount:</b> {auction.BidAmount}</p>
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
							<Link to='/admincompleted' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
							</div>
						</div>

						<div class="col-sm-12 col-xl-6 alert alert-danger">
							<div class='bg-light rounded h-100 p-4'>
								<h6 class="mb-4 text-center"  style={{...airway,fontSize:'22px'}}>
									<div style={{ display: 'inline-block', position: 'relative' }}>
										Pending Auction
										{pendingItems.length > 0 && (
											<div style={{ position: 'absolute', top: '-1px', left: '103%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
												{pendingItems.length}
											</div>
										)}
									</div>
								</h6>
								{pendingItems.length > 0 ? (
								<div className="d-flex flex-wrap">
									{pendingItems.slice(0, 2).map((auction, index) => (
									<div key={index} className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box">
										<div className="d-flex align-items-center">
										{auction.Images && auction.Images.length > 0 && (
											<img src={`http://localhost:4000/${auction.Images[0]}`} alt={auction.ProductName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
										)}
										<div className="auction-details ms-3">
											<h5>{auction.ProductName}</h5>
											<p><b>Minimum Bid Amount:</b> {auction.Minamount}</p>
											<p><b>Seller Name:</b> {auction.Username}</p>
										</div>
										</div>
									</div>
									))}
								</div>
								) : (
								  <div className="d-flex flex-column align-items-center border rounded p-3 m-2 border-2 auction-box">
									<p className="text-muted mb-3">No Pending Product for Approval</p>
									<p className="text-center">Explore other sections or check back later for updates.</p>
								  </div>
								)}
								<Link to='/adminpendingproduct' className="position-absolute bottom-0 end-0 p-4">See more</Link>
							</div>
						</div>

						<div class="col-sm-12 col-xl-6 alert alert-warning">
							<div class="bg-light rounded h-100 p-4">
								<h6 class="mb-4 text-center" style={{...airway,fontSize:'22px'}}>
								<div style={{ display: 'inline-block', position: 'relative' }}>
									{scheduledAuction.length > 1 ? (
									<>
										Schedule Auctions
										<div style={{ position: 'absolute', top: '-1px', left: '103%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
										{scheduledAuction.length}
										</div>
									</>
									) : (
									<>
										{scheduledAuction.length === 1 ? (
										<>
											Schedule and Reschedule Auctions
											<div style={{ position: 'absolute', top: '-1px', left: '103%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
											{scheduledAuction.length + rescheduledAuctions.length}
											</div>
										</>
										) : (
										<>
											Reschedule Auctions
											{rescheduledAuctions.length > 0 && (
											<div style={{ position: 'absolute', top: '-1px', left: '103%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
												
												{rescheduledAuctions.length}
											</div>
											)}
										</>
										)}
									</>
									)}
								</div>
								</h6>
								{scheduledAuction.length > 0 ? (
								<div className="d-flex flex-wrap">
									{scheduledAuction.slice(0, 2).map((auction, index) => (
									<div key={index} className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box">
										<div className="d-flex align-items-center">
										{auction.Images && auction.Images.length > 0 && (
											<img src={`http://localhost:4000/${auction.Images[0]}`} alt={auction.ProductName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
										)}
										<div className="auction-details ms-3">
											<h5>{auction.ProductName}</h5>
											<p><b>Minimum Bid Amount:</b> {auction.Minamount}</p>
											<p><b>Seller Name:</b> {auction.Username}</p>
										</div>
										</div>
									</div>
									))}
									{scheduledAuction.length === 1 && rescheduledAuctions.length > 0 && (
									<div className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box">
										<div className="d-flex align-items-center">
										{rescheduledAuctions[0].Images && rescheduledAuctions[0].Images.length > 0 && (
											<img src={`http://localhost:4000/${rescheduledAuctions[0].Images[0]}`} alt={rescheduledAuctions[0].ProductName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
										)}
										<div className="auction-details ms-3">
											<h5>{rescheduledAuctions[0].ProductName}</h5>
											<p><b>Minimum Bid Amount:</b> {rescheduledAuctions[0].Minamount}</p>
											<p><b>Seller Name:</b> {rescheduledAuctions[0].Username}</p>
										</div>
										</div>
									</div>
									)}
								</div>
								) : (
								<div className="d-flex flex-wrap">
									{rescheduledAuctions.slice(0, 2).map((auction, index) => (
									<div key={index} className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box">
										<div className="d-flex align-items-center">
										{auction.Images && auction.Images.length > 0 && (
											<img src={`http://localhost:4000/${auction.Images[0]}`} alt={auction.ProductName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
										)}
										<div className="auction-details ms-3">
											<h5>{auction.ProductName}</h5>
											<p><b>Minimum Bid Amount:</b> {auction.Minamount}</p>
											<p><b>Seller Name:</b> {auction.Username}</p>
										</div>
										</div>
									</div>
									))}
								</div>
								)}
								<Link to='/adminschedulelist' className="position-absolute bottom-0 end-0 p-4">See more</Link>
							</div>
						</div>


					</div>
		        </div>

				<Clock /> 
				<Alert/> 
			</div>
                
        </>
    );
}

export default Admin;
