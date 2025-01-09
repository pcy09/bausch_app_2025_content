import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCommonCodeListAction } from '@/store/reducers/commonCodeReducer';

function useCommonCode(category) {
  const codeArr = useSelector(state => state.commonCode.commonCodeList);
  const dispatch = useDispatch();

  const [commonCode, setCommonCode] = useState();
  const [findStatusCodeName, setFindStatusCodeName] = useState();

  useEffect(() => {
    if (category) {
      dispatch(getCommonCodeListAction());
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (codeArr && category) {
      const findArr = codeArr[category];

      setCommonCode(findArr);

      const findNameArr = findArr?.reduce((acc, cur) => {
        acc[cur.key] = cur.value; // key와 value로 수정
        return acc;
      }, {});

      setFindStatusCodeName(findNameArr);
    }
  }, [codeArr, category]);

  return [commonCode, findStatusCodeName];
}

export default useCommonCode;
