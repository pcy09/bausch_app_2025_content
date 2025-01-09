import { Checkbox } from 'antd';
import { useState } from 'react';

// 단일 체크박스 아톰
const Checkboxes = ({ autoFocus, checked, defaultChecked, disabled, indeterminate, onChange }) => {
  const handleChange = e => {
    onChange && onChange(e.target.checked);
  };

  return (
    <Checkbox
      autoFocus={autoFocus}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      indeterminate={indeterminate}
      onChange={handleChange}
    />
  );
};

export default Checkboxes;
