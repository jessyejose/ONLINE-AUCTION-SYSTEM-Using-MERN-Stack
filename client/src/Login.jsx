import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
	try {
	  const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, pass: password }),
	  });
  
	  if (response.ok) {
		const data = await response.json();
		setUser(data.userDetails);
  
		toast.success('Login successful!', {
		  position: 'top-right',
		//   autoClose: 100,
		  onClose: () => {
			if (data.userDetails.status === '0') {
			  navigate('/admin');
			} else if (data.userDetails.status === '1') {
			  navigate('/bidder');
			} else if (data.userDetails.status === '2') {
			  navigate('/seller');
			}
		  },
		});
	  } else {
		if (response.status === 404) {
		  setErrorMessage('Not a valid user, Please Signup');
		  // Display error toast for 'Not a valid user' case
		  toast.error('Not a valid user, Please Signup', { position: 'top-right' });
		} else {
		  setErrorMessage('Login failed');
		  // Display error toast for 'Login failed' case
		  toast.error('Login failed', { position: 'top-right' });
		}
	  }
	} catch (error) {
	  console.error('Error during login:', error);
	  setErrorMessage('Login failed');
	  // Display error toast for 'Login failed' case
	  toast.error('Login failed', { position: 'top-right' });
	}
  };
  
  

  return (
    <div className="container-fluid" style={{ backgroundImage: `url(/login.jpg)`, backgroundSize: 'cover', width: '100%', height: '100vh', backgroundPosition: 'center' }}>
      <ToastContainer autoClose={3000} />
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Link to="/">
                <h3 style={{ fontSize: '25px', color: '#880085' }}>
                  AUCTIONELITE
                </h3>
              </Link>
              <h5>Sign In</h5>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button
              type="button"
              style={{ backgroundColor: '#880085', color: 'white' }}
              className="btn py-3 w-100 mb-4"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <p className="text-center mb-0">
              Don't have an Account? <Link to="/register"><span style={{ color: '#880085' }}>Sign Up</span></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
