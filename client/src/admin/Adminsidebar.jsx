import React from 'react';
import { Link } from 'react-router-dom';

const airway = {
    color: '#880085',
};

const Adminsidebar = () => {
    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-light navbar-light">
                <Link to="/admin" className="navbar-brand mx-4 mb-3">
                    <h3 style={airway}><i className="fa me-2"></i>AuctionElite</h3>
                </Link>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img className="rounded-circle" src="img/user.png" alt="" style={{ width: '40px', height: '40px' }} />
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6>Admin</h6>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <Link to='/admin' className="nav-item nav-link active" style={airway}><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
                    <Link to='/admincategory' className="nav-item nav-link active" style={airway}><i className="fa fa-tachometer-alt me-2"></i>Category</Link>
                    <Link to='/adminactiveauction' className="nav-item nav-link active" style={airway}><i className="fa fa-tachometer-alt me-2"></i>Auctions</Link>
                    <Link to='/adminuser' className="nav-item nav-link active" style={airway}><i className="fa fa-tachometer-alt me-2"></i>Users</Link>
                </div>
            </nav>
        </div>
    );
}

export default Adminsidebar;
