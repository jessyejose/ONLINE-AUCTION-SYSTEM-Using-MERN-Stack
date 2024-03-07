import React from 'react';
import { Link } from 'react-router-dom';
// import Chat from '../Chat';

const airway = {
    color: '#28A745',
};

const Sellersidebar = ({ user}) => {
    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-light navbar-light">
                <Link to="/seller" className="navbar-brand mx-4 mb-3">
                    <h3 style={airway}><i className="fa me-2"></i>AuctionElite</h3>
                </Link>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
							<img
								className="rounded-circle me-lg-2"
								src={user.image  ?`http://localhost:4000/${user.image}`  : "/gi.jpg"}
								alt=""
								style={{ width: '40px', height: '40px' }}
							/>
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
					<h6>{user ? ` ${user.name}` : 'Seller'}</h6>
                    </div>
                </div>
				
                <div className="navbar-nav w-100">
					<Link to='/seller' className="nav-item nav-link active" style={airway}>
                        <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                    </Link>
                    <Link to='/sellerproducts' className="nav-item nav-link active" style={airway}><i className="fa fa-tachometer-alt me-2"></i>Add Product</Link>
                    <Link to='/sellerproductview' className="nav-item nav-link active" style={airway}><i className="fa fa-tachometer-alt me-2"></i>Product Status</Link>
					<Link to='/selleractiveauction' className="nav-item nav-link active" style={airway}>
                        <i className="fa fa-tachometer-alt me-2"></i>Auctions
                    </Link>
                </div>
            </nav>
			{/* <Chat userId={user._id} /> */}
        </div>
    );
}

export default Sellersidebar;
