import React, { useState, useEffect } from "react";
import Sellersidebar from "./Sellersidebar";
import Sellernavbar from "./Sellernavbar";
import { Link} from 'react-router-dom';
import Clock from "../Clock";
import Alert from "./Alert";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sellerproductview({ user }) {
    const [data, setData] = useState([]);
	const [refresh,setRefresh]=useState(0)

    const airway = {
        color: '#28A745',
    }

    useEffect(() => {
        fetch('http://localhost:4000/viewproduct')
            .then((res) => res.json())
            .then((result) => setData(result));
    }, [refresh]);

    const filteredData = data.filter((value) => value.Username === user.name);

	const handleDelete = (iD) => {
		let params = {
			id: iD
		}
		fetch('http://localhost:4000/deleteproduct', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		}).then((res) => res.json()).then((result) => {
			toast.warn(`Product Deleted Successfully`, {
				position: 'top-right',
				autoClose: 1000, 
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			  });
			setRefresh((previous) => previous + 1)
		})
	}

    return (
        <>
            <Sellersidebar user={user} />
            <div className="content">
                <Sellernavbar user={user} />

                <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
                    <div className="bg-light rounded h-100 p-4">
                        <h3 className="mb-4"><b style={airway}>Product Status Hub</b></h3>
                        {filteredData.length > 0 ? (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" style={airway}>Sl.No</th>
                                        <th scope="col" style={airway}>Product Name</th>
                                        <th scope="col" style={airway}>Minimum Bid Amount</th>
                                        <th scope="col" style={airway}>Manufacturing Date</th>
                                        <th scope="col" style={airway}>Category</th>
                                        <th scope="col" style={airway}>Image</th>
                                        <th style={airway}>Status</th>
                                        <th style={airway}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.ProductName}</td>
                                            <td>{value.Minamount}</td>
                                            <td>{value.Date}</td>
                                            <td>{value.Category}</td>
                                            <td>
                                                <img src={`http://localhost:4000/${value.Images[0]}`} alt="error" width="100" height="100" />
                                            </td>
                                            <td>
                                                {value.status === undefined && 'Pending'}
                                                {value.status === 0 && <span style={{ color: 'red' }}>Rejected</span>}
                                                {value.status === 1 && <span style={{ color: 'green' }}>Approved</span>}
                                            </td>
                                            <td>
                                                {value.status === undefined && (
                                                    <>
                                                        <Link to="/editproduct" state={{ id: value._id }} style={{background: 'blue',color: 'white',padding: '7px',textDecoration: 'none',borderRadius: '5px',display: 'inline-block',marginRight: '8px'}}>Edit</Link>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(value._id)}>Delete</button>
                                                    </>
                                                )}
                                                {value.status === 1 && (
                                                    <button className="btn btn-danger" onClick={() => handleDelete(value._id)}>Delete</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '10px', border: '2px solid #f5c6cb', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>No product added</p>
                            </div>
                        )}
                    </div>
                </div>

                <Clock />
				<Alert user={user}/>

            </div>
        </>
    );
}

export default Sellerproductview;
