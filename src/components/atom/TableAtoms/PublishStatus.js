import { useEffect, useState } from 'react';
import SelectBox from '../SelectBox';

const PublishStatus = ({ options, value, onChange }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    switch (value) {
      case 'Y':
        setColor('var(--activeColor)');
        break;
      case 'N':
        setColor('var(--nonActiveColor)');
        break;
      default:
        setColor('var(--activeColor)');
    }
  }, [value]);

  const handleChange = newValue => {
    switch (newValue) {
      case 'Y':
        setColor('var(--activeColor)');
        break;
      case 'N':
        setColor('var(--nonActiveColor)');
        break;
      default:
        setColor('var(--nonActiveColor)');
    }
    onChange(newValue); // 부모 컴포넌트의 onChange 호출
  };

  return <SelectBox onChange={handleChange} style={{ color }} options={options} defaultValue={value} />;
};

export default PublishStatus;
