import React from "react";
import Sellersidebar from "./Sellersidebar";
import Sellernavbar from "./Sellernavbar";
import { Link } from 'react-router-dom';
import Clock from "../Clock";
import Alert from "./Alert";

function Sellerprofileview({ user }) {

    return (
        <>
            <Sellersidebar user={user} />
            <div className="content">
                <Sellernavbar user={user} />
                <div style={{ margin: '100px 250px', border: '1px solid #3498db', flex: '0 0 30%', borderRadius: '8px', padding: '20px', background: '#ecf0f1', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', height: '600px', width: '700px' }}>
                    <h2 style={{ color: '#28A745', fontSize: '30px', textAlign: 'center' }}>My Profile</h2>
                     {user.image ? (
                        <div style={{ textAlign: 'center' }}>
                       		<img src={`http://localhost:4000/${user.image}`} width="100px" alt="error" style={{ borderRadius: '50%', width: '150px', height: '150px' }}></img>
					    </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <img className="rounded-circle me-lg-2" src="gi.jpg" alt="" style={{ width: '150px', height: '150px' }} />
                        </div>
                    )}

                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					{user.mobile ? (
                        <table style={{ fontSize: '25px' }}>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>{ user.name}</td>
                            </tr>
                            <br />
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{ user.email}</td>
                            </tr>
                            <br />
                            <tr>
                                <td>Phone No</td>
                                <td>:</td>
                                <td>{ user.mobile}</td>
                            </tr>
                            <br />
                            <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td>{ user.address}</td>
                            </tr>
                            <br />
                        </table>
						) : (
							<table style={{ fontSize: '25px' }}>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>{ user.name}</td>
                            </tr>
                            <br />
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{ user.email}</td>
                            </tr>
                            <br />
                            <tr>
                                <td>Phone No</td>
                                <td>:</td>
                                <td>{ '--Nil--'}</td>
                            </tr>
                            <br />
                            <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td>{ '--Nil--'}</td>
                            </tr>
                            <br />
                        </table>
						)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Link to= "/sellerprofile"  state={{ id: user._id }} style={{ background: 'green', color: 'white', padding: '5px', textDecoration: 'none', borderRadius: '5px' }}>Edit</Link>
                    </div>
                </div>

				<Clock/>
				<Alert user={user}/>
            </div>
        </>
    );
}

export default Sellerprofileview;



