import React, { useState, useEffect, Fragment } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";
import * as S from "./TravelPlanTemplate.style";
import KakaoMap from "./KakaoMap";
import QRCodeGenerator from "./QRCodeGenerator";
import disImage from "assets/images/distance.png";
import tripImage from "assets/images/trip.png";

const TravelPlanTemplate = ({ room, isShow, setLoadCollabo }) => {
  const [travelStart, setTravelStart] = useState("");
  const [travelStay, setTravelStay] = useState("");
  const [travelItems, setTravelItems] = useState([]);
  const [curItem, setCurItem] = useState("");
  const [travelContents, setTravelContents] = useState([]);
  const [curContent, setCurContent] = useState("");
  const [travelObj, setTravelObj] = useState({});
  const [budgetConfirm, setBudgetConfirm] = useState("0");
  const [doc] = useState(new Y.Doc());

  useEffect(() => {
    const indexeddbProvider = new IndexeddbPersistence(room, doc);

    indexeddbProvider.whenSynced.then(() => {
      console.log("loaded data from indexed db");
    });
    const wsProvider = new WebsocketProvider(
      "wss://i8b109.p.ssafy.io:1233",
      room,
      doc
    );

    const travelObjType = doc.getMap("travelObj");
    const travelItemsType = doc.getMap("travelItems");
    const travelContentsType = doc.getMap("travelContent");
    const travelStayType = doc.getArray("travelStay");
    const travelStartType = doc.getArray("travelStart");

    travelObjType.observe((event) => {
      setTravelObj(travelObjType.toJSON());
    });

    travelItemsType.observe((event) => {
      setTravelItems(travelItemsType.get("items"));
    });

    travelContentsType.observe((event) => {
      setTravelContents(travelContentsType.get("contents"));
    });

    travelStayType.observe((event) => {
      if (event.target.length > 0) {
        setTravelStay(event.target.get(0));
      }
    });

    travelStartType.observe((event) => {
      if (event.target.length > 0) {
        setTravelStart(event.target.get(0));
      }
    });

    wsProvider.on("status", (event) => {
      console.log(event.status);
    });

    return () => {
      wsProvider.disconnect();
    };
  });
  const handleTravelStayChange = (value) => {
    setTravelStay(value);
    const travelStayType = doc.getArray("travelStay");
    travelStayType.delete(0, travelStayType.length);
    travelStayType.insert(0, [value]);
  };

  const handleTravelStartChange = (value) => {
    setTravelStart(value);
    const travelStartType = doc.getArray("travelStart");
    travelStartType.delete(0, travelStartType.length);
    travelStartType.insert(0, [value]);
  };

  const handleTravelObjChange = (key, value) => {
    console.log(value);
    setTravelObj({ ...travelObj, [key]: value });
    const travelObjType = doc.getMap("travelObj");
    travelObjType.set(key, value);
  };

  const handleCurItemOnChange = (event) => {
    setCurItem(event.target.value);
  };

  const handleItemConfirm = () => {
    const value = curItem;
    setTravelItems([...travelItems, value]);
    const travelItemsType = doc.getMap("travelItems");
    travelItemsType.set("items", [...travelItems, value]);
    console.log(curItem);
    console.log(travelItemsType.get("items"));
  };

  const handleItemDeleteOnClick = (index) => {
    const newArr = travelItems.filter((val, i) => i !== index);
    console.log(newArr);
    setTravelItems([...newArr]);
    const travelItemsType = doc.getMap("travelItems");
    travelItemsType.set("items", [...newArr]);
  };

  // const handleStartPointChange = (point) => {
  //   setStartPoint({ ...point });
  //   const travelStartPointType = doc.getMap("startPoint");
  //   travelStartPointType.set("startPoint", point);
  // };

  const handleCurContentOnChange = (event) => {
    setCurContent(event.target.value);
  };

  const handleContentsConfirm = () => {
    const value = curContent;
    setTravelContents([...travelContents, value]);
    const travelContentsType = doc.getMap("travelContent");
    travelContentsType.set("contents", [...travelContents, value]);
  };

  const handleContentDeleteOnClick = (index) => {
    const newArr = travelContents.filter((val, i) => i !== index);
    console.log(newArr);
    setTravelContents([...newArr]);
    const travelContentsType = doc.getMap("travelContent");
    travelContentsType.set("contents", [...newArr]);
  };

  const handleBudgetOnClick = (event) => {
    handleTravelObjChange(
      "travelBudget",
      budgetConfirm.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    );
  };

  const handleBudgetOnKeyUp = (event) => {
    if (event.keyCode === 13) {
      // 엔터키가 눌렸을 때 실행할 내용
      handleTravelObjChange(
        "travelBudget",
        budgetConfirm.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      );
    }
  };

  const handleContentOnKeyUp = (event) => {
    if (event.keyCode === 13) {
      // 엔터키가 눌렸을 때 실행할 내용
      handleContentsConfirm();
    }
  };
  const handleItemOnKeyUp = (event) => {
    if (event.keyCode === 13) {
      // 엔터키가 눌렸을 때 실행할 내용
      handleItemConfirm();
    }
  };

  return (
    <S.TemplateWrapper>
      <S.TemplateContentWrapper>
        <S.TravelTitleWrapper>
          <S.HWrapper id="travelTitle">
            {isShow ? <S.CustomH1># 여행 계획 제목</S.CustomH1> : null}
          </S.HWrapper>
          {isShow ? (
            <S.CustomInputText
              type="text"
              value={travelObj.travelTitle}
              onChange={(event) => {
                handleTravelObjChange("travelTitle", event.target.value);
              }}
            />
          ) : (
            <S.PdfTitle> 
              {travelObj.travelTitle} 
              <S.TitleImg>
                <img src={tripImage} alt="trip" />
                <img src={disImage} alt="move" />
              </S.TitleImg>
            </S.PdfTitle>
          )}
        </S.TravelTitleWrapper>
        <S.CustomHr />
        <S.TravelMembersWrapper>
          <S.HWrapper id="travelMembers">
            <S.CustomH1># 여행 인원</S.CustomH1>
          </S.HWrapper>
          {isShow ? (
            <S.CustomInputText
              type="number"
              value={travelObj.travelMembers}
              onChange={(event) => {
                handleTravelObjChange("travelMembers", event.target.value);
              }}
            />
          ) : (
            <S.FontSingleDay>
              <br />
              {travelObj.travelMembers} 명
            </S.FontSingleDay>
          )}
        </S.TravelMembersWrapper>
        <S.CustomHr />
        <S.TravelDaysWrapper>
          <S.HWrapper id="travelDays">
            <S.CustomH1># 여행 일정</S.CustomH1>
          </S.HWrapper>
          <br />
          <br />
          <S.HWrapper>
            <S.CustomH2>출발</S.CustomH2>
          </S.HWrapper>
          {isShow ? (
            <S.CustomInputText
              type="date"
              value={travelObj.startDate}
              onChange={(event) => {
                handleTravelObjChange("startDate", event.target.value);
              }}
            />
          ) : (
            <S.Fontgugi>
              {travelObj.startDate}
            </S.Fontgugi>  
          )}
          <br />
          <S.HWrapper>
            <S.CustomH2> 복귀</S.CustomH2>
          </S.HWrapper>
          {isShow ? (
            <S.CustomInputText
              type="date"
              value={travelObj.endDate}
              onChange={(event) => {
                handleTravelObjChange("endDate", event.target.value);
              }}
            />
          ) : (
            <S.Fontgugi>
              {travelObj.endDate}
            </S.Fontgugi>  
          )}
        </S.TravelDaysWrapper>
        <S.CustomHr />
        <S.TravelStartPointWrapper>
          <S.HWrapper id="travelStart">
            <S.CustomH1># 여행 출발지</S.CustomH1>
          </S.HWrapper>

          {isShow && travelStart ? (
            <S.CustomInputText
              type="text"
              value={travelStart}
              onChange={handleTravelStartChange}
              readOnly
            />
          ) : null}
          <S.CustomMap>
            {!isShow && travelStart ? (
              <S.FontSingleDay>
              {travelStart}
              <br />
              <br />
              <QRCodeGenerator
                initialUrl={`https://map.naver.com/v5/search/${travelStart}`}
              />                
            </S.FontSingleDay>
            ) : null}

            {isShow ? (
              <KakaoMap
                handleChange={handleTravelStartChange}
                point={travelObj.startPoint}
                travelName={travelStart}
                handleSetPoint={handleTravelObjChange}
                objKeyword="startPoint"
              />
            ) : null}
          </S.CustomMap>
        </S.TravelStartPointWrapper>
        <S.CustomHr />
        <S.TravelStayWrapper>
          <S.HWrapper id="travelStay">
            <S.CustomH1># 숙소</S.CustomH1>
          </S.HWrapper>

          <S.CustomMap>
            {isShow && travelStay ? (
              <S.CustomInputText
                type="text"
                value={travelStay}
                onChange={handleTravelStayChange}
                readOnly
              />
            ) : null}
            {!isShow && travelStay ? (
              <S.FontSingleDay>
              {travelStay}
              <br />
              <br />
              <QRCodeGenerator
                initialUrl={`https://map.naver.com/v5/search/${travelStay}`}
              />
            </S.FontSingleDay>
            ) : null}

            {isShow ? (
              <KakaoMap
                handleChange={handleTravelStayChange}
                point={travelObj.stayPoint}
                travelName={travelStay}
                handleSetPoint={handleTravelObjChange}
                objKeyword="stayPoint"
              />
            ) : null}
          </S.CustomMap>
        </S.TravelStayWrapper>
        <S.CustomHr />
        <S.TravelItemsWrapper>
          <S.HWrapper id="travelContent">
            <S.CustomH1># 여행 컨텐츠</S.CustomH1>

            {isShow ? (
              <>
                <S.CustomAddListInput
                  type="text"
                  value={curContent}
                  onChange={handleCurContentOnChange}
                  onKeyUp={handleContentOnKeyUp}
                />

                <S.ListAddButton onClick={handleContentsConfirm}>
                  추가
                </S.ListAddButton>
              </>
            ) : null}
          </S.HWrapper>

          <S.CustomUl>
            {travelContents &&
              travelContents.length !== 0 &&
              travelContents.map((item, index) => (
                <S.ListItemWrapper key={index}>
                  <S.CustomList>{item}</S.CustomList>
                  {isShow ? (
                    <S.CustomListDeleteButton
                      onClick={() => handleContentDeleteOnClick(index)}
                    >
                      삭제
                    </S.CustomListDeleteButton>
                  ) : null}
                </S.ListItemWrapper>
              ))}
          </S.CustomUl>
        </S.TravelItemsWrapper>
        <S.TravelItemsWrapper>
          <S.HWrapper id="travelItems">
            <S.CustomH1># 여행 준비물</S.CustomH1>
            {isShow ? (
              <>
                <S.CustomAddListInput
                  type="text"
                  value={curItem}
                  onChange={handleCurItemOnChange}
                  onKeyUp={handleItemOnKeyUp}
                />
                <S.ListAddButton onClick={handleItemConfirm}>
                  추가
                </S.ListAddButton>
              </>
            ) : null}
          </S.HWrapper>

          <S.CustomUl>
            {travelItems &&
              travelItems.length !== 0 &&
              travelItems.map((item, index) => (
                <S.ListItemWrapper key={index}>
                  <S.CustomList>{item}</S.CustomList>
                  {isShow ? (
                    <S.CustomListDeleteButton
                      onClick={() => handleItemDeleteOnClick(index)}
                    >
                      삭제
                    </S.CustomListDeleteButton>
                  ) : null}
                </S.ListItemWrapper>
              ))}
          </S.CustomUl>
        </S.TravelItemsWrapper>
        <S.CustomHr />
        <S.TravelBudgetWrapper>
          <S.HWrapper id="travelBudget">
            <S.CustomH1># 여행 예산</S.CustomH1>
            <S.BudgetConfirmWrapper>
              ￦ <S.BudgetConfirm>{travelObj.travelBudget}</S.BudgetConfirm> 원
            </S.BudgetConfirmWrapper>
          </S.HWrapper>
          {isShow ? (
            <>
              <S.CustomInputText
                type="text"
                value={budgetConfirm}
                onChange={(event) => setBudgetConfirm(event.target.value)}
                onKeyUp={handleBudgetOnKeyUp}
              />
              <S.ConfirmButton onClick={handleBudgetOnClick}>
                예산 확정
              </S.ConfirmButton>
            </>
          ) : null}
        </S.TravelBudgetWrapper>
      </S.TemplateContentWrapper>
    </S.TemplateWrapper>
  );
};

export default TravelPlanTemplate;
