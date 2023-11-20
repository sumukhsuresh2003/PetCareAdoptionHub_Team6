import { useEffect,useState } from 'react';
// import './App.css'
import { useRef } from "react";

import {BrowserRouter as Router,Routes,Route,Redirect} from "react-router-dom";

import Adopt from './components/adopt'
import Login from './components/login';
import Found from './components/found';
import Lost from './components/lost';
import Volunteer from './components/volunteer';
import reportWebVitals from './reportWebVitals';
import PetProfile from './components/petprofile';
import CreateAcc from './components/create_account';
import Navbut from './components/navbar';
import Home from './components/home';
import Title from './components/title';

function App() {

	console.log('app test');
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	// const handleLogin = () => {
	// 	setIsAuthenticated(true);
	// 	console.log('func called!');
	//   };
return (
	
	<Router>
	
        {/* <Title/> */}
		{/* <Firstpage/> */}
		{/* <Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link> */}

{/* <Routes>
  <Route 
    path='/' 
    element={<Login />} 
  />
</Routes> */}

{/* Assuming this section is inside the same component */}
{/* console.log("auth");
console.log({isAuthenticated}); */}
<Title/>
<Navbut />


	<Routes>
		
		<Route path='/' element={<Home/>} />
		{/* <Route path='/' element={<Login  setIsAuthenticated={setIsAuthenticated} />} /> */}
		<Route path='/home' element={<Home/>} />
		<Route path='/create_account' element={<CreateAcc/>} />
       <Route path='/adopt' element={<Adopt/>} />
        <Route path='/lost' element={<Lost/>} />
		<Route path='/found' element={<Found/>} />
		<Route path='/volunteer' element={<Volunteer/>} />
		<Route path='/petprofile' element={<PetProfile/>} />
		<Route path='/login' element={<Login />} />
		<Route path='/createacc' element={<CreateAcc/>} />
       

		
	</Routes>
	</Router>
);
}

export default App;


