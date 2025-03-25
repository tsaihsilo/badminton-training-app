import './styles/App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      {/* Main content area */}
      <div className="main-content">
        {/* Your page content goes here */}
      </div>
    </div>
  );
}

export default App;
