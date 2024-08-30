import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import LayoutApp from './components/layout/LayoutApp'

import OrganizationsList from './views/organizations/OrganizationsList'
import OrganizationsDetail from './views/organizations/OrganizationsDetails'



const LayoutRouting = () => {
  return (
  <Routes>
      <Route  element={<LayoutApp />}>
      <Route index  element={<DashBoardPage/>} />
      <Route path='organizations' element={<OrganizationsList/>}/>
      <Route path='organizations/:id' element={<OrganizationsDetail/>}/>

        
        <Route path='*' element={<h1>Books</h1>} />


      </Route>
    </Routes>
  )
}

export default LayoutRouting