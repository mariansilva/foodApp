import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'

const App = () => {
  return (
    <div>
      <div>
        <Navbar/>
        <hr/>
        <div className='app-content'>
          <Sidebar/>
        </div>
      </div>
      <title>Food-Del Admin</title>

    </div>
  )
}

export default App
