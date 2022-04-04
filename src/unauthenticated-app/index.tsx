import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Button, Card, Divider } from "antd";
import styled from "@emotion/styled";
import logo from "assets/img/logo.svg";
import left from "assets/img/left.svg";
import right from "assets/img/right.svg";
import { useDocumentTitle } from "../utils";
import { ErrorBox } from "../components/lib";
//未登录时的页面
export const UnauthenticatedApp = () => {
  const [isRegisterer, setIsRegisterer] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("请登录注册以继续");

  return (
    <Container>
      <Header />
      <Background />
      <Button
        onClick={() => {
          throw new Error("点击抛出一个异常");
        }}
      >
        抛出异常
      </Button>
      <ShadowCard>
        <Title>{isRegisterer ? "请注册" : "请登录"}</Title>

        <ErrorBox error={error} />
        {isRegisterer ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegisterer(!isRegisterer)}>
          {isRegisterer ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed; //决定会不会随着页面滑动而滑动
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
