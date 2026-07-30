import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import {Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <div>
        <Navbar/>
        <hr/>
        <div className='app-content'>
          <Sidebar/>
          <Routes>
            <Route path='/add' element={<Add/>}/>
             <Route path='/list' element={<List />}/>
              <Route path='/orders' element={<Orders/>}/>
          </Routes>
        </div>
      </div>
      <title>Food-Del Admin</title>

    </div>
  )
}

export default App
