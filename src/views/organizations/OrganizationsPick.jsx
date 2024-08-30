
    import React, { useEffect, useRef, useState } from 'react'
    import { useSearchParams } from 'react-router-dom'
    import organizationsService from './OrganizationsService';
    import CommonTable from '../../components/commons/CommonTable';
    import { ButtonStyle, SearchInputStyle } from '../../components/commons/CommonStyles';
    import { Divider, Input } from 'antd';
    import { searchOrganizations, updateOrganizationsState, organizationsSearchText } from './OrganizationsRedux';//** */
    import { useDispatch, useSelector } from 'react-redux'; /*** */

    
    const OrganizationsPick = ({setIsModalOpen,selectHandler}) => {
    const [organizationsData, setOrganizationsData] = useState([])
    const [total, setTotal] = useState()
    const [searchParams,setSearchParams] = useSearchParams()
    const dispatch = useDispatch(); /*** */
    const searchText = useSelector(organizationsSearchText); //** */
    
    
    const [loading, setLoading] = useState();
    const [organizationsSelection, setOrganizationsSelection] = useState([])
    const delayTimerRef = useRef(null);
    
    const getPaginationInfo = () => {

        return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
    }


    useEffect(() => {
        const [page, limit] = getPaginationInfo();
        dispatch(updateOrganizationsState({ page: page, limit: limit }))

        searchData();
    }, [])

    async function searchData() {
        try {
            setLoading(true)
            const { payload } = await dispatch(searchOrganizations());
            setOrganizationsData(payload.data)
            setTotal(payload.total)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    const searchHandler = (e) => {
        const { value } = e.target;
        const [page, limit] = getPaginationInfo();

        dispatch(updateOrganizationsState({ page: page, limit: limit, searchText: value }))
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
                title: 'id',
                dataIndex: 'id',

            },
             
            {
                title: 'name',
                dataIndex: 'name',

            },
             
            {
                title: 'description',
                dataIndex: 'description',

            },
             
            {
                title: 'logo',
                dataIndex: 'logo',

            },
             
            {
                title: 'capital',
                dataIndex: 'capital',

            },
             
            {
                title: 'country',
                dataIndex: 'country',

            },
             
            {
                title: 'status',
                dataIndex: 'status',

            },
             
            {
                title: 'created_at',
                dataIndex: 'created_at',

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
                data={organizationsData}
                columns={columns}
                setSelection={setOrganizationsSelection}
                handlePagination={handlePagination}
                total={total}
                loadding={loading}

            />
            <Divider style={{margin:15}}/>

<ButtonStyle>
     <button    onClick={()=>setIsModalOpen(false)} >
        cancel
      </button>
      <button disabled={organizationsSelection.length==0} className={organizationsSelection.length>0?'':'disable'} onClick={()=>selectHandler(organizationsSelection[0])}>
        Return
      </button>
     </ButtonStyle>     

    </div>
  )
}
    
    

    export default OrganizationsPick
    