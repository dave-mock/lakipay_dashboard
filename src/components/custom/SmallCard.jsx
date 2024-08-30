import React from "react";
import {
    ArrowUpOutlined,
    UserOutlined
  } from '@ant-design/icons';
import styled from "styled-components";
import { Link } from "react-router-dom";

const SmallCard = ({ bgColor, name, number, link }) => {
  return (
    <Con
      style={{
        backgroundImage: `linear-gradient(to right, ${bgColor[0]} , ${bgColor[1]})`,
        color: "white",
      }}>
      <Link to={"#"}> 
        <CardCon
          style={{
            color: "white",
          }}>
          <CardText>
            <h2>{name}</h2>
            <h1>{number}</h1>
            <span>
              <ArrowUpOutlined  />
              {/* <p>8.2%</p>since last month */}
            </span>
          </CardText>
          <CardIcon>
            <UserOutlined />
          </CardIcon>
        </CardCon>
      </Link>
    </Con>
  );
};

const Con = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  min-width: 200px;
  box-shadow: 1px 1px 10px 1px lightgray;
  margin: 10px 10px;
  /* padding: 20px; */
  border-radius: 10px;
  a {
    display: block;
    /* border: 1px solid; */
    width: 100%;
  }
`;
const CardCon = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  /* min-width: 200px; */

  /* box-shadow: 1px 1px 10px 1px lightgray; */

  margin: 10px 10px;
  padding: 20px;
  border-radius: 10px;
`;
const CardText = styled.div`
  h1 {
    font-size: 28px;
    color: white;
    padding: 0;
    margin: 0;
  }
  span {
    display: flex;
    align-items: center;
  }
  h2 {
    color: white;

    font-size: 20px;
    margin: 0;
  }
  p {
    color: white;

    /* color: #10b981; */
    margin: 0 5px;
  }
`;
const CardIcon = styled.div``;

export default SmallCard;
