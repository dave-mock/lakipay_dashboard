
    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
    import OrganizationsService from './OrganizationsService';


    export const searchOrganizations = createAsyncThunk(
        "organizations/searchOrganizations",
        async (data, { rejectWithValue,getState }) => {
        try {
            
            const { searchText,page,limit,sort,order } = getState().organizations.query; // Access state directly

            const res = await OrganizationsService.searchOrganization({page,limit,searchText,sort,order});
            
    
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
        }
    );

    export const organizationsSlice = createSlice({
    name: 'organizations',
    initialState:{
        query:{
            searchText:'',
            page:1,
            limit:5,
            sort:'',
            order:''
        }
    },
    reducers: {
        updateOrganizationsState: (state,action) => {
        
        state.query = {...state.query,...action.payload}

        },
        
        
    },

    })

    export const { updateOrganizationsState } = organizationsSlice.actions

    export default organizationsSlice.reducer
    export const organizationsSearchText = (state) => state.organizations.query.searchText;
    export const organizationsPage = (state)=>state.organizations.query.page
    export const organizationsLimit = (state)=>state.organizations.query.limit
    export const organizationsSort = (state)=>state.organizations.query.sort
    export const organizationsQuery = (state)=>state.organizations.query


    
    