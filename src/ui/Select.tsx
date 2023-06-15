import React from 'react';

const Select = ({
  onChange,
  className,
  options,
  value, measureType = 'px', title = ''
}: {
  className: string;
  onChange: (event: { target: { value: string } }) => void;
  options: [string, string][];
  value: string;
  measureType?: string;
  title?: string;
}): JSX.Element => {
  return (
    <select className={className} onChange={onChange} value={value} title={title}>
      {options.map(([option, text]) => (
        <option key={option} value={option}>
          {text.replace(measureType, '')}
        </option>
      ))}
    </select>
  );
};

export default Select;
