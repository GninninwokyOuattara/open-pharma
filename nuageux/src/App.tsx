
import { RouterProvider } from 'react-router-dom';
import './App.css';
import appRouter from './router/appRouter';
// import appRoutes from './router/appRoutes';



function App() {



  return (
    <>
      {/* <RouterProvider router={appRoutes} /> */}
      {/* <Home /> */}
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
