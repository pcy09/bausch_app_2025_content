import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const usePagination = (selector, action, id, initialParams) => {
  const dispatch = useDispatch();
  const { pageable, totalElements } = useSelector(selector);
  const [searchParams, setSearchParams] = useState({});
  const [currentParams, setCurrentParams] = useState(initialParams || {});

  const getInitData = useCallback(
    (params = {}, search = {}) => {
      setSearchParams(search);
      setCurrentParams(prevParams => ({ ...prevParams, ...params }));

      const { page = 0, size = 20, ...rest } = params;
      const payload = id
        ? { id, params: { page, size, ...rest, ...search, ...initialParams } }
        : { params: { page, size, ...rest, ...search, ...initialParams } };

      dispatch(action(payload));
    },
    [dispatch, action, id, initialParams],
  );

  const handlePageChange = (pagination, additionalParams = {}) => {
    const updatedParams = {
      ...currentParams,
      ...initialParams,
      ...additionalParams,
      page: pagination.offset - 1, // antd의 pagination current는 1-based
      size: pagination.pageSize,
    };
    getInitData(updatedParams, searchParams);
  };

  const pagination = {
    current: pageable?.pageNumber + 1,
    total: totalElements,
    pageSize: pageable?.pageSize,
    showSizeChanger: true,
  };
  return {
    pageable,
    totalElements,
    handlePageChange,
    getInitData,
    pagination,
    setSearchParams,
    searchParams,
  };
};

export default usePagination;
