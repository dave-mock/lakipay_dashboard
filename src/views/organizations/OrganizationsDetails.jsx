
    import { Divider } from 'antd'
    import React from 'react'
    import { useLocation } from 'react-router-dom'
    import styled from 'styled-components'


    
    const OrganizationsDetail = () => {
    const {state} = useLocation();
    return (
    <DetailStyle>
        <h1>User Detail</h1>
        <Divider  style={{margin:'15px 0 25px 0'}} />

    
    
    
                <div className='detail_child'>
                <p className='detail_key'>id:</p>
                <p className='detail_value'>{state?.id}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>name:</p>
                <p className='detail_value'>{state?.name}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>description:</p>
                <p className='detail_value'>{state?.description}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>logo:</p>
                <p className='detail_value'>{state?.logo}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>capital:</p>
                <p className='detail_value'>{state?.capital}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>country:</p>
                <p className='detail_value'>{state?.country}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>status:</p>
                <p className='detail_value'>{state?.status}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>created_at:</p>
                <p className='detail_value'>{state?.created_at}</p>  
            </div>
            

    </DetailStyle>
  )
}
    


    const DetailStyle = styled.div`
        border: 1px lightgray;
        margin: 30px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        h1{
            padding: 0;
            margin: 0;
            font-size: 16px;

        }
        .detail_child{
            margin-bottom: 15px;
        }
        .detail_key{
            font-size: 20px;
            font-weight: bold;
        }
        .detail_value{
            color: #106085;
            font-size: 20px;
        }

`

export default OrganizationsDetail
    