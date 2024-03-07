import React,{useState,useEffect} from 'react';
import Biddersidebar from "./Biddersidebar";
import Biddernavbar from "./Biddernavbar";
import Clock from "../Clock";
import Alert from './Alert';
import { Link } from 'react-router-dom';


const Bidder = ({ user }) => {
	const airway = {
		color: '#00cccc',
		
	};
	const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [users, setUser] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/viewprofile')
			.then((res) => res.json())
			.then((result) => {
				setUser(result);
			});
	}, []);
    const filteredData = users.filter((value) => value._id=== user._id);

  useEffect(() => {
    fetch('http://localhost:4000/viewproduct')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
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
      currentTime > auctionEndTime &&
	  product.BidderName === user.name
    );
  });
  return (
	<>

		<Biddersidebar user={user}/>

		<div class="content">
			<Biddernavbar user={user}/>
			<div class="container-fluid pt-4 px-4">
			<header style={{ textAlign:'center',marginBottom:'30px', padding: '20px',background:'linear-gradient(to right, #f8f8f8, #e6e6e6)',  borderRadius: '10px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' }}>
				<h1 style={{ fontSize: '3rem', color: '#00cccc', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Welcome, {user.name}!</h1>
				<p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '20px' }}>
				Immerse yourself in the exhilarating world of auctions at AuctionElite. Discover an array of captivating items, ranging from rare collectibles to exquisite artworks. Unleash the power of strategic bidding, and experience the heart-pounding thrill of claiming one-of-a-kind treasures as your own!
				</p>
				<p style={{ fontSize: '1.2rem', color: '#777', marginTop: '20px' }}>
				At AuctionElite, bidding responsibly is our guiding principle. Stay well-informed about auction timelines and delve into the details of each item. Navigate the exciting journey of auctions with confidence, and may every bid bring you closer to the joy of winning. Happy Bidding!
				</p>
			</header>

			<div class="row g-4">
				<div class="col-sm-12 col-xl-6 alert alert-primary">
					<div class='bg-light rounded h-100 p-4'>
						<h4 class="mb-4 text-center" style={airway}>Bidder Profile</h4>
						<div class='text-center'>
							
							<img
								className="rounded-circle me-lg-2"
								src={filteredData[0]?.image ? `http://localhost:4000/${filteredData[0].image}` : "/gi.jpg"}
								alt=""
								style={{ width: '100px', height: '100px' }}
							/>
						</div><br/>
						<p class='text-center'><b>Name:</b>{user.name}</p>
						<p class='text-center'><b>Email:</b>{user.email}</p>
						<a href='/bidderprofileview' class='stretched-link'> </a>

					</div>
				</div>
				
				<div class="col-sm-12 col-xl-6 alert alert-success">
					<div class='bg-light rounded h-100 p-4'>
						<h6 className="mb-4 text-center" style={{...airway,fontSize:'22px'}}>									
							<div style={{ display: 'inline-block', position: 'relative' }}>
								Auction History
								{completedAuctions.length > 0 && (
								<div style={{ position: 'absolute', top: '-1px', left: '105%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
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
						<Link to='/bidderhistory' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
					</div>
				</div>

				<div class="col-sm-12 col-xl-6 alert alert-danger">
					<div class='bg-light rounded h-100 p-4'>
						<h6 class="mb-4 text-center"  style={{...airway,fontSize:'22px'}}>
							<div style={{ display: 'inline-block', position: 'relative' }}>
								Current Active Auctions
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
						<Link to='/bidderactiveauction' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
				</div>
				</div>

				<div class="col-sm-12 col-xl-6 alert alert-warning">
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
						<Link to='/bidderupcoming' className="position-absolute bottom-0 end-0 p-4">See more</Link> 
					</div>
				</div>
			</div>
		</div>

		<Clock /> 
		<Alert/> 
		</div>
	

	</>
  );
};

export default Bidder;
