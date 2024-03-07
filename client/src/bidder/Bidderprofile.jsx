import React, { useState, useEffect } from 'react';
import Biddersidebar from './Biddersidebar';
import Biddernavbar from './Biddernavbar';
import { useNavigate } from "react-router-dom";
import Clock from "../Clock";
import { Alert } from 'react-bootstrap';

function Bidderprofile({ user }) {
  const [users, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/viewprofile')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const filteredData = users.find((value) => value._id === user._id);

  const [formValues, setFormValues] = useState({
    name: filteredData?.name || '',
    email: filteredData?.email || '',
    mobile: filteredData?.mobile || '',
    address: filteredData?.address || '',
    image: filteredData?.image || '',
    id: filteredData?._id || ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      name: filteredData?.name || '',
      email: filteredData?.email || '',
      mobile: filteredData?.mobile || '',
      address: filteredData?.address || '',
      image: filteredData?.image || '',
      id: filteredData?._id || ''
    }));
  }, [filteredData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('email', formValues.email);
    formData.append('address', formValues.address);
    formData.append('mobile', formValues.mobile);
    formData.append('id', formValues.id);
    formData.append('image', formValues.image);

    try {
      const response = await fetch('http://localhost:4000/insertOrUpdateProfile/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      const updatedUser = {
        ...formValues,
        ...data,
      };

      setFormValues(updatedUser);

      navigate('/bidderprofileview');
    } catch (error) {
      console.error('Error during bidder profile save/update:', error);
    }
  };

  return (
    <>
      <Biddersidebar user={user} />
      <div className="content">
        <Biddernavbar user={user} />

        <div style={{ margin: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '1500px' }} className='bg-light rounded h-100 p-4'>
          <h3>Bidder Details</h3>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formValues.name}
                onChange={(e) => setFormValues((prevValues) => ({ ...prevValues, name: e.target.value }))} disabled
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
                value={formValues.email}
                onChange={(e) => setFormValues((prevValues) => ({ ...prevValues, email: e.target.value }))}
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
                value={formValues.address}
                onChange={(e) => setFormValues((prevValues) => ({ ...prevValues, address: e.target.value }))}
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
                value={formValues.mobile}
                onChange={(e) => setFormValues((prevValues) => ({ ...prevValues, mobile: e.target.value }))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image:
              </label>
              <input type="file" name="image" className="form-control"
                onChange={(e) => setFormValues((prevValues) => ({ ...prevValues, image: e.target.files[0] }))}
              />

              <img
                className="rounded-circle me-lg-2"
                src={filteredData?.image ? `http://localhost:4000/${formValues.image}` : "/gi.jpg"}
                alt=""
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>

        <Clock />
        <Alert />
      </div>
    </>
  );
}

export default Bidderprofile;

