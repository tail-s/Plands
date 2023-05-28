import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 100%;
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #262e36;
  box-sizing: border-box;
`;

export const QuitButton = styled.button`
  width: 80px;
  height: 50px;
  background-color: orangered;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 50px;
  font-size: 15px;
  font-weight: bold;
  padding: 15px;
  &:hover {
    cursor: pointer;
    background-color: coral;
    color: black;
  }
`;

export const ShareButton = styled.button`
  position: absolute;
  right: 150px;
  height: 50px;
  background-color: #faff00;
  color: black;
  border: none;
  border-radius: 5px;
  margin-right: 100px;
  font-weight: bold;
  padding: 15px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    background-color: yellowgreen;
  }
`;

export const PDFButton = styled.button`
  position: absolute;
  right: 0;
  height: 50px;

  background-color: #ef3d3d;
  color: white;
  font-weight: bold;
  padding: 15px;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  margin-right: 50px;
  &:hover {
    cursor: pointer;
    background-color: #d83737;
  }
`;
