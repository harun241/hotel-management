import MainLayout from "../LayOut/MainLayout";
import ErrorPage from "../Pages/ErrorPage"
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Privaate/PrivateRoute";
import MyBookings from "../Pages/MyBookings"
import { createBrowserRouter } from "react-router";
import RoomsPage from "../Pages/RoomsPage";
import RoomDetails from "../Pages/RoomDetails"
import About from "../Pages/About";
import Contact from "../Pages/Contact";






export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/> ,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: 'login',
        element: <Login/>,
      },
      {
        path: 'register',
        element: <Register/>,
      },
      {
  path: 'mybookings',
  element: (
    <PrivateRoute>
      <MyBookings />
    </PrivateRoute>
  ),
},
      {
        path: 'mybookings/:roomId',
        element: (
       <PrivateRoute>
        <MyBookings/>
       </PrivateRoute>
        ),
      },
     
      {
        path: '/rooms',
        element:<RoomsPage/>,
      },
      {
        path: '/roomdetails/:id',
        element: <RoomDetails/>
      },
       {
        path: '/about',
        element: <About/>
      },
      {
  path: "/contact",
  element: <Contact></Contact>
},
     
    ],
  },
]);



