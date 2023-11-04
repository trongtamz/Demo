import type { AxiosRequestConfig as AxiosRequestConfig_ } from 'axios';

export function defaultTransformOptions(options: AxiosRequestConfig_) {
  return Promise.resolve(options);
}

export class ClientBase {
  protected transformOptions(options: AxiosRequestConfig_) {
    return defaultTransformOptions(options);
  }

  public setTransformOptions = (func: (options: AxiosRequestConfig_) => Promise<any>) => {
    this.transformOptions = func;
  };
}