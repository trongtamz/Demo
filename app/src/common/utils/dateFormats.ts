import { emptyStringField } from 'common/consts/common';
import { format } from 'date-fns';

export const dateFormat = 'MM/dd/yy';
export const dateFormatWithHours = 'MM/dd/yyyy-hh:mm a';

export const dateFormatEmpty = '01/01/0001';

export const getDateFormatValue = (value: string, dateFormat: string) => {
  if (value && value !== emptyStringField) {
    const dateValue = format(new Date(value), dateFormat);
    if (dateValue === dateFormatEmpty) return '';
    return dateValue;
  }
  return emptyStringField;
};
