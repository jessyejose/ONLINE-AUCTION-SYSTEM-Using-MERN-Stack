import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
// import Chat from '../Chat';


const Biddersidebar = ({user}) => {

	const airway = {
		color: '#00cccc', 
	};
	const [users, setUser] = useState([]);
		useEffect(() => {
			fetch('http://localhost:4000/viewprofile')
				.then((res) => res.json())
				.then((result) => {
					setUser(result);
				});
		}, []);
		const filteredData = users.filter((value) => value._id=== user._id);
	
    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-light navbar-light">
                <Link to="/bidder" className="navbar-brand mx-4 mb-3">
                    <h3 style={airway}><i className="fa me-2"></i>AuctionElite</h3>
                </Link>
                <div className="d-flex align-items-center ms-4 mb-4">
					<div className="position-relative">
						<img
							className="rounded-circle me-lg-2"
							src={filteredData[0]?.image ? `http://localhost:4000/${filteredData[0].image}` : "/gi.jpg"}
							alt=""
							style={{ width: '40px', height: '40px' }}
						/>
						<div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
					</div>
					<div className="ms-3">
					    <h6>{filteredData.length > 0 ? ` ${filteredData[0].name}` : 'Bidder'}</h6>
					</div>
                </div>
                <div className="navbar-nav w-100">
                    
                    <Link to='/bidder' className="nav-item nav-link active" style={airway}>
                        <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                    </Link>
                    <Link to='/bidderactiveauction' className="nav-item nav-link active" style={airway}>
                        <i className="fa fa-tachometer-alt me-2"></i>Auctions
                    </Link>
					<Link to='/bidderhistory' className="nav-item nav-link active" style={airway}>
                        <i className="fa fa-tachometer-alt me-2"></i>History
                    </Link>
                </div>
            </nav>
			{/* <Chat userId={user._id} /> */}
        </div>
    );
}

export default Biddersidebar;
