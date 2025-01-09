import { useEffect, useState } from 'react';

/**
 * useAddKeyList 커스텀 훅
 * 객체 리스트에 key 속성을 추가
 * @param {Array} list - 객체 리스트
 * @param {String} keyName - key로 사용할 필드명
 * @param {String} [optionalFieldName] - 조건에 따라 추가할 필드명 (옵션)
 * @returns {Array} - key 속성이 추가된 객체 리스트
 */
const useAddKeyList = (list, keyName, optionalFieldName) => {
  const [keyList, setKeyList] = useState([]);

  useEffect(() => {
    if (Array.isArray(list)) {
      const updatedList = list.map(item => {
        let newItem = { ...item, key: item[keyName] };
        if (optionalFieldName) {
          newItem = { ...newItem, [optionalFieldName]: `${item[optionalFieldName]}개` };
        }
        return newItem;
      });
      setKeyList(updatedList);
    }
  }, [keyName, list, optionalFieldName]);

  return keyList;
};

export default useAddKeyList;
