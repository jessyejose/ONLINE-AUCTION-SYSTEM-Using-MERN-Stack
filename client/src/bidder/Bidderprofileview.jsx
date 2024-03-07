import React, { useState, useEffect } from "react";
import Biddersidebar from "./Biddersidebar";
import Biddernavbar from "./Biddernavbar";
import { Link } from 'react-router-dom';
import Clock from "../Clock";
import Alert from "./Alert";

const ProfileSection = ({ title, content }) => (
    <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#00cccc', fontSize: '24px', marginBottom: '10px' }}>{title}</h3>
        <p style={{ fontSize: '18px', color: '#555', margin: '0' }}>{content}</p>
    </div>
);

function Bidderprofileview({ user }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/viewprofile')
            .then((res) => res.json())
            .then((result) => {
                setUsers(result);
                setLoading(false);
            });
    }, []);

    const filteredData = users.filter((value) => value._id === user._id);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            <Biddersidebar user={user} />
            <div className="content" >
                <Biddernavbar user={user} />
                <div style={{ margin: '50px auto', padding: '20px', background: '#f8f9fa', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', borderRadius: '10px', maxWidth: '600px' }}>
                    <h2 style={{ color: '#00cccc', fontSize: '32px', textAlign: 'center', marginBottom: '20px' }}>My Profile</h2>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
						{filteredData.length > 0 ? (
							<div style={{ textAlign: 'center' }}>
								<img
									src={filteredData[0].image ? `http://localhost:4000/${filteredData[0].image}` : "/gi.jpg"}
									alt=""
									style={{ borderRadius: '50%', width: '150px', height: '150px' }}
								/>
							</div>
						) : (
							<div style={{ textAlign: 'center' }}>
								<img className="rounded-circle me-lg-2" src="/gi.jpg" alt="" style={{ width: '150px', height: '150px' }} />
							</div>
						)}
                    </div>
                    <hr />
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        {filteredData.length > 0 ? (
                            <>
                                <ProfileSection title="Name" content={filteredData[0].name || '--Nil--'} />
                                <ProfileSection title="Email" content={filteredData[0].email || '--Nil--'} />
                                <ProfileSection title="Phone No" content={filteredData[0].mobile || '--Nil--'} />
                                <ProfileSection title="Address" content={filteredData[0].address || '--Nil--'} />
                            </>
                        ) : (
                            <>
                                <ProfileSection title="Name" content={user.name || '--Nil--'} />
                                <ProfileSection title="Email" content={user.email || '--Nil--'} />
                                <ProfileSection title="Phone No" content={user.mobile || '--Nil--'} />
                                <ProfileSection title="Address" content={user.address || '--Nil--'} />
                            </>
                        )}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/bidderprofile" state={{ id: user._id }} style={{ background: '#00cccc', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>Edit Profile</Link>
                    </div>
                </div>

                <Clock />
                <Alert />
            </div>
        </>
    );
}

export default Bidderprofileview;
