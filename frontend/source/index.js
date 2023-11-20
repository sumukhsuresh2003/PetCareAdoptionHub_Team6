//D:\Surabhi\workspace\react-proj\my-app\se_proj\my-react-app
import React from 'react';
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals';
import App from './App';
// import './index.css';


// //import Login from './components/login';
// import Found from './components/found';
// import Lost from './components/lost';
// // import Adopt from './components/adopt';
// import Volunteer from './components/volunteer';

// import PetProfile from './components/petprofile';
// import CreateAcc from './components/create_account';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    {/* <Login /> */}
    {/* <Lost /> */}
    {/* <Found /> */}
    {/* <Adopt /> */}
    {/* <PetProfile /> */}
    {/* <Volunteer/> */}
    {/* <CreateAcc/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
