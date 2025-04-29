// import React, { useEffect, useState } from "react";
// import './styles/App.css';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';

function App() {
  // const [status, setStatus] = useState<string>("");

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/testing")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStatus(data.message)
  //     })
  //     .catch(() => setStatus("Could not reach backend."))
  // }, [])

  const callBackend = () => (
    fetch("http://127.0.0.1:8000/testing/", {
      method: "POST",
      body: JSON.stringify({
        sender: "tsaichenlo",
        receiver: "tsaihsilo",
        content: "click button and send message to meimei"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((res) => res.json())
    .then((json) => console.log(json))
  )

  return (
    <button onClick={callBackend}>click!</button>
    // <div className="text-blue-600 text-lg font-medium">{status}</div>
    // <div className="App">
    //   <Header />
    //   <Sidebar />
    //   {/* Main content area */}
    //   <div className="main-content">
    //     {/* Your page content goes here */}
    //   </div>
    // </div>
  );
}

export default App;
