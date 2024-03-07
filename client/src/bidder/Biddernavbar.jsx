import React,{useState,useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Biddernavbar({user}) {
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
        <>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <Link to="/" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                </Link>
                <Link to="" className="sidebar-toggler flex-shrink-0" style={{ color: '#880085' }}>
                    <i className="fa fa-bars" style={{ color: '#880085' }}></i>
                </Link>
                <form className="d-none d-md-flex ms-4">
                    <input className="form-control border-0" type="search" placeholder="Search" />
                </form>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fa fa-envelope me-lg-2"></i>
                            <span className="d-none d-lg-inline-flex">Message</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="#" className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img className="rounded-circle" src="th.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                                    <div className="ms-2">
                                        <h6 className="fw-normal mb-0">Bidder send you a message</h6>
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
								src={filteredData[0]?.image ? `http://localhost:4000/${filteredData[0].image}` : "/gi.jpg"}
								alt=""
								style={{ width: '40px', height: '40px' }}
							/>

                            <span className="d-none d-lg-inline-flex">{filteredData.length > 0 ? ` ${filteredData[0].name}` : 'Bidder'}</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="#" className="dropdown-item">My Profile</Link>
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

export default Biddernavbar;

