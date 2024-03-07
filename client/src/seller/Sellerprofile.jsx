import React, { useState, useEffect } from 'react';
import Sellersidebar from './Sellersidebar';
import Sellernavbar from './Sellernavbar';
import { useNavigate} from "react-router-dom";
import Clock from "../Clock";
import Alert from './Alert';

function Sellerprofile({ user,updateUserCallback}) {
  const [users, setUser] = useState({
    name: user.name || '',
    email: user.email || '',
	mobile:user.mobile || '',
	address:user.address || '',
    image: user.image || '',
	id:user._id || ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      name: user.name || '',
      email: user.email || '',
	  mobile:user.mobile || '',
	  address:user.address || '',
	  image: user.image || '',
	  id:user._id || ''
    }));
  }, [user]);

  const handleFormSubmit = async (e) => {
	e.preventDefault();
  
	const formData = new FormData();
	formData.append('name', users.name);
	formData.append('email', users.email);
	formData.append('address', users.address);
	formData.append('mobile', users.mobile);
	formData.append('id', users.id);
	formData.append('image', users.image);
  
	try {
	  const response = await fetch('http://localhost:4000/insertOrUpdateProfile/', {
		method: 'POST',
		body: formData,
	  });
	  const data = await response.json();
		const updatedUser = {
		  ...users,
		  ...data,
		};
  
		setUser(updatedUser);
		updateUserCallback(updatedUser);
		sessionStorage.setItem('user', JSON.stringify(updatedUser));
  
		navigate('/sellerprofileview');
	}  catch (error) {
		console.error('Error during seller profile save/update:', error);
	  
	  }
  };
  
  return (
    <>
      <Sellersidebar user={user}/>
      <div className="content">
        <Sellernavbar user={user}/>

        <div style={{ margin: '15px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'1500px'}} className='bg-light rounded h-100 p-4'>
          <h3>Seller Details</h3>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={users.name}
                onChange={(e) => setUser((prevUser) => ({ ...prevUser, name: e.target.value }))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={users.email}
                onChange={(e) => setUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={users.address}
                onChange={(e) => setUser((prevUser) => ({ ...prevUser, address: e.target.value }))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile:
              </label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                value={users.mobile}
                onChange={(e) => setUser((prevUser) => ({ ...prevUser, mobile: e.target.value }))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image:
              </label>
              <input type="file" name="image" className="form-control" 
			  onChange={(e) => setUser((prevUser) => ({ ...prevUser, image: e.target.files[0] }))} />

			  <img
					className="rounded-circle me-lg-2"
					src={user.image  ?`http://localhost:4000/${users.image}`  : "/gi.jpg"}
					alt=""
					style={{ width: '100px', height: '100px' }}
				/>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
		
		<Clock/>
		<Alert user={user}/>

      </div>
    </>
  );
}

export default Sellerprofile;

