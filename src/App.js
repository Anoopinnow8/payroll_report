import './App.css';
import Main from './page';
import { Slide, ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="App">
      <Main />
      <ToastContainer
          closeOnClick
          theme="colored"
          hideProgressBar
          autoClose={1200}
          draggable={false}
          transition={Slide}
          closeButton={false}
        />
    </div>
  );
}

export default App;
