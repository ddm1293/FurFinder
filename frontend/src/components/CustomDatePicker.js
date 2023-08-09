import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate = (currentDate) => {
  return currentDate && currentDate.isAfter(dayjs().endOf('day'));
};

const disabledTime = (selectedDate) => {
  if (selectedDate && selectedDate.isSame(dayjs(), 'day')) {
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().minute();
    return {
      disabledHours: () => range(currentHour + 1, 24),
      disabledMinutes: () => range(currentMinute + 1, 60),
    };
  }
  return {};
};

export const CustomRangePicker = (props) => (
  <DatePicker.RangePicker
    disabledDate={disabledDate}
    disabledTime={disabledTime}
    showTime={{ format: 'HH:mm' }}
    allowEmpty={[false, true]}
    format="YYYY-MM-DD HH:mm"
    {...props}
  />
);

export const CustomDatePicker = (props) => (
  <DatePicker
    showTime={{ format: 'HH:mm' }}
    format="YYYY-MM-DD HH:mm"
    disabledDate={disabledDate}
    disabledTime={disabledTime}
    {...props}
  />
);
