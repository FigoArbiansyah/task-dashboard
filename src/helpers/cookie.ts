import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("gaska_token");
};

export const setToken = (value: string) => {
  Cookies.set("gaska_token", value, { expires: 1 });
};

export const checkIsLogin = () => {
  if (getToken()) {
    return true;
  }
  return false;
};
