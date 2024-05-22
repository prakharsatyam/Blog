import { Container } from "../components";
import BgChanger from "./smallprojects/BgChanger";
import PassGen from "./smallprojects/PassGen";
import CurrConv from "./smallprojects/currconv/CurrConv";
import Todo from "./smallprojects/todo/App";
function Portfolio() {
  return (
    <div>
      <Container>
        <div>
          <BgChanger />
        </div>
        <div>
          <PassGen />
        </div>
        <div>
          <CurrConv />
        </div>
        <div></div>
        <div>
          <Todo />
        </div>
      </Container>
    </div>
  );
}

export default Portfolio;
