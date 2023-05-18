import { useEffect, useState } from "react";
import * as T from "../table.style/table.style";
import * as S from "./MyPageMain.style";
import { useSelector } from "react-redux";
import { getMemberDetail } from "utils/api/memberApi";

const MyPageMain = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [pNumber, setPNumber] = useState("");
  const [email, setEmail] = useState("");

  const [genderKor, setGenderKor] = useState("");
  useEffect(() => {
    if (gender === "M") {
      setGenderKor("남성");
    } else {
      setGenderKor("여성");
    }
  }, [gender]);

  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  useEffect(() => {
    getMemberDetail(accessToken).then((res) => {
      setId(res.data.id);
      setName(res.data.name);
      setNickName(res.data.nickname);
      setGender(res.data.gender);
      setBirthDay(res.data.birthDay);
      setPNumber(res.data.pnumber);
      setEmail(res.data.email);
    });
  }, [accessToken]);

  return (
    <S.Container>
      <T.table>
        <T.tr>
          <T.td>
            <label>ID</label>
          </T.td>
          <T.td>
            <input type="text" value={id} disabled />
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>NAME</label>
          </T.td>
          <T.td>
            <input type="text" value={name} disabled />
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>NICKNAME</label>
          </T.td>
          <T.td>
            <input type="text" value={nickName} disabled />
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>GENDER</label>
          </T.td>
          <T.td>
            <input type="text" value={genderKor} disabled />
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>BIRTHDAY</label>
          </T.td>
          <T.td>
            <input type="text" value={birthDay} disabled />
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>PHONE NUMBER</label>
          </T.td>
          <T.td>
            <input type="text" value={pNumber} disabled />
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>EMAIL</label>
          </T.td>
          <T.td>
            <input type="text" value={email} disabled />
          </T.td>
        </T.tr>
      </T.table>
    </S.Container>
  );
};

export default MyPageMain;
