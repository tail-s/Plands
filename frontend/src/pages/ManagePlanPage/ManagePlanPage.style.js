import styled from "styled-components";

export const ContentWrapper = styled.div`
  width: 100%;
  height: 700px;
`;
export const PlanListWrapper = styled.div`
  margin: auto;
  width: 85%;
  margin-top: 50px;
  padding: 50px;
  /* padding-left: 50px; */
`;

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 50px;
`;

export const PlanListHeader = styled.div`
  width: 100%;
  height: 75px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #262e36;
  box-sizing: border-box;
`;

export const PlanListFooter = styled.div`
  width: 100%;
  height: 100px;
  border-top: 3px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 0;
`;
export const PageBtnsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const PlanAddButton = styled.button`
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

export const PageBtn = styled.div`
  width: 40px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  line-height: 2;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #243b55;
  color: white;
  border: 3px solid #243b55;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }
`;
