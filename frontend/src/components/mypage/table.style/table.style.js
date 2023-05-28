import styled from "styled-components";
import { colors } from "styles/variables";

export const table = styled.div`
  padding-top: 80px;
  padding-bottom: 80px;
`;

export const tr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  #input {
    color: black;
  }
`;

export const td = styled.div`
  text-align: center;
  font-size: 25px;
  transition: all 0.5s ease-in-out;
  font-weight: bolder;
  color: #141e30;
  padding-right: 5px;
  padding-bottom: 5px;
  width: 320px;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
    border: none;
    padding: 20px 20px;
    border-radius: 5px;
    border-bottom: 2px solid #141e30;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    color: #141e30;

    &:hover {
      border: 2px solid #141e30;
    }
  }

  select {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
    border: none;
    padding: 20px;
    border-radius: 5px;
    border-bottom: 2px solid #141e30;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    color: #141e30;
    width: 307px;

    &:hover {
      border: 2px solid #141e30;
    }
  }
`;
