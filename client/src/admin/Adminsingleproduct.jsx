import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock"; 
import Alert from "./Alert";
import Port from "../Port";

function Adminsingleproduct() {
    const location = useLocation();
    const [data, setData] = useState({ Images: [] }); 
	const airway = {
        color: '#880085',
    };
    useEffect(() => {
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
            });
    }, [location.state.id]);

    return (
        <>
            <Adminsidebar />
            <div className="content">
                <Adminnavbar />

                <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
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
                            </div>
                            <div className="col-md-7">
                                <Carousel interval={1000}>
                                    {data.Images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100" style={{width:'500px',height:'500px'}}
                                                src={`http://localhost:4000/${image}`}
                                                alt={`Slide ${index}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div>
                            <Link to="/adminpendingproduct">Back</Link>
                        </div>
                    </div>
                </div>

				<Clock />
				<Alert/> 
            </div>
        </>
    );
}

export default Adminsingleproduct;
