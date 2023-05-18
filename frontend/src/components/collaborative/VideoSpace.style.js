import styled from "styled-components";

export const OpenViduWrapper = styled.div`
  padding: 15px;
  background: linear-gradient(#141e30, #243b55);
`;

export const VideoContainer = styled.div`
  display: flex;
`;

export const SessionsComponent = styled.div`
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: #d8dfd2;
    border-radius: 10px;

    box-shadow: inset 0px 0px 5px white;
  }
`;

export const MainVideo = styled.div``;
