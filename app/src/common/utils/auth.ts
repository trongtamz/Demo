import { AxiosInstance } from 'axios';
import { getUnixTime } from 'date-fns';
import { JwtPayload, jwtDecode } from 'jwt-decode';

const loginInfoKey = 'loginInfo';

export const getSavedAuthInfoFromLocalStorage = () => {
  const loginInfo =
    window.localStorage.getItem(loginInfoKey) && JSON.parse(window.localStorage.getItem(loginInfoKey) ?? '');

  return loginInfo
    ? {
        ...loginInfo,
      }
    : null;
};

export const saveAuthInfoToLocalStorage = (data: any) => {
  window.localStorage.setItem(loginInfoKey, JSON.stringify(data));
};

export const removeAuthInfoFromLocalStorage = () => {
  window.localStorage.removeItem(loginInfoKey);
};

export const isTokenExpired = (accessToken = '') => {
  if (!accessToken) return false;

  const { exp } = jwtDecode<JwtPayload>(accessToken);
  if (!exp) return false;

  const isExpired = exp < getUnixTime(new Date());

  return isExpired;
};

export const getTokenExp = (accessToken = '') => {
  if (!accessToken) return 0;

  const { exp } = jwtDecode<JwtPayload>(accessToken);
  if (!exp) return 0;

  return exp;
};

export function addExternalToken(instance: AxiosInstance, token: string) {
  instance.interceptors.request.use((config) => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `ExternalAccess ${token}`;
    }
    return config;
  });
}
