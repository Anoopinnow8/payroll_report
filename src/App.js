import './App.css';
import { Slide, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import RouteContainer from './routes/RouteContainer';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteContainer/>
    
      <ToastContainer
          closeOnClick
          theme="colored"
          hideProgressBar
          autoClose={1200}
          draggable={false}
          transition={Slide}
          closeButton={false}
        />
          </BrowserRouter>
    </div>
  );
}

export default App;
