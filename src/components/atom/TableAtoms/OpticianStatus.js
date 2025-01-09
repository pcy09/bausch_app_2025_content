import { useEffect, useState } from 'react';
import SelectBox from '../SelectBox';

const OpticianStatus = ({ options, value }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    switch (value) {
      case 'work':
        setColor('var(--activeColor');
        break;
      case 'retire':
        setColor('var(--nonActiveColor');
        break;
      default:
        setColor('var(--activeColor');
    }
  }, [value]);

  const handleChange = value => {
    switch (value) {
      case 'work':
        setColor('var(--activeColor)');
        break;
      case 'retire':
        setColor('var(--nonActiveColor)');
        break;
      default:
        setColor('var(--nonActiveColor)');
    }
  };

  return <SelectBox onChange={handleChange} style={{ color: color }} options={options} defaultValue={value} />;
};

export default OpticianStatus;
