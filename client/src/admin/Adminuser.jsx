import React,{useState,useEffect} from "react";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock"; 
import Alert from "./Alert";
import Port from "../Port";

function Adminuser() {
	const airway = {
		color: '#880085',
		
	};
	const tableStyle = {
		borderCollapse: 'collapse',
		border: '2px solid #880085',
		width: '100%',
		color: '#bf40bf',
	  };
	  
	  const tableHeaderStyle = {
		borderBottom: '2px solid #880085',
		color: '#880085',
		padding: '20px',
		
	  };
	  
	  const tableRowStyle = {
		borderBottom: '1px solid #880085',
	  };
	  
	  const tableCellStyle = {
		padding: '20px',
	  };
	const [users, setUsers] = useState([]);

	useEffect(() => {
	  fetch(`${Port}/adminuser`)
		.then(response => response.json())
		.then(data => setUsers(data))
		.catch(error => console.error('Error fetching user details:', error));
	}, []);
    return (
        <>
            <Adminsidebar />
            <div class="content">
                <Adminnavbar />
				<div>
					<h2 style={airway}>User Details</h2>
					{users.length > 0 ? (
						<table style={tableStyle}>
							<thead>
							<tr style={tableRowStyle}>
								<th style={tableHeaderStyle}>Name</th>
								<th style={tableHeaderStyle}>Email</th>
								<th style={tableHeaderStyle}>User Type</th>
							</tr>
							</thead>
							<tbody>
							{users.map(user =>
								user.status !== '0' ? (
								<tr key={user._id} style={tableRowStyle}>
									<td style={tableCellStyle}>{user.name}</td>
									<td style={tableCellStyle}>{user.email}</td>
									<td style={tableCellStyle}>{getUserType(user.status)}</td>
								</tr>
								) : null
							)}
							</tbody>
						</table>
					) : (
						<p>No users available.</p>
					)}
				</div>

				<Clock /> 
				<Alert/>

			</div>
			
		</>
	);
}

function getUserType(status) {
	switch (status) {
	  case '1':
		return 'Bidder';
	  case '2':
		return 'Seller';
	  default:
		return '';
	}
  }

export default Adminuser;
