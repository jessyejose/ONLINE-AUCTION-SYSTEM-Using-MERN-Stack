import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sellersidebar from "./Sellersidebar";
import Sellernavbar from "./Sellernavbar";
import { useNavigate } from "react-router-dom";
import Clock from "../Clock";
import Alert from "./Alert";

function Sellerproduct({ user }) {
  const [product, setProduct] = useState('');
  const [description, setProductdescription] = useState('');
  const [minamount, setMinamount] = useState('');
  const [date, setDate] = useState('');
  const [datacategory, setDatacategory] = useState([]);
  const [datacategoryid, setDatacategoryid] = useState([]);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const airway = {
	color: '#28A745',
	}
  useEffect(() => {
    fetch('http://localhost:4000/category')
      .then((res) => res.json())
      .then((result) => {
        setDatacategory(result);
      });
  }, []);

  const handleFormproduct = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('product', product);
    formData.append('description', description);
    formData.append('minamount', minamount);
    formData.append('date', date);
    formData.append('category', datacategoryid);
    image.forEach((image, index) => {
      formData.append(`image[${index}]`, image);
    });

    fetch(`http://localhost:4000/sellerproductinsert/${user.name}`, {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        e.target.reset();
        setProduct('');
        setProductdescription('');
        setMinamount('');
        setDate('')
        setImage([]);

        toast.success('Product added successfully!', {
          position: 'top-right',
          autoClose: 50,
          onClose: () => {
			navigate('/sellerproductview');
          }
        });
      })
  }

	return(
		<>
		    <Sellersidebar user={user} />
			<div className="content">
				<Sellernavbar user={user} />

				<div className="col-sm-12 col-xl-12" style={{margin:"15px"}}>
					<div className="bg-light rounded h-100 p-4">
						<h4 className="mb-4"><b style={airway}>ADD PRODUCT</b></h4>
						<form onSubmit={handleFormproduct} enctype="multipart/form-data">
							<div className="row mb-3">
								<label  className="col-sm-2 col-form-label"><b style={airway}>Product Name</b></label>
								<div className="col-sm-10">
								<input type="text" className="form-control" id="inputEmail3" name="product" value={product} onChange={(e) => setProduct(e.target.value)}  />
								</div>
							</div>
							<div className="row mb-3">
								<label  className="col-sm-2 col-form-label"><b style={airway}>Product Description</b></label>
								<div className="col-sm-10">
								<input type="text" className="form-control" id="inputEmail3" name="description" value={description} onChange={(e) => setProductdescription(e.target.value)}  />
								</div>
							</div>
							<div className="row mb-3">
								<label  className="col-sm-2 col-form-label"><b style={airway}>Minimum Bid Amount (in Rs.)</b></label>
								<div className="col-sm-10">
								<input type="text" className="form-control" id="inputEmail3" name="minamount" value={minamount} onChange={(e) => setMinamount(e.target.value)}  />
								</div>
							</div>
							<div className="row mb-3">
								<label  className="col-sm-2 col-form-label"><b style={airway}>Manufacturing Date</b></label>
								<div className="col-sm-10">
								<input type="date" className="form-control" id="inputEmail3" name="date" value={date} onChange={(e) => setDate(e.target.value)}  />
								</div>
							</div>
							<div className="row mb-3">
								<label  className="col-sm-2 col-form-label"><b style={airway}>Select Category</b></label>
								<div className="col-sm-10">
								<select  name='category' form-select mb-3 onChange={(e) => setDatacategoryid(e.target.value)} style={{width:'940px',height:'40px'}}>
									<option selected>Select</option>
									{datacategory.map((value,index)=>{
										return(
											<>
											<option value={value.Categoryname}>{value.Categoryname}</option>
											</>
										)
									})}	
								</select>
								</div>
							</div>
							<div class="row mb-3">
                                <label className="col-sm-2 col-form-label"><b style={airway}>Upload File</b></label>
								<div className="col-sm-10">
                                <input class="form-control" type="file" id="formFile" name="image[]" multiple accept="image/*" onChange={(e) => setImage(Array.from(e.target.files))}/>
								</div>
                            </div>
							<button type="submit" className="btn btn-success" style={{marginLeft:'600px'}}>Add Product</button>
						</form>
					</div>
				</div>

				<Clock/>
				<Alert user={user}/>

			</div>
			<ToastContainer />
		
		</>
	)
}

export default Sellerproduct