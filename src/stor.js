import { configureStore } from '@reduxjs/toolkit'
import colorsReducer from './views/colors/ColorsRedux' // import the colors
import organizationsReducer from './views/organizations/OrganizationsRedux' // import the organizations

export const store = configureStore({
  reducer: {
    colors: colorsReducer, // add the colors here
    organizations: organizationsReducer, // add the organizations here
    

  },
})