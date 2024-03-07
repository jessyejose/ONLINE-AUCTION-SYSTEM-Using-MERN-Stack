import React from "react";
import { Link,useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sellernavbar({user}) {
	const navigate = useNavigate();
    const handleLogout = () => {
		toast.success('Logout successful!', {
		  position: 'top-right',
		  autoClose: 1000,
		  onClose: () => {
			navigate('/');
		  },
		});
	  };
    return (
        <>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <Link to="/" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                </Link>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fa fa-envelope me-lg-2"></i>
                            <span className="d-none d-lg-inline-flex">Message</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="#" className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img className="rounded-circle" src="gi.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                                    <div className="ms-2">
                                        <h6 className="fw-normal mb-0">Seller send you a message</h6>
                                        <small>15 minutes ago</small>
                                    </div>
                                </div>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="#" className="dropdown-item text-center">See all message</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fa fa-bell me-lg-2"></i>
                            <span className="d-none d-lg-inline-flex">Notification</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="#" className="dropdown-item">
                                <h6 className="fw-normal mb-0">Profile updated</h6>
                                <small>15 minutes ago</small>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="#" className="dropdown-item text-center">See all notifications</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
							
							<img
								className="rounded-circle me-lg-2"
								src={user.image  ?`http://localhost:4000/${user.image}`  : "/gi.jpg"}
								alt=""
								style={{ width: '40px', height: '40px' }}
							/>
                            <span className="d-none d-lg-inline-flex">{user ? ` ${user.name}` : 'Seller'}</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="/sellerprofileview" className="dropdown-item">My Profile</Link>
                            <Link to="#" className="dropdown-item">Settings</Link>
                            <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </nav>
			<ToastContainer />
        </>
    );
}

export default Sellernavbar;
