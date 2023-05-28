import styled from "styled-components";
import TemplateBackground from "./img/background.jpg";

export const TemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  // background-image: url(${TemplateBackground});
  background-color: #e5e5e5;
  background-size: cover;
  text-align: center;
`;

export const TemplateContentWrapper = styled.div`
  width: 100%;
`;

export const CustomMap = styled.div`
  width: 100%;
  height: auto;
  border: none;
`;

export const CustomInputText = styled.input`
  margin-top: 20px;
  margin-bottom: 30px;
  width: 50%;
  height: 50px;
  border: none;
  border-radius: 15px;
  outline: none;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  // background-color: rgba(85, 79, 79, 0);
  color: black;
  box-shadow: 5px 5px 3px gray;
  margin-right: 20px;
`;

export const CustomUl = styled.ul`
  list-style: none;
  text-align: center;
  padding: 0;
`;

export const ListItemWrapper = styled.div`
  width: auto;
  display: inline-block;
  margin-bottom: 10px;
  font-size: 30px;
  width: auto;
  margin: 15px;
  font-weight: bold;
  border: 3px solid black;
  border-radius: 15px;
  padding: 5px;
`;

export const CustomList = styled.li`
  flex-grow: 7;
`;

export const CustomListDeleteButton = styled.button`
  width: 100px;
  border: none;
  font-weight: bolder;
  background-color: coral;

  &:hover {
    cursor: pointer;
    background-color: orangered;
  }
`;

export const ListAddButton = styled.button`
  width: 80px;
  margin-left: 50px;
  height: 40px;
  border: none;
  background-color: #04cf5c;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bolder;
  &:hover {
    cursor: pointer;
    background-color: greenyellow;
  }
`;

export const TravelTitleWrapper = styled.div`
  text-align: center;
  padding-top: 100px;
  margin-bottom: 100px;
`;
export const CustomHr = styled.hr`
  height: 10px;
  border: 0;
  box-shadow: 0 10px 10px -10px #bbb inset;
  margin-bottom: 100px;
`;
export const CustomH1 = styled.h1``;
export const CustomH2 = styled.h2``;
export const CustomAddListInput = styled.input`
  margin-top: 20px;
  margin-bottom: 30px;
  width: 60%;
  height: 50px;
  border: none;
  border-radius: 15px;
  outline: none;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  // background-color: rgba(85, 79, 79, 0);
  color: black;
  box-shadow: 5px 5px 3px gray;
`;

export const HWrapper = styled.div`
  display: inline-block;
  width: 50%;
  text-align: left;
`;

export const TravelDaysWrapper = styled.div`
  margin-bottom: 100px;
`;

export const TravelMembersWrapper = styled.div`
  margin-bottom: 100px;
`;

export const TravelStartPointWrapper = styled.div`
  margin-bottom: 100px;
`;

export const TravelStayWrapper = styled.div`
  margin-bottom: 100px;
`;

export const TravelItemsWrapper = styled.div`
  margin-bottom: 100px;
`;

export const TravelBudgetWrapper = styled.div`
  margin-bottom: 300px;
`;

export const BudgetConfirmWrapper = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;
export const BudgetConfirm = styled.div`
  display: inline-block;
  color: coral;
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

export const PdfTitle = styled.div`
  font-size: 70px;
  font-weight: bolder;
  font-family: googleGugi;
`;

export const FontSingleDay = styled.div`
  font-size: 35px;
  font-family: googleSingleDay;
`;

export const Fontgugi = styled.div`
  font-size: 35px;
  font-family: googleGugi;
`;

export const TitleImg = styled.div`
  opacity: 50%;
`;
