import { AddImg, AddWrapper } from "./AddPlanBtn.style";
import plus from "assets/images/plus.png";

function AddPlanBtn() {
  function doSomething() {
    console.log("add plan");
  }
  return (
    <AddWrapper onClick={doSomething}>
      <AddImg src={plus} />
    </AddWrapper>
  );
}

export default AddPlanBtn;
