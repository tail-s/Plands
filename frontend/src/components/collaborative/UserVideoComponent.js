import React, { useMemo } from "react";
import OpenViduVideoComponent from "./OvVideo";
import * as S from "./UserVideoComponent.style";

const UserVideoComponent = ({ streamManager }) => {
  const getNicknameTag = useMemo(() => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }, [streamManager]);

  return (
    <S.StreamComponentWrapper>
      {streamManager !== undefined ? (
        <S.StreamComponent>
          <S.TagWrapper>
            <S.NameTag>{getNicknameTag}</S.NameTag>
          </S.TagWrapper>
          <OpenViduVideoComponent streamManager={streamManager} />
        </S.StreamComponent>
      ) : null}
    </S.StreamComponentWrapper>
  );
};

export default UserVideoComponent;
