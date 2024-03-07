import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Sellersidebar from "./Sellersidebar";
import Sellernavbar from "./Sellernavbar";
import Clock from "../Clock";

function Sellerauctionview({ user }) {
    const location = useLocation();
    const [data, setData] = useState({ Images: [] });
    const airway = {
        color: '#28A745',
    };

    useEffect(() => {
        let params = {
            id: location.state.id,
        };

        fetch("http://localhost:4000/viewproductbyid", {
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
    }, [location.state.id,data]);

	
    return (
        <>
            <Sellersidebar user={user} />
            <div className="content">
                <Sellernavbar user={user} />
                <Clock />

                <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
                    <div className="bg-light rounded h-100 p-4">
                        <h3 className="mb-4" style={airway}>Active Product Details</h3>
                        <div className="row">
                            <div className="col-md-5">
                                <p><b style={airway}>Product Name:</b>{data.ProductName}</p>
                                <p><b style={airway}>Description: </b>{data.Description}</p>
								<p><b style={airway}>Manufacturing Date:</b> {data.Date}</p>
                                <p><b style={airway}>Category:</b> {data.Category}</p>
                                <p><b style={airway}>Seller Name:</b> {data.Username}</p>
                                <p><b style={airway}>Minimum Bid Amount: </b>{data.Minamount}</p>
                                {data.BidAmount && (
									<>
										<p><b style={airway}>Bid Amount: </b>{data.BidAmount}</p>
										<p><b style={airway}>Bidder Name: </b>{data.BidderName}</p>
									</>
								)}
                            </div>
                            <div className="col-md-7">
                                <Carousel interval={1000}>
                                    {data.Images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100" style={{ width: '500px', height: '500px' }}
                                                src={`http://localhost:4000/${image}`}
                                                alt={`Slide ${index}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div>
                            <Link to="/selleractiveauction">Back</Link>
                        </div>
                    </div>
                </div>

                <Clock />
            </div>
        </>
    );
}

export default Sellerauctionview;
