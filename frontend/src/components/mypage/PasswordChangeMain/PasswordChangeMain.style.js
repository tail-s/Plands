import styled from "styled-components";
import { colors } from "styles/variables";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 80px;
`;

export const Form = styled.div`
  background-color: ${colors.blackColor};
  border-radius: 5px;
  border: 3px solid ${colors.blackColor};
  width: 500px;
  padding: 100px 50px 100px 50px;
  margin-bottom: 5rem;
`;

export const Label = styled.div`
  font-size: 17px;
  display: inline-block;
  position: relative;
  transition: all 0.5s ease-in-out;
  font-weight: bolder;
  color: ${colors.pointColor};
  background-color: ${colors.blackColor};
  padding-right: 5px;
  padding-left: 10px;
  padding-bottom: 15px;

  label {
    margin-bottom: 15px;
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
    margin-bottom: 15px;
    margin-top: 15px;

    :focus {
      outline: 0;
      border: 2px solid ${colors.pointColor};
    }

    &:hover {
      border: 2px solid ${colors.pointColor};
    }
  }
`;

export const CorrectInput = styled.div`
  font-weight: bold;
  color: ${colors.greenColor};
  text-align: left;
  margin-left: 10px;
  padding-bottom: 10px;
`;

export const InvalidInput = styled.div`
  font-weight: bold;
  color: ${colors.redColor};
  text-align: left;
  margin-left: 10px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 50px;
`;

export const CancelBtn = styled.button`
  padding: 20px;
  border-radius: 5px;
  width: 90px;
  background: ${colors.redColor};
  margin-right: 25px;
  color: ${colors.blackColor};
  font-size: 20px;
  font-weight: bolder;

  &:hover {
    background: #8a3d3f;
    color: ${colors.redColor};
    cursor: pointer;
  }
`;

export const ChangeBtn = styled.button`
  padding: 20px;
  border-radius: 5px;
  background: ${colors.blueColor};
  margin-left: 25px;
  color: ${colors.blackColor};
  font-size: 20px;
  font-weight: bolder;
  padding-left: 10px;
  padding-right: 10px;
  width: 90px;

  &:hover {
    background: #4a7296;
    color: ${colors.blueColor};
    cursor: pointer;
  }
`;
