import * as React from 'react';
import ClockNumber from './ClockNumber';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../../typings/date';

export const getHourNumbers = ({
  ampm,
  utils,
  date,
}: {
  ampm: boolean;
  utils: IUtils<MaterialUiPickersDate>;
  date: MaterialUiPickersDate;
}) => {
  const currentHours = utils.getHours(date);

  const hourNumbers: JSX.Element[] = [];
  const startHour = ampm ? 1 : 0;
  const endHour = ampm ? 12 : 23;

  const isSelected = (hour: number) => {
    if (ampm) {
      if (hour === 12) {
        return currentHours === 12 || currentHours === 0;
      }

      return currentHours === hour || currentHours - 12 === hour;
    }

    return currentHours === hour;
  };

  for (let hour = startHour; hour <= endHour; hour += 1) {
    let label = hour.toString();

    if (hour === 0) {
      label = '00';
    }

    const props = {
      index: hour,
      label: utils.formatNumber(label),
      selected: isSelected(hour),
      isInner: !ampm && (hour === 0 || hour > 12),
    };

    hourNumbers.push(<ClockNumber key={hour} {...props} />);
  }

  return hourNumbers;
};

export const getMinutesNumbers = ({
  value,
  utils,
}: {
  value: number;
  utils: IUtils<MaterialUiPickersDate>;
}) => {
  const f = utils.formatNumber;

  return [
    <ClockNumber label={f('00')} selected={value === 0} index={12} key={12} />,
    <ClockNumber label={f('15')} selected={value === 15} index={3} key={3} />,
    <ClockNumber label={f('30')} selected={value === 30} index={6} key={6} />,
    <ClockNumber label={f('45')} selected={value === 45} index={9} key={9} />,
  ];
};
