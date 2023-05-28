import client from "../client";

export const verifyAuthNumber = async (data) => {
  const response = await client.post(`/email/auth`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const emailSend = async (data) => {
  const response = await client.post(`/email/send`, data, {
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return response;
};

export const findPassword = async (data) => {
  const response = await client.post(`/email/pwd`, data, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });

  return response;
};

export const inviteUser = async (accessToken, data) => {
  const response = await client.post(`/email/invite`, data, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });

  return response;
};
