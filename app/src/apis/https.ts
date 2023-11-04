import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { getSavedAuthInfoFromLocalStorage } from '../common/utils/auth';



const axiosInstance = axios.create({
  timeout: 180000,
  headers: {
    'content-type': 'application/json',
  },
  transformResponse: (data) => data,
});

declare module 'axios' {
  export interface AxiosInstance {
    ignoreError: boolean;
  }
}

export const statusCodes = {
  status503ServiceUnavailable: 503,
  status400BadRequest: 401,
  status401Unauthorized: 401,
  status403Forbidden: 403,
  status500InternalError: 500,
};

const requestInterceptor = (config: AxiosRequestConfig) => {
  const savedAuthInfo = getSavedAuthInfoFromLocalStorage();
  if (savedAuthInfo && savedAuthInfo.accessToken) {
    (config.headers as AxiosRequestHeaders)['Authorization'] = 'Bearer ' + savedAuthInfo.accessToken;
  }
  return config;
};

axiosInstance.interceptors.request.use(requestInterceptor as any, (error) => error);

// let deferred: Promise<AuthResponse> | null = null;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isCancel(error)) {
      return new Promise(() => {});
    }
    const { config, data, status } = error.response;

    if (
      error.request.responseType === 'blob' &&
      data instanceof Blob &&
      data.type &&
      data.type.toLowerCase().indexOf('json') !== -1
    ) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          // const res = JSON.parse(reader.result as string);
          // if (res === errorFileNotFound) {
          //   showNotification({
          //     message: i18next.t('message.noFileDownload'),
          //     severity: 'error',
          //     autoHideDuration: 3000,
          //   });
          // }
          resolve(Promise.reject(error));
        };

        reader.onerror = () => {
          reject(error);
        };

        reader.readAsText(data);
      });
    }

    if (status === statusCodes.status401Unauthorized) {
      return await handle401Error(config);
    }

    if (axiosInstance.ignoreError) {
      return Promise.reject(error);
    }

    await handleErrorStatusCode(status, data);

    return Promise.reject(error);
  }
);

const handleErrorStatusCode = async (status: any, data: string) => {
  // const isInValidUser = data.includes(USER_IS_NOT_VALID);
  // if (isInValidUser) {
  //   showNotification({
  //     message: i18next.t('message.sessionExpiredError'),
  //     severity: 'error',
  //     autoHideDuration: 5000,
  //   });
  //   const timeout = setTimeout(() => {
  //     removeAuthInfoFromLocalStorage();
  //     window.location.replace(`${window.location.origin}/${ANONYMOUS_ROUTES.Login.path}`);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }

  // switch (status) {
  //   case statusCodes.status400BadRequest:
  //     showNotification({
  //       message: i18next.t('message.badRequest'),
  //       severity: 'error',
  //       autoHideDuration: 3000,
  //     });
  //     break;
  //   case statusCodes.status503ServiceUnavailable:
  //     showNotification({
  //       message: i18next.t('message.serviceUnavailable'),
  //       severity: 'error',
  //       autoHideDuration: 3000,
  //     });
  //     window.setTimeout(() => {
  //       window.location.href = '/';
  //     }, 6000);
  //     break;
  //   case statusCodes.status500InternalError:
  //     showNotification({
  //       message: i18next.t('message.internalError'),
  //       severity: 'error',
  //       autoHideDuration: 3000,
  //     });
  //     break;
  //   default:
  //     const responseDataObject = JSON.parse(data);
  //     showNotification({
  //       message: responseDataObject?.detail || responseDataObject?.title || i18next.t('message.unexpectedError'),
  //       severity: 'error',
  //       autoHideDuration: 5000,
  //     });
  //     break;
  // }
};

const handle401Error = async (config: any) => {
  try {
    // const authClient = (await import('apis')).authClient;
    // const { email, accessToken, refreshToken } = getSavedAuthInfoFromLocalStorage();
    // deferred =
    //   deferred ||
    //   authClient.refreshToken({
    //     email: email,
    //     accessToken: accessToken,
    //     refreshToken: refreshToken,
    //   });
    // const loginResponse = await deferred;
    // saveAuthInfoToLocalStorage(loginResponse);
    // (config.headers as AxiosRequestHeaders)['Authorization'] = 'Bearer ' + loginResponse.accessToken;
    return axiosInstance(config);
  } catch (err) {
    // showNotification({
    //   message: i18next.t('message.sessionExpiredError'),
    //   severity: 'error',
    //   autoHideDuration: 5000,
    // });
    // const timeout = setTimeout(() => {
    //   removeAuthInfoFromLocalStorage();
    //   window.location.replace(`${window.location.origin}/${ANONYMOUS_ROUTES.Login.path}`);
    // }, 1000);
    // return () => {
    //   clearTimeout(timeout);
    // };
  } finally {
    // deferred = null;
  }
};

export const cancelToken = axios.CancelToken;

export default axiosInstance;
