/*
1) in sore.js file    
import colorsReducer from '../views/colors/ColorsRedux' // import the colors
    
    export const store = configureStore({
  reducer: {
     ......
    colors: colorsReducer, // add the colors here
    
  },
})


2) in LayoutRouting.jsx

import ColorsList from './views/colors/ColorsList'
import ColorsDetail from './views/colors/ColorsDetails'

<Route path='colors' element={<ColorsList/>}/>
<Route path='colors/:id' element={<ColorsDetail/>}/>


3) in Sidebar.jsx (optional)

    await authService.checkPermmision(colors, 'read'))&&getItem(Colors,colors,<DashboardOutlined/>),
    
    and change the icon


4) back end index.js

const colorRoute = require('./colors/colorRouter');

{
    path: '/colors',
    route: colorRoute,
  },

*/
    