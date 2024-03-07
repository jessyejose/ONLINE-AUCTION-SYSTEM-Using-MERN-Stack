import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import Seller from './seller/Seller';
import Bidder from './bidder/Bidder';
import Front from './Front';
import Admin from './admin/Admin';
import Admincategory from './admin/Admincategory';
import Sellerproduct from './seller/Sellerproduct';
import Sellerproductview from './seller/Sellerproductview';
import Login from './Login';
import Register from './Register';
import Sellerprofile from './seller/Sellerprofile';
import Sellernavbar from './seller/Sellernavbar';
import Sellersidebar from './seller/Sellersidebar';
import Sellerprofileview from './seller/Sellerprofileview';
import Biddernavbar from './bidder/Biddernavbar';
import Biddersidebar from './bidder/Biddersidebar';
import Bidderprofileview from './bidder/Bidderprofileview';
import Bidderprofile from './bidder/Bidderprofile';
import Adminuser from './admin/Adminuser';
import Adminpendingproduct from './admin/Adminpendingproduct';
import Adminsingleproduct from './admin/Adminsingleproduct';
import Adminschedulelist from './admin/Adminschedulelist';
import Adminscheduleproduct from './admin/Adminscheduleproduct';
import Clock from './Clock';
import Adminupcoming from './admin/Adminupcoming';
import Bidderupcoming from './bidder/Bidderupcoming';
import Sellerupcoming from './seller/Sellerupcoming';
import Adminactiveauction from './admin/Adminactiveauction';
import Adminauctionview from './admin/Adminauctionview';
import Admincompletedauction from './admin/Admincompleted';
import Selleractiveauction from './seller/Selleractiveauction';
import Bidderactiveauction from './bidder/Bidderactiveauction';
import Bidderauctionview from './bidder/Bidderauctionview';
import Sellerauctionview from './seller/Sellerauctionview';
import Sellereditproduct from './seller/Sellereditproduct';
import Bidderhistory from './bidder/Bidderhistory';
import Sellerhistory from './seller/Sellerhistory';
import Payment from './bidder/Payment';

function App() {
	const storedUser = JSON.parse(sessionStorage.getItem('user'));
	const [user, setUser] = useState(storedUser);
    const updateUser = (newUserData) => {
		setUser(newUserData);
	  };

	useEffect(() => {
	  sessionStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	
  return (
	<BrowserRouter>
	<Routes>
	<Route path='/' element={<Front/>}/>
	<Route path='/login' element={<Login setUser={setUser}/>}/>
	<Route path='/register' element={<Register/>}/>



	
	<Route path='/admin' element={<Admin/>}/>
	<Route path='/adminuser' element={<Adminuser/>}/>
	<Route path='/adminpendingproduct' element={<Adminpendingproduct/>}/>
	<Route path='/viewsingleproduct' element={<Adminsingleproduct/>}/>
	<Route path='/adminschedulelist' element={<Adminschedulelist/>}/>
	<Route path='/schedulesingleproduct' element={<Adminscheduleproduct/>}/>
	<Route path='/admincategory' element={<Admincategory/>}/>
	<Route path='/adminupcoming' element={<Adminupcoming/>}/>
	<Route path='/adminactiveauction' element={<Adminactiveauction/>}/>	
	<Route path='/adminauctionview' element={<Adminauctionview/>}/>
	<Route path='/admincompleted' element={<Admincompletedauction/>}/>




	<Route path='/seller' element={<Seller user={user}/>}/>
	<Route path='/sellerproducts' element={<Sellerproduct user={user}/>}/>
	<Route path='/sellerproductview' element={<Sellerproductview user={user}/>}/>
	<Route path='/sellerprofileview' element={<Sellerprofileview user={user}/>}/>
	<Route path='/sellerprofile' element={<Sellerprofile user={user} updateUserCallback={updateUser}/>}/>
	<Route path='/sellernavbar' element={<Sellernavbar user={user}/>}/>
	<Route path='/sellersidebar' element={<Sellersidebar user={user}/>}/>
	<Route path='/sellerupcoming' element={<Sellerupcoming user={user}/>}/>
	<Route path='/selleractiveauction' element={<Selleractiveauction user={user}/>}/>	
	<Route path='/productview' element={<Sellerauctionview user={user}/>}/>
	<Route path='/editproduct' element={<Sellereditproduct user={user}/>}/>
	<Route path='/sellerhistory' element={<Sellerhistory user={user}/>}/>




	


	<Route path='/bidder' element={<Bidder user={user}/>}/>
	<Route path='/biddernavbar' element={<Biddernavbar user={user}/>}/>
	<Route path='/biddersidebar' element={<Biddersidebar user={user}/>}/>
	<Route path='/bidderprofileview' element={<Bidderprofileview user={user}/>}/>
	<Route path='/bidderprofile' element={<Bidderprofile user={user}  updateUserCallback={updateUser}/>}/>
	<Route path='/bidderupcoming' element={<Bidderupcoming user={user}/>}/>
	<Route path='/bidderactiveauction' element={<Bidderactiveauction user={user}/>}/>
	<Route path='/viewproduct' element={<Bidderauctionview user={user}/>}/>
	<Route path='/bidderhistory' element={<Bidderhistory user={user}/>}/>
	<Route path='/pay' element={<Payment user={user}/>}/>

	
	
	<Route path='/clock' element={<Clock />}/>




	</Routes>
	</BrowserRouter>

  );
}

export default App;





