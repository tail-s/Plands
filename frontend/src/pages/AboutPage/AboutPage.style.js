import styled from "styled-components";
import { colors } from "styles/variables";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.table`
  text-align: center;
  margin-top: 80px;
  margin-bottom: 80px;
  flex-direction: column;
`;

export const Tr = styled.tr``;

export const ProfileTd = styled.td`
  height: 200px;
  width: 200px;
`;

export const ProfileImg = styled.img`
  width: 100%;
`;

export const Info = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bolder;
  border-radius: 5px;
  color: #141e30;
  background-color: #d1dfe8;
`;

export const InfoDetail = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  width: 340px;
  color: #141e30;
  padding-left: 20px;
`;
