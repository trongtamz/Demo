

import AppSettings from '../configs/AppSettings';
import axiosInstance, { cancelToken } from './https';
import * as generatedApi from './nswag';

const blobSasTokenClient = new generatedApi.SasTokenClient(AppSettings.apiUrl, axiosInstance);
export {
  blobSasTokenClient,
  cancelToken,
};
