
    import React, { useEffect, useRef, useState } from 'react'
    import { useSearchParams } from 'react-router-dom'
    import colorsService from './ColorsService';
    import CommonTable from '../../components/commons/CommonTable';
    import { ButtonStyle, SearchInputStyle } from '../../components/commons/CommonStyles';
    import { Divider, Input } from 'antd';
    import { searchColors, updateColorsState, colorsSearchText } from './ColorsRedux';//** */
    import { useDispatch, useSelector } from 'react-redux'; /*** */

    
    const ColorsPick = ({setIsModalOpen,selectHandler}) => {
    const [colorsData, setColorsData] = useState([])
    const [total, setTotal] = useState()
    const [searchParams,setSearchParams] = useSearchParams()
    const dispatch = useDispatch(); /*** */
    const searchText = useSelector(colorsSearchText); //** */
    
    
    const [loading, setLoading] = useState();
    const [colorsSelection, setColorsSelection] = useState([])
    const delayTimerRef = useRef(null);
    
    const getPaginationInfo = () => {

        return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
    }


    useEffect(() => {
        const [page, limit] = getPaginationInfo();
        dispatch(updateColorsState({ page: page, limit: limit }))

        searchData();
    }, [])

    async function searchData() {
        try {
            setLoading(true)
            const { payload } = await dispatch(searchColors());
            setColorsData(payload.data)
            setTotal(payload.total)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    const searchHandler = (e) => {
        const { value } = e.target;
        const [page, limit] = getPaginationInfo();

        dispatch(updateColorsState({ page: page, limit: limit, searchText: value }))
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = setTimeout(() => {


            searchData()
        }, 500);


    }

    const handlePagination = (page, pageSize) => {
        
        setSearchParams({page:page,limit:pageSize})
        searchData()
    }
    
    
     const columns = [
         
    
     
            {
                title: 'value',
                dataIndex: 'value',

            },
            
         
         ];
    
    
    
    
    return (

<div className='flex flex-row gap-6'>
                <SearchInputStyle>
                    <Input onChange={searchHandler}
                        placeholder="Search"
                        value={searchText}
                        allowClear />
                </SearchInputStyle>


    <CommonTable
                rowSelectionType={"radio"}
                data={colorsData}
                columns={columns}
                setSelection={setColorsSelection}
                handlePagination={handlePagination}
                total={total}
                loadding={loading}

            />
            <Divider style={{margin:15}}/>

<ButtonStyle>
     <button    onClick={()=>setIsModalOpen(false)} >
        cancel
      </button>
      <button disabled={colorsSelection.length==0} className={colorsSelection.length>0?'':'disable'} onClick={()=>selectHandler(colorsSelection[0])}>
        Return
      </button>
     </ButtonStyle>     

    </div>
  )
}
    
    

    export default ColorsPick
    