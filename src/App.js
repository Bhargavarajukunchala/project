// import Login from './Pages/LoginPage';
// import Register from './Pages/RegisterPage';
// import Home from './Pages/HomePage';
// import "./style.scss"
// import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
// import {  useContext } from 'react';
// import { AuthContext } from './context/AuthContext';

// function App() {
//   const {currentUser} =useContext(AuthContext)
//   const ProtectedRoute = ({children})=>{
//     if(!currentUser){
//       return <Navigate to="/login"/>;
//     }
    
//     return children;
//   }
//   return (
//    <BrowserRouter>
//    <Routes>
//    <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register/>} />
//           <Route
//             path="/"
//             element={
//               currentUser ? (
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               ) : (
//                 <Login />
//               )
//             }
//           />
//    </Routes>
//    </BrowserRouter>
//   );
// }

// export default App;


import React, { useContext, useState, useEffect } from 'react';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import Home from './Pages/HomePage';
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Spinner from './Components/Spinner'; // Assuming you have a Spinner component

function App() {
  const { currentUser } = useContext(AuthContext);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    setAuthCheckComplete(true);
  }, [currentUser]); // The effect runs whenever currentUser changes

  const ProtectedRoute = ({ children }) => {
    if (!authCheckComplete) {
      // While authentication check is ongoing, show a loading spinner
      return <Spinner />;
    }
    if (!currentUser) {
      // If no user is authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
    // If a user is authenticated, render the children (protected content)
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



