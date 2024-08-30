import { Form } from 'antd';
import styled from 'styled-components';
const ButtonStyle = styled.div`
   button{
    font-size: 17px;
   margin-right: 20px;
   border:  1px solid gray;
   padding: 7px 17px;
   border-radius: 5px;
   }
   button:hover{
    border: 1px solid #11699c;
    color: #11699c;
   }
   .disable,.disable:hover{
    color: gray;
    border:  1px solid gray;


   } 
   `;


const FormStyle = styled(Form)`
  /* width: 100%;
  border:  1px solid red; */


`

 const FlexStyle = styled.div`
  display: flex;
  gap: 10px;
  
  /* border:  1px solid gray; */
  width: 100%;
  
  
 ` 
 
 const SearchInputStyle = styled.div`
  .ant-input-affix-wrapper{
    margin-left: 25px;
  width: 220px;
  border: 1px solid gray;
  padding: 6px 10px;
  font-size: 17px;
  }


input::placeholder {
  
  opacity: 0.6;
  color: black;
}
.ant-input-clear-icon {
    font-size: 19px; /* Adjust the font size for the clear button */
    line-height: 1; /* Set line-height to adjust the vertical alignment */
}

 `
const HeaderContainerStyle = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid lightgray;
margin-bottom: 20px;
margin: 20px 30px;
`;

const TitleStyle = styled.div`
  h1 {
    font-size: 28px;
    color: #6d6d6d;
  }
`;

const HeaderStyle = styled.div`
display: flex;
margin: 0;
padding:20px;
margin-bottom: 40px;
position: sticky;
top: 0px;
z-index: 100;
.header_left{
    p{
        color: 1e2987;
        font-size: 20px;
    }
}

button{
    margin-left:15px;

}
.header_right{
            button{
                margin-left:15px;
                background: #096e30;
                padding: 7px 30px !important;
                color: wheat;
            }
            button:hover{
                color: white;
            }
        }
`
  
  export {
    ButtonStyle,
    FlexStyle,
    FormStyle,
    SearchInputStyle,
    HeaderContainerStyle,
    TitleStyle,
    HeaderStyle
  }