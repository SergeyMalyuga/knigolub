import {format} from 'date-fns';

export const formatDate = (date: Date | string | null) => {
  if (!date) return '';
  return format(new Date(date), 'yyyy-MM-dd');
};
