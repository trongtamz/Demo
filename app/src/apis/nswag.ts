//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.0.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import type { AxiosRequestConfig as AxiosRequestConfig_ } from 'axios';import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export class ClientBase {
  protected transformOptions(options: AxiosRequestConfig_) {
    return defaultTransformOptions(options);
  }

  public setTransformOptions = (func: (options: AxiosRequestConfig_) => Promise<any>) => {
    this.transformOptions = func;
  };
}

export class SasTokenClient extends ClientBase {
    protected instance: AxiosInstance;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        super();

        this.instance = instance || axios.create();

        this.baseUrl = baseUrl ?? "";

    }

    getSASToken(includeInactive?: boolean | undefined, blobSubFolderName?: string | null | undefined, blobSasPermissions?: BlobSasPermissions | null | undefined, cancelToken?: CancelToken): Promise<string> {
        let url_ = this.baseUrl + "/api/sas-token?";
        if (includeInactive === null)
            throw new Error("The parameter 'includeInactive' cannot be null.");
        else if (includeInactive !== undefined)
            url_ += "IncludeInactive=" + encodeURIComponent("" + includeInactive) + "&";
        if (blobSubFolderName !== undefined && blobSubFolderName !== null)
            url_ += "BlobSubFolderName=" + encodeURIComponent("" + blobSubFolderName) + "&";
        if (blobSasPermissions !== undefined && blobSasPermissions !== null)
            url_ += "BlobSasPermissions=" + encodeURIComponent("" + blobSasPermissions) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetSASToken(_response);
        });
    }

    protected processGetSASToken(response: AxiosResponse): Promise<string> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<string>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<string>(null as any);
    }

    addPerson(command: AddPersonCommand, cancelToken?: CancelToken): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/sas-token";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: AxiosRequestConfig = {
            data: content_,
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddPerson(_response);
        });
    }

    protected processAddPerson(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

/** BlobSasPermissions contains the list of permissions that can be set for a blob's access policy.  Use SetPermissions to set the permissions on the BlobSasBuilder. */
export enum BlobSasPermissions {
    Read = 1,
    Add = 2,
    Create = 4,
    Write = 8,
    Delete = 16,
    Tag = 32,
    DeleteBlobVersion = 64,
    List = 128,
    Move = 256,
    Execute = 512,
    SetImmutabilityPolicy = 1024,
    PermanentDelete = 2048,
    All = -1,
}

export interface AddPersonCommand {
    id?: number | undefined;
    firstName?: string;
    lastName?: string;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}

export function defaultTransformOptions(options: AxiosRequestConfig_) {
  return Promise.resolve(options);
}