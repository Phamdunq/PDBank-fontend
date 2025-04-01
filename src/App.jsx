import { RouterProvider } from "react-router-dom"
import Router from './routes/MainRouter'
import './styles/global.css';
// import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
