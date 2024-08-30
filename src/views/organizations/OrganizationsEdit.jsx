
    import React, { useEffect, useState } from 'react'
    import { Button, Form, Input, InputNumber, Select, Spin, Switch,DatePicker,Divider } from 'antd';
    import styled from 'styled-components';
    import { ButtonStyle, FlexStyle, FormStyle } from '../../components/commons/CommonStyles';
    import organizationsService from './OrganizationsService';
    import CommonModal from '../../components/commons/CommonModel';
    import OrganizationsPick from './OrganizationsPick';
    import dayjs from 'dayjs';
    
    const { Option } = Select;

    const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    };
    
    const OrganizationsEdit = ({setIsModalOpen,isModelOpen,mode,setMode,organizationsData,searchData}) => {
    const [form] = Form.useForm();
    const [switch2,setSwitch2] = useState("")
    const [loading,setLoading] = useState("")
    const [organizationPick,setOrganizationPick] = useState(false)


    
    useEffect(()=>{
        const featchData = async()=>{
        try{

            const data = await organizationsService.getOrganization(mode);
            form.setFieldsValue({ organization: {...data,updatedAt:dayjs(data.updatedAt)} });
            
    
        }catch(err){
        }
        }
        if (mode==''){
        
        } else{
        
        featchData()
        }
    },[])


    const handleReset = () => {
        form.resetFields(); // Reset form fields
    }; 

    const organizationPickHandler=(data)=>{
        console.log('organizationPickHandler',data)
        
        setOrganizationPick(false)
        
    }


    const onAdd = async(datas)=>{
        try{

        setLoading(true);

        const data = await organizationsService.createOrganization(datas.organization)
        setIsModalOpen(false)
        searchData()

        setLoading(false);

        }catch(err){
        setLoading(false);
        }
    } 

    const onUpdate = async(datas)=>{
        
        try{

        setLoading(true);

        const data = await organizationsService.updateOrganization(datas.organization,mode)
        searchData()
        setIsModalOpen(false)
        setLoading(false);

        }catch(err){
        setLoading(false);
        }
    } 
    

    const onFinish = (values) => {
        mode == ''? onAdd(values):onUpdate(values)
    };
    
    
    
        return (
    <div>
      {/*******  picks **********/}
      {organizationPick ? <CommonModal
        width={700}
        isModalOpen={organizationPick}
        setIsModalOpen={setOrganizationPick}
      >
        <OrganizationsPick
          setIsModalOpen={setOrganizationPick}
          selectHandler={organizationPickHandler}
        />
      </CommonModal> : ""}


      {loading ? <SpinStyle>
        <Spin style={{ color: "#fff" }} size="large" />
      </SpinStyle> : ""}
      <button onClick={() => setOrganizationPick(true)}>hhhhhh</button>
      
      
    <FormStyle
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onError={() => { } }

        validateMessages={validateMessages}
      >
      

    
            <Form.Item
            className=' flex-1'
            name={['organization', 'id']}
            label="id"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
            <Form.Item
            className=' flex-1'
            name={['organization', 'name']}
            label="name"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
            <Form.Item
            className=' flex-1'
            name={['organization', 'description']}
            label="description"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
            <Form.Item
            className=' flex-1'
            name={['organization', 'logo']}
            label="logo"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
            <Form.Item
            className=' flex-1'
            name={['organization', 'capital']}
            label="capital"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
            <Form.Item
            className=' flex-1'
            name={['organization', 'country']}
            label="country"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
            <Form.Item
            className=' flex-1'
            name={['organization', 'status']}
            label="status"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
            <Form.Item
            className=' flex-1'
            name={['organization', 'created_at']}
            label="created_at"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
      
      <ButtonStyle>
          <button onClick={() => setIsModalOpen(false)} >
            cancel
          </button>
          <button type="submit" >
            Submit
          </button>
        </ButtonStyle>
      </FormStyle>
      
    
      </div>
  )
      
      
      
    
   }  
   
   
  const SpinStyle = styled.div`
  /* border: 1px solid; */
  width: 50px;
  height:  50px;
  background-color: rgba(0,0,0,0.2);
  z-index: 100;
  display: flex;
  border-radius:  120px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40%;

  .ant-spin-dot .ant-spin-dot-spin {
    background-color: red; 
  }
 


`



export default OrganizationsEdit
    