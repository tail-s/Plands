import styled from "styled-components";
import { colors } from "styles/variables";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
`;

const LoginBlock = styled.div`
  background-color: ${colors.blackColor};
  border-radius: 5px;
  border: 3px solid ${colors.blackColor};
  width: 500px;
  margin-bottom: 5rem;
  padding: 50px;
`;

const LoginHeader = styled.div`
  #title {
    font-size: 35px;
    font-weight: bolder;
    color: ${colors.pointColor};
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
`;

const LoginContent = styled.div``;

const LoginContentRow = styled.div`
  text-align: center;
  margin-bottom: 10px;

  input {
    display: inline-block;
    font-size: 15px;
    font-weight: bolder;
    border: none;
    width: 80%;
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

  #logIn-btn {
    padding: 10px 10px;
    border-radius: 5px;
    background: ${colors.pointColor};
    margin-left: 5px;
    margin-right: 5px;
    color: ${colors.blackColor};
    font-size: 15px;
    font-weight: bolder;
    padding-left: 10px;
    padding-right: 10px;
    width: 130px;

    &:hover {
      background: #86873a;
      color: ${colors.pointColor};
      cursor: pointer;
    }
  }

  #footer {
    text-align: center;
    font-size: 14px;
    font-weight: bolder;
    color: ${colors.pointColor};
    margin-bottom: 25px;
    margin-top: 65px;

    #signUp-btn {
      padding: 10px 10px;
      border-radius: 5px;
      background: ${colors.blueColor};
      margin-left: 5px;
      margin-right: 5px;
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
    }

    #findId-btn {
      padding: 10px 10px;
      border-radius: 5px;
      background: ${colors.pinkColor};
      margin-left: 5px;
      margin-right: 5px;
      color: ${colors.blackColor};
      font-size: 15px;
      font-weight: bolder;
      padding-left: 10px;
      padding-right: 10px;
      width: 130px;

      &:hover {
        background: #814282;
        color: ${colors.pinkColor};
        cursor: pointer;
      }
    }

    #findPw-btn {
      padding: 10px 10px;
      border-radius: 5px;
      background: ${colors.orangeColor};
      margin-left: 5px;
      margin-right: 5px;
      color: ${colors.blackColor};
      font-size: 15px;
      font-weight: bolder;
      padding-left: 10px;
      padding-right: 10px;
      width: 130px;

      &:hover {
        background: #b08f4c;
        color: ${colors.orangeColor};
        cursor: pointer;
      }
    }
  }
`;

export {
  Container,
  LoginBlock,
  LoginHeader,
  LoginContent,
  LoginContentRow,
};
