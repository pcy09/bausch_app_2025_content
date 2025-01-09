// useCommonCodeBatch.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { codeListResetAction, getCommonCodeListAction } from '@/store/reducers/commonCodeReducer';

const useCommonCodeBatch = categories => {
  const codeArr = useSelector(state => state?.commonCode?.commonCodeList);
  const dispatch = useDispatch();

  const [commonCodes, setCommonCodes] = useState({});

  useEffect(() => {
    dispatch(getCommonCodeListAction());
    return () => {
      dispatch(codeListResetAction());
    };
  }, [dispatch]);

  useEffect(() => {
    if (codeArr) {
      const newCommonCodes = {};

      categories.forEach(category => {
        const findArr = codeArr[category];
        newCommonCodes[category] = findArr;
      });
      setCommonCodes(newCommonCodes);
    }
  }, [codeArr]);

  return commonCodes;
};

export default useCommonCodeBatch;
