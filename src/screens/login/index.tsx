import { FormEvent } from "react";

export const LoginScreen = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id={"password"} />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
