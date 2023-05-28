import client from "../client";

export const deleteMember = async (accessToken) => {
  const response = await client.delete(`/session`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });

  return response;
};

export const login = async (data) => {
  const response = await client.post(
    `/session/login`,
    data
  );
  return response;
};

export const logout = async (accessToken) => {
  const response = await client.post(
    `/session/logout`,
    {},
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );

  return response;
};

export const regist = async (data) => {
  const response = await client.post(
    `/session/regist`,
    data,
    {
      headers: {
        // HTTP 메시지(요청과 응답 모두)에 담겨 보내는 데이터의 형식을 알려주는 헤더
        "Content-Type": "application/json; charset=utf-8",
        // 브라우저의 origin 에 상관없이 모든 리소스에 접근하도록 허용
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response;
};
