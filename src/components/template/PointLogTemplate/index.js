import NoticeLabel from '@/components/atom/Notice';
import PointLogSearchBox from '@/components/molecules/SearchBox/PointLogSearchBox';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import { useDispatch, useSelector } from 'react-redux';
import PointLogListSection from '@/components/molecules/DevCreatement_kyj/PointLogListSection';
import { Tabs } from 'antd';
import { CardContainer, DividingLine } from '@/components/atom';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { PageTitle } from '@/components/molecules';
import { POINT_OPTIONS } from '@/common/options';
import useCommonCode from '@/hooks/useCommonCode';
import usePagination from '@/hooks/usePagination';
import { getPointLogListAction, pointLogReset } from '@/store/reducers/admin/pointLogReducer';
import { useEffect, useState } from 'react';

import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { transFilterSelectBox, transSelectBox } from '@/common/utiles';

const PointLogTemplate = ({}) => {
  const dispatch = useDispatch();
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.pointLog, getPointLogListAction);

  const { content } = useSelector(state => state.pointLog);
  const [pointProductGroupOptions, setPointProductGroupOptions] = useState([]);
  const [pointHistorySearchCodeOptions, setPointHistorySearchCodeOptions] = useState([]);
  const [resetState, setResetState] = useState(false);
  const { pointProductGroup, pointHistorySearchCode } = useCommonCodeBatch(['pointProductGroup', 'pointHistorySearchCode']);

  // 적립금 옵션
  useEffect(() => {
    if (pointProductGroup) {
      const options = transFilterSelectBox(pointProductGroup);
      setPointProductGroupOptions(options);
    }
  }, [pointProductGroup]);

  // 테이블 헤더 옵션
  useEffect(() => {
    if (pointHistorySearchCode) {
      const options = transSelectBox(pointHistorySearchCode);
      setPointHistorySearchCodeOptions(options);
    }
  }, [pointHistorySearchCode]);

  useEffect(() => {
    getInitData({ page: 0, size: 10 });
    return () => {
      dispatch(pointLogReset());
    };
  }, [dispatch]);

  return (
    <>
      <NoticeLabel title={'👉🏼 전체 적립금 내역을 확인할 수 있는 리스트 페이지입니다.'} />
      <DividingLine border={false} />
      <PointLogSearchBox selectOptions={pointProductGroupOptions} onHandleSearchData={getInitData} setResetState={setResetState} />
      <PointLogListSection
        handlePageChange={handlePageChange}
        selectOptions={pointHistorySearchCodeOptions}
        getInitData={getInitData}
        pagination={pagination}
        listData={content}
        resetState={resetState}
        setResetState={setResetState}
      />
    </>
  );
};

export default PointLogTemplate;
