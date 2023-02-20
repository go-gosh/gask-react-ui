import React from 'react';
import {Outlet} from "react-router-dom";

function App() {
  return (<div
      className={'border rounded-2xl h-screen container bg-cover bg-fixed'}
      style={{
        "backgroundImage":"url('https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=600&q=240')"
      }}>
      <Outlet/>
    </div>
  );
}

export default App;
