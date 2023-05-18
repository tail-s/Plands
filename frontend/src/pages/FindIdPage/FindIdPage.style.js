import styled from "styled-components";
import { colors } from "styles/variables";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
`;

const FindIdBlock = styled.div`
  background-color: ${colors.blackColor};
  border-radius: 5px;
  border: 3px solid ${colors.blackColor};
  width: 500px;
  margin-bottom: 5rem;
  padding: 50px;
`;

const FindIdHeader = styled.div`
  #title {
    font-size: 35px;
    font-weight: bolder;
    color: ${colors.pointColor};
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
`;

const Content = styled.div``;

const ContentRow = styled.div`
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

  button {
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
`;

export {
  Container,
  FindIdBlock,
  FindIdHeader,
  Content,
  ContentRow,
};
