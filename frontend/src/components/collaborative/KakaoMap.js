import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import * as S from "./KakaoMap.style";

const { kakao } = window;

const KakaoMap = ({
  handleChange,
  point,
  travelName,
  handleSetPoint,
  objKeyword,
}) => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([
    {
      position: {
        lat: point.lat,
        lng: point.lng,
      },
      content: point.content,
    },
  ]);
  useEffect(() => {
    setMarkers([
      {
        position: {
          lat: point.lat,
          lng: point.lng,
        },
        content: point.content,
      },
    ]);
  }, [point]);
  console.log(point);
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [confirmPlace, setConfirmPlace] = useState("");
  const [confirmLat, setConfirmLat] = useState(point.lat);
  const [confirmLng, setConfirmLng] = useState(point.lng);
  function enterKey(e) {
    if (e.keyCode === 13) {
      // 엔터키가 눌렸을 때 실행할 내용
      setSearchWord(keyword);
    }
  }
  const handleKeywordOnChage = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearchOnClick = (e) => {
    setSearchWord(keyword);
  };

  const handleConfirmOnClick = (e) => {
    handleChange(confirmPlace);
    handleSetPoint(objKeyword, {
      lat: confirmLat,
      lng: confirmLng,
      content: confirmPlace,
    });
    setMarkers([
      {
        position: {
          lat: confirmLat,
          lng: confirmLng,
        },
        content: confirmPlace,
      },
    ]);
  };

  useEffect(() => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchWord, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, searchWord]);

  return (
    <>
      <S.HWrapper>
        <S.MapSearchBarDiv>
          <S.MapSearchBar
            type="text"
            value={keyword}
            onChange={handleKeywordOnChage}
            onKeyUp={enterKey}
          />
          <S.SearchButton onClick={handleSearchOnClick}>검색</S.SearchButton>
          <S.ConfirmButton onClick={handleConfirmOnClick}>
            위치 확정
          </S.ConfirmButton>
        </S.MapSearchBarDiv>
        <S.CheckPlaceSpace>
          현재 선택 장소 : <S.ConfirmPlace>{confirmPlace}</S.ConfirmPlace>
        </S.CheckPlaceSpace>
      </S.HWrapper>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: point.lat,
          lng: point.lng,
        }}
        style={{
          width: "57%",
          height: "400px",
          margin: "0 auto",

          borderRadius: "15px",
        }}
        level={3}
        onCreate={setMap}
      >
        {console.log(markers)}
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => {
              setInfo(marker);
              setConfirmPlace(marker.content);
              setConfirmLat(marker.position.lat);
              setConfirmLng(marker.position.lng);
              //marker.content => 지역명
              // marker.place.lat or marker.place.lng
            }}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </>
  );
};

KakaoMap.defaultProps = {
  point: {
    lat: 37.566826,
    lng: 126.9786567,
    confirmPlace: "서울특별시청",
  },
  travelName: "서울특별시청",
};

export default KakaoMap;
