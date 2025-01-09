import { useState } from 'react';
import { Radio } from 'antd';

const Radios = ({ options, ...props }) => {
  return (
    <Radio.Group value={props.value} {...props}>
      {options?.map(item => {
        return (
          <Radio key={item.id ? item.id : item.value} value={item.value}>
            {item.label}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export default Radios;
