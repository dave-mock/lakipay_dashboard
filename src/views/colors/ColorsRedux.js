
    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
    import ColorsService from './ColorsService';


    export const searchColors = createAsyncThunk(
        "colors/searchColors",
        async (data, { rejectWithValue,getState }) => {
        try {
            
            const { searchText,page,limit,sort,order } = getState().colors.query; // Access state directly

            const res = await ColorsService.searchColor({page,limit,searchText,sort,order});
            
    
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
        }
    );

    export const colorsSlice = createSlice({
    name: 'colors',
    initialState:{
        query:{
            searchText:'',
            page:1,
            limit:5,
            sort:'',
            order:''
        },
        color:'#110330'
        // color:"red",
    },
    reducers: {
        updateColorsState: (state,action) => {
        
        state.query = {...state.query,...action.payload}

        },
        
        
    },
    extraReducers: {
        [searchColors.pending]: (state, action) => {
           
        },
        [searchColors.fulfilled]: (state, action) => {
            console.log('action',action)
            if(action.payload.data.length>0){
                state.color = action.payload.data[0].value
            }
        },
        [searchColors.rejected]: (state, action) => {
      
        },
    }

    })

    export const { updateColorsState } = colorsSlice.actions

    export default colorsSlice.reducer
    export const colorsSearchText = (state) => state.colors.query.searchText;
    export const colorsPage = (state)=>state.colors.query.page
    export const colorsLimit = (state)=>state.colors.query.limit
    export const colorsSort = (state)=>state.colors.query.sort
    export const colorsQuery = (state)=>state.colors.query
    export const color = (state)=>state.colors.color



    
    