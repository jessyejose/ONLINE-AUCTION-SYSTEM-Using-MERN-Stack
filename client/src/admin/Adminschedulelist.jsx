import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock";
import Alert from "./Alert";
import Port from "../Port";

function Adminschedulelist() {
  const airway = {
    color: '#880085',
  };
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    fetchCategories();
    fetch(`${Port}/viewproduct`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const fetchCategories = () => {
    fetch(`${Port}/category`)
      .then((res) => res.json())
      .then((result) => {
        setCategories(result);
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const scheduleAllProducts = () => {
	if (!selectedCategory) {
		alert('Please select a category before scheduling all products.');
		return;
	  }
	navigate('/schedulesingleproduct',{state:{category:selectedCategory}})
    console.log("Scheduling all products for category:", selectedCategory);
  };

  const endedAuctions = data.filter((value) => value.BidAmount && value.BidderName);
  const scheduledAuctions = data.filter((value) => value.status === 1 && !value.AuctionDate);
  const rescheduledAuctions = data.filter((value) => value.AuctionDate  && !value.BidAmount);


  return (
    <>
      <Adminsidebar />
      <div className="content">
        <Adminnavbar />
        <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4" style={airway}>Auction Status</h3>
			<div style={{ marginBottom: "20px" }}>
              <label style={airway}>Select Category: </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{ marginRight: "10px" }}
              >
                <option value=''>All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.Categoryname}>
                    {category.Categoryname}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={scheduleAllProducts}
                style={{
                  background: "#880085",
                  color: "white",
                  padding: "7px",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                Schedule All
              </button>
            </div>

			{scheduledAuctions.length > 0 && (
              <>
                <h4>Scheduled Auctions</h4>
                <table className="table table-bordered" style={{ border: '2px solid #880085' }}>
                  <thead style={airway}>
                    <tr>
                      <th scope="col">Seller Name</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Auction Date</th>
                      <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledAuctions.map((value, index) => (
                      <tr key={index}>
                        <td>{value.Username}</td>
                        <td>{value.ProductName}</td>
                        <td>{value.Category}</td>
                        <td>{value.AuctionDate || 'N/A'}</td>
                        <td style={{ textAlign: 'center' }}>
                          {value.AuctionDate ? (
                            <Link to="/schedulesingleproduct" state={{ id: value._id }} style={{ background: '#007bff', color: 'white', padding: '7px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>Reschedule</Link>
                          ) : (
                            <Link to="/schedulesingleproduct" state={{ id: value._id }} style={{ background: 'green', color: 'white', padding: '7px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>Schedule</Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

			{rescheduledAuctions.length > 0 && (
              <>
                <h4>Rescheduled Auctions</h4>
                <table className="table table-bordered" style={{ border: '2px solid #880085' }}>
                  <thead style={airway}>
                    <tr>
                      <th scope="col">Seller Name</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Auction Date</th>
                      <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rescheduledAuctions.map((value, index) => (
                      <tr key={index}>
                        <td>{value.Username}</td>
                        <td>{value.ProductName}</td>
                        <td>{value.Category}</td>
                        <td>{value.AuctionDate }</td>
                        <td style={{ textAlign: 'center' }}>
                          <Link to="/schedulesingleproduct" state={{ id: value._id }} style={{ background: 'blue', color: 'white', padding: '7px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>Reschedule</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}


			{endedAuctions.length > 0 && (
			<>
				<h4>Ended Auctions</h4>
				<table className="table table-bordered" style={{ border: '2px solid #880085' }}>
				<thead style={airway}>
					<tr>
					<th scope="col">Seller Name</th>
					<th scope="col">Product Name</th>
					<th scope="col">Category</th>
					<th scope="col">Auction Date</th>
					<th style={{ textAlign: 'center' }}>Action</th>
					</tr>
				</thead>
				<tbody>
					{endedAuctions.map((value, index) => (
					<tr key={index}>
						<td>{value.Username}</td>
						<td>{value.ProductName}</td>
						<td>{value.Category}</td>
						<td>{value.AuctionDate}</td>
						<td style={{ textAlign: 'center' }}>
						<p style={{ color: 'green' }}>Auction Ended</p>
						</td>
					</tr>
					))}
				</tbody>
				</table>
			</>
			)}


            {(endedAuctions.length === 0 && scheduledAuctions.length === 0) && (
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '10px', border: '2px solid #f5c6cb', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>No auctions found</p>
                <p style={{ fontSize: '16px', color: '#721c24' }}>Check back later for updates.</p>
              </div>
            )}
          </div>
        </div>

        <Clock />
        <Alert />
      </div>
    </>
  );
}

export default Adminschedulelist;