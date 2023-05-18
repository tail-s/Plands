import styled from "styled-components";

export const MapSearchBar = styled.input`
  width: 70%;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  margin-right: 15px;
`;

export const SearchButton = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  margin-right: 15px;
  font-size: 18px;
  background-color: #75b4dc;

  &:hover {
    cursor: pointer;
    background-color: #577daf;
  }
`;

export const ConfirmButton = styled.button`
  width: 105px;
  height: 40px;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  font-size: 18px;
  background-color: #04cf5c;
  &:hover {
    cursor: pointer;
    background-color: greenyellow;
  }
`;
export const CheckPlaceSpace = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;
export const ConfirmPlace = styled.div`
  display: inline;
  color: coral;
`;
export const HWrapper = styled.div`
  display: inline-block;
  width: 50%;
  text-align: left;
`;

export const MapSearchBarDiv = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
`;
