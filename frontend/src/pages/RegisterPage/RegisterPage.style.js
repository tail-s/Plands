import styled from "styled-components";
import { colors } from "styles/variables";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
`;

const RegistFormDiv = styled.div`
  background-color: ${colors.blackColor};
  border-radius: 5px;
  border: 3px solid ${colors.blackColor};
  width: 500px;
  padding: 50px;
  margin-bottom: 5rem;

  h1 {
    font-size: 35px;
    font-weight: bolder;
    color: ${colors.pointColor};
    padding-bottom: 50px;
  }
`;

const RegistInputDiv = styled.div`
  margin-bottom: 40px;

  select {
    display: flex;
    font-size: 15px;
    font-weight: bolder;
    border: none;
    width: 89%;
    height: 55px;
    margin-top: 5px;
    padding-left: 30px;
    margin-bottom: 50px;
    border-radius: 5px;
    background-color: ${colors.blackColor};
    border-bottom: 2px solid ${colors.pointColor};
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    color: ${colors.whiteColor};

    &:hover {
      border: 2px solid ${colors.pointColor};
    }
  }

  input {
    display: inline-block;
    font-size: 15px;
    font-weight: bolder;
    border: none;
    width: 89%;
    padding: 20px 20px;
    height: 15px;
    border-radius: 5px;
    background-color: ${colors.blackColor};
    border-bottom: 2px solid ${colors.pointColor};
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    color: ${colors.whiteColor};

    :focus {
      outline: 0;
      border: 2px solid ${colors.pointColor};
    }

    &:hover {
      border: 2px solid ${colors.pointColor};
    }
  }

  span {
    font-size: 17px;
    display: inline-block;
    position: relative;
    transition: all 0.5s ease-in-out;
    font-weight: bolder;
    color: ${colors.pointColor};
    background-color: ${colors.blackColor};
    padding-right: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
  }
`;

const CorrectInput = styled.div`
  font-weight: bold;
  color: ${colors.greenColor};
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
  padding-bottom: 10px;
`;

const InvalidInput = styled.div`
  font-weight: bold;
  color: ${colors.redColor};
  text-align: left;
  margin-left: 10px;
`;

const EmailConfirm = styled.div`
  margin-top: 9px;
`;

const SendBtn = styled.button`
  padding: 10px 10px;
  border-radius: 5px;
  background: ${colors.greenColor};
  margin-left: 5px;
  margin-right: 5px;
  color: ${colors.blackColor};
  font-size: 15px;
  font-weight: bolder;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    background: #3e7d3e;
    color: ${colors.greenColor};
    cursor: pointer;
  }
`;

const ResendBtn = styled.button`
  padding: 10px 10px;
  border: 1px solid ${colors.greenColor};
  border-radius: 5px;
  background: ${colors.blackColor};
  margin-left: 5px;
  margin-right: 5px;
  color: ${colors.greenColor};
  font-size: 15px;
  font-weight: bolder;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    border: ${colors.blackColor};
    background: #3e7d3e;
    color: ${colors.greenColor};
    cursor: pointer;
  }
`;

const ConfirmBtn = styled.button`
  padding: 10px 10px;
  border-radius: 5px;
  background: ${colors.greenColor};
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
  color: ${colors.blackColor};
  font-size: 15px;
  font-weight: bolder;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    background: #3e7d3e;
    color: ${colors.greenColor};
    cursor: pointer;
  }
`;

const RegistBtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const RegistBtn = styled.button`
  padding: 10px 10px;
  border-radius: 5px;
  background: ${colors.blueColor};
  margin-left: 25px;
  margin-right: 25px;
  color: ${colors.blackColor};
  font-size: 15px;
  font-weight: bolder;
  padding-left: 10px;
  padding-right: 10px;
  width: 130px;

  &:hover {
    background: #4a7296;
    color: ${colors.blueColor};
    cursor: pointer;
  }
`;

const CancelBtn = styled.button`
  padding: 10px 10px;
  border-radius: 5px;
  background: ${colors.redColor};
  margin-left: 25px;
  margin-right: 25px;
  color: ${colors.blackColor};
  font-size: 15px;
  font-weight: bolder;
  padding-left: 10px;
  padding-right: 10px;
  width: 130px;

  &:hover {
    background: #8a3d3f;
    color: ${colors.redColor};
    cursor: pointer;
  }
`;

export {
  Container,
  RegistFormDiv,
  RegistInputDiv,
  RegistBtnDiv,
  CorrectInput,
  InvalidInput,
  EmailConfirm,
  SendBtn,
  ResendBtn,
  ConfirmBtn,
  RegistBtn,
  CancelBtn,
};
