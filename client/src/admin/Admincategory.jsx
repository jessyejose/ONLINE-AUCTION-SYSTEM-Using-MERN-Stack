import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock"; 
import Alert from "./Alert";
import Port from "../Port";



function Admincategory(){

	const [category, setcategory] = useState('');
	const navigate = useNavigate()
	const airway = {
		color: '#880085',
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		let params = {
			category: category,
		}
		fetch(`${Port}/categoryinsert`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(params)
		}).then((res) => res.json()).then((result) => {
			setcategory('')
			navigate('/admincategory')
		})
	}


	return(
		<>
		<Adminsidebar/>
		<div class="content">
			<Adminnavbar/>

						<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<h2 style={airway}>Add Category</h2>
							</div>
							<br/>
							<form onSubmit={handleSubmit} >
								<div style={{ marginBottom: '15px' }}>
									<label name="category" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
										Category Name
									</label>
									<input type="text" value={category} onChange={(e) => setcategory(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '2px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',borderColor:'#880085'}}/>
								</div>
								<button type="submit" style={{width: '10%',padding: '10px',fontSize: '16px',backgroundColor: '#880085',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer',}}>
									Submit
								</button>
							</form>
						</div>

						<Clock /> 
						<Alert/>
					</div>

		
		</>
	)
}

export default Admincategory



