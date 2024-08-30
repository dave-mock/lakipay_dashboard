
    import React, { useEffect, useState } from 'react'
    import { Button, Form, Input, InputNumber, Select, Spin, Switch,DatePicker,Divider } from 'antd';
    import styled from 'styled-components';
    import { ButtonStyle, FlexStyle, FormStyle } from '../../components/commons/CommonStyles';
    import colorsService from './ColorsService';
    import CommonModal from '../../components/commons/CommonModel';
    import ColorsPick from './ColorsPick';
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
    
    const ColorsEdit = ({setIsModalOpen,isModelOpen,mode,setMode,colorsData,searchData}) => {
    const [form] = Form.useForm();
    const [switch2,setSwitch2] = useState("")
    const [loading,setLoading] = useState("")
    const [colorPick,setColorPick] = useState(false)


    
    useEffect(()=>{
        const featchData = async()=>{
        try{

            const data = await colorsService.getColor(mode);
            form.setFieldsValue({ color: {...data,updatedAt:dayjs(data.updatedAt)} });
            
    
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

    const colorPickHandler=(data)=>{
        console.log('colorPickHandler',data)
        
        setColorPick(false)
        
    }


    const onAdd = async(datas)=>{
        try{

        setLoading(true);

        const data = await colorsService.createColor(datas.color)
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

        const data = await colorsService.updateColor(datas.color,mode)
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
      {colorPick ? <CommonModal
        width={700}
        isModalOpen={colorPick}
        setIsModalOpen={setColorPick}
      >
        <ColorsPick
          setIsModalOpen={setColorPick}
          selectHandler={colorPickHandler}
        />
      </CommonModal> : ""}


      {loading ? <SpinStyle>
        <Spin style={{ color: "#fff" }} size="large" />
      </SpinStyle> : ""}
      <button onClick={() => setColorPick(true)}>hhhhhh</button>
      
      
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
            name={['color', 'value']}
            label="value"
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



export default ColorsEdit
    