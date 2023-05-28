import styled from "styled-components";
import { colors } from "styles/variables";

export const ModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);

  z-index: 10;
`;

export const ModalFormDiv = styled.div`
  position: absolute;
  width: 50%;
  height: 200px;
  /* background-color: #404752; */
  background-color: #242424;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  border-radius: 7px;
`;

export const CustomH1 = styled.h1`
  text-align: center;
  color: white;
`;

export const CustomH2 = styled.h2`
  text-align: center;
  color: white;
`;

export const CustomHr = styled.hr`
  border: 3px solid ${colors.pointColor};
  margin-bottom: 50px;
`;

export const CustomInput = styled.input`
  width: 50%;
  height: 37px;
  border-radius: 5px;
  border: none;
  margin-bottom: 50px;
  font-size: 15px;
  font-weight: bolder;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50px;
`;

export const AddButton = styled.button`
  width: 20%;
  border-radius: 5px;
  background-color: ${colors.pointColor};
  font-size: 17px;
  font-weight: bolder;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #969660;
  }
`;

export const CancelButton = styled.button`
  width: 20%;
  border-radius: 5px;
  background-color: ${colors.redColor};
  font-size: 17px;
  font-weight: bolder;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #875d55;
  }
`;

export const ExitButton = styled.button`
  width: 20%;
  border-radius: 5px;
  background-color: ${colors.redColor};
  font-size: 17px;
  font-weight: bolder;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #875d55;
  }
`;
