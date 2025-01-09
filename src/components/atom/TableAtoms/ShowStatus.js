import { useEffect, useState } from 'react';
import SelectBox from '../SelectBox';

const ShowStatus = ({ options, value }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    switch (value) {
      case 'Y':
        setColor('var(--activeColor');
        break;
      case 'N':
        setColor('var(--nonActiveColor');
        break;
      default:
        setColor('var(--activeColor');
    }
  }, [value]);

  const handleChange = value => {
    switch (value) {
      case 'Y':
        setColor('var(--activeColor)');
        break;
      case 'N':
        setColor('var(--nonActiveColor)');
        break;
      default:
        setColor('var(--nonActiveColor)');
    }
  };

  return <SelectBox onChange={handleChange} style={{ color: color }} options={options} defaultValue={value} />;
};

export default ShowStatus;
