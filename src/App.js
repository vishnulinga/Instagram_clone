import logo from './logo.svg';
import './App.css';
import PostComponent from "./components/postComponent"



function App() {
  return (
    <div className='app-wrapper'>
      <div className='header'>
      <h1>INSTAGRAM</h1>
      </div>

      <PostComponent />
    </div>
  );

}

export default App;
