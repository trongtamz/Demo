export interface ResponseHandler {
  ErrorType: string;
  ErrorMessage: string;
}
export const getErrorMessage = (responseJson: string): string => {
  const response = JSON.parse(responseJson) as ResponseHandler;
  if (response.ErrorType) {
    if (response.ErrorType === 'Failure') {
      return response.ErrorMessage;
    }
  } else {
    return formatQuotesFromString(responseJson);
  }
  return '';
};

// "{"ErrorType":"Failure","ErrorMessage":"User (admin) was not found"}"
export const removeLastParamFromPath = (path: string) => {
  const indexStartParam = path.indexOf('/:');
  return path.substring(0, indexStartParam);
};

export const capitalizeWords = (word: string) => {
  return word
    .split(' ')
    .map((element) => {
      return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    })
    .join(' ');
};

export const formatQuotesFromString = (text: string) => {
  if (text.at(0) === '"' && text.at(-1) === '"') {
    return (text = text.slice(1, -1));
  }
  return text;
};

export const formatAddressDisplay = (nickName?: string, address1?: string, city?: string) => {
  if (nickName && address1 && city) {
    return `${nickName} - ${address1}, ${city}`;
  }
  return '';
};

export const formatUnitOfMeasureDisplay = (name?: string, price?: number) => {
  if (name && price) {
    return `${name} - $${price}`;
  }
  return '';
};

export const formatAddressFullInfo = (
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zip?: string
) => {
  if (address1 && city && state && zip) {
    return `${address1} ${address2 || ''}, ${city} ${state} ${zip}`;
  }
  return '';
};

export const formatUnitNumberId = (receivingNumber: string, currentTotal: number) => {
  return `${receivingNumber}-${currentTotal}`;
};
