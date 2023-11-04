import { IOption } from 'types/IOption';

export const getEnumLabelsOptions = (enumLabels: { [key: string]: string }) => {
  const keys = Object.keys(enumLabels);

  return keys.map((key) => ({ value: key, label: enumLabels[key] } as IOption));
};
