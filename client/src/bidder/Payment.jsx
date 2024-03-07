import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, } from 'react-router-dom';
import './payment.css';

const Payment = () => {
  const [paymentData, setPaymentData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/viewproductbyid', {
          id: location.state.id,
        });

        const result = response.data;
        setPaymentData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [location.state.id,paymentData]);

  const handlePayNow = async (productId) => {
	try {
	  const response = await fetch(`http://localhost:4000/updatePaymentStatus/${productId}`, {
		method: 'put',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ paymentStatus: 'yes' }),
	  });
  
	  const result = await response.json();
	  console.log(result);
	} catch (error) {
	  console.error('Error updating payment status:', error);
	}
  };

  const initPayment = async() => {
    if (!paymentData) {
      console.error('Payment data not available');
      return;
    }

    const options = {
      key: "your_key",
      amount: paymentData.BidAmount * 100, 
      currency: "INR",
      name: paymentData.ProductName,
      description: paymentData.Description,
      image: `http://localhost:4000/${paymentData.Images[0]}`,
      order_id: paymentData.order_id, 
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleProceedToPay = async () => {
    if (!paymentData) {
      console.error('Payment data not available');
      return;
    }
    initPayment();
    handlePayNow(paymentData._id);
  };

  return (
    <div>
      {!paymentData && <p>Loading...</p>}
      {paymentData && (
        <div className="App">
          <div className="container">
            <img src={`http://localhost:4000/${paymentData.Images[0]}`} alt="product_img" className="img" />
            <p className="name">Product Name: {paymentData.ProductName}</p>
            <p className="price">
              Price: <span>&#x20B9; {paymentData.BidAmount}</span>
            </p>
			{paymentData.paymentStatus ? (
              <p style={{display:'flex',justifyContent:'center',alignItems:'center',color:'green',fontSize:'20px'}}><b>Paid</b></p>
            ) : (
              <button onClick={handleProceedToPay} className="buy_btn">
                Proceed to Pay
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
