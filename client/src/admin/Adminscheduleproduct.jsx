import React, { useState, useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock"; 
import Alert from "./Alert";
import Port from "../Port";

function Adminscheduleproduct() {
  const location = useLocation();
  const selectedCategory = location.state?.category;
  const navigate=useNavigate();
  const [data, setData] = useState({});
  const [auctionDate, setAuctionDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const airway = {
    color: '#880085',
  };

  useEffect(() => {
    if (location.state?.id) {
      let params = {
        id: location.state.id,
      };

      fetch(`${Port}/viewproductbyid`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          if (result.AuctionDate && result.StartTime && result.EndTime) {
            setShowForm(false);
            setAuctionDate(result.AuctionDate);
            setStartTime(result.StartTime);
            setEndTime(result.EndTime);
          } else {
            setShowForm(true);
          }
        });
    }
  }, [location.state?.id, refresh]);

  const handleRescheduleClick = () => {
    setShowForm(true);
  };
  const handleFormSubmit = async () => {
	 try {
	   const params = {
	     id: location.state?.id,
	   };
	   const response = await fetch(`${Port}/updateauction/${params.id}`, {
	     method: 'POST',
	     headers: {
	       'Content-Type': 'application/json',
	     },
	     body: JSON.stringify({
	       auctionDate,
	       startTime,
	       endTime,
	       params,
	     }),
	   });
	
	   if (response.ok) {
		toast.success(`Product Scheduled Successfully`, {
			position: 'top-right',
			autoClose: 1000, 
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		  });
	     console.log('Auction details updated successfully');
	     setShowForm(false);
	     setRefresh((prev) => prev + 1);
	   } else {
	     console.error('Failed to update auction details');
	   }
	 } catch (error) {
	   console.error('Error updating auction details:', error);
	 }
 };
  const handleFormSubmitForCategory = async () => {
        if (selectedCategory) {
          const scheduleAllParams = {
            category: selectedCategory,
            auctionDate,
            startTime,
            endTime,
          };

          const scheduleAllResponse = await fetch(`${Port}/scheduleall`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleAllParams),
          });
		if (scheduleAllResponse.ok) {
			toast.success(`Scheduled all products in ${selectedCategory}`, {
			  position: 'top-right',
			  autoClose: 1000, 
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: true,
			  draggable: true,
			  onClose: () => {
				navigate('/adminschedulelist');
			  },
			});
		  } else {
			toast.error('Failed to schedule products. Please try again.', {
			  position: 'top-right',
			  autoClose: 1000,
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: true,
			  draggable: true,
			});
		  }
        }
  };

  const formStyles = {
    label: {
      display: 'block',
      margin: '10px 0',
      fontWeight: 'bold',
      color: '#880085',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #880085',
      boxSizing: 'border-box',
    },
    button: {
      background: '#880085',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
    rescheduleButton: {
      background: '#880085',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      marginTop: '150px',
    },
  };

  return (
    <>
      <Adminsidebar />
      <div className="content">
        <Adminnavbar />

        <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
          {selectedCategory ? (
			<div style={{...airway,margin:'20px'}}>
			<h3 className="mb-4" style={{...airway,marginTop:'20px'}}>Schedule all products in {selectedCategory}</h3>
            <form>
              <label style={formStyles.label}>Auction Date:</label>
              <input type="date" value={auctionDate} style={formStyles.input} onChange={(e) => setAuctionDate(e.target.value)} required /><br />

              <label style={formStyles.label}>Start Time:</label>
              <input type="time" value={startTime} style={formStyles.input} onChange={(e) => setStartTime(e.target.value)} /><br />

              <label style={formStyles.label}>End Time:</label>
              <input type="time" value={endTime} style={formStyles.input} onChange={(e) => setEndTime(e.target.value)} /><br />

              <button type="button" style={formStyles.button} onClick={handleFormSubmitForCategory}>Update Auction Details</button>
            </form>
			</div>
          ) : (
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4" style={airway}>Product Details</h3>
              <div className="row">
                <div className="col-md-5">
                  <p><b style={airway}>Product Name:</b>{data.ProductName}</p>
                  <p><b style={airway}>Description: </b>{data.Description}</p>
                  <p><b style={airway}>Minimum Bid Amount: </b>{data.Minamount}</p>
                  <p><b style={airway}>Manufacturing Date:</b> {data.Date}</p>
                  <p><b style={airway}>Category:</b> {data.Category}</p>
                  <p><b style={airway}>Seller Name:</b> {data.Username}</p>
                  {data.AuctionDate && data.StartTime && data.EndTime && (
                    <>
                      <p><b style={airway}>Auction Date:</b> {data.AuctionDate}</p>
                      <p><b style={airway}>Start Time:</b> {data.StartTime}</p>
                      <p><b style={airway}>End Time:</b> {data.EndTime}</p>
                    </>
                  )}
                </div>
                <div className="col-md-7">
                  {showForm ? (
                    <form>
                      <label style={formStyles.label}>Auction Date:</label>
                      <input type="date" value={auctionDate} style={formStyles.input} onChange={(e) => setAuctionDate(e.target.value)} required /><br />

                      <label style={formStyles.label}>Start Time:</label>
                      <input type="time" value={startTime} style={formStyles.input} onChange={(e) => setStartTime(e.target.value)} /><br />

                      <label style={formStyles.label}>End Time:</label>
                      <input type="time" value={endTime} style={formStyles.input} onChange={(e) => setEndTime(e.target.value)} /><br />

                      <button type="button" style={formStyles.button} onClick={handleFormSubmit}>Update Auction Details</button>
                    </form>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <button type="button" style={formStyles.rescheduleButton} onClick={handleRescheduleClick}>Reschedule</button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Link to="/adminschedulelist">Back</Link>
              </div>
            </div>
          )}
        </div>

        <Clock /> 
        <Alert />
      </div>
    </>
  );
}

export default Adminscheduleproduct;
