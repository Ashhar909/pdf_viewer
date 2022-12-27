import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Viewer from './components/Viewer';
import Home from './components/Home';
// import Kanva from './components/Kanva';
// import Annotations from './components/Annotations';
function App() {
  return (
    // <div>
    //   <Annotations/>
    // </div>
    <Router>
      <div className="App">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/view/:id" element={<Viewer />} />
            </Routes>
      </div>
    </Router>
  );
}

export default App;
