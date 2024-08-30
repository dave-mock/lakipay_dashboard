/*
1) in sore.js file    
import organizationsReducer from '../views/organizations/OrganizationsRedux' // import the organizations
    
    export const store = configureStore({
  reducer: {
     ......
    organizations: organizationsReducer, // add the organizations here
    
  },
})


2) in LayoutRouting.jsx

import OrganizationsList from './views/organizations/OrganizationsList'
import OrganizationsDetail from './views/organizations/OrganizationsDetails'

<Route path='organizations' element={<OrganizationsList/>}/>
<Route path='organizations/:id' element={<OrganizationsDetail/>}/>


3) in Sidebar.jsx (optional)

    await authService.checkPermmision(organizations, 'read'))&&getItem(Organizations,organizations,<DashboardOutlined/>),
    
    and change the icon


4) back end index.js

const organizationRoute = require('./organizations/organizationRouter');

{
    path: '/organizations',
    route: organizationRoute,
  },

*/
    