import React from "react";
import {
  Circle,
  Circley,
  Container,
  Line,
} from "./SideBar.style";

const SideBar = () => {
  return (
    <Container>
      <Line>
        서비스 소개 &nbsp;&nbsp; <Circle />
      </Line>
      <Line>
        작업 예시 화면 &nbsp;&nbsp; <Circle />
      </Line>
      <Line>
        결과물 &nbsp;&nbsp; <Circley />
      </Line>
      <Line>
        구성원에게 공유 &nbsp;&nbsp; <Circle />
      </Line>
    </Container>
  );
};

export default SideBar;
