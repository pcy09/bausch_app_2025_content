import { contentsContainerStyle, marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { UserSearchBox } from '@/components/molecules';
import { Buttons, CardContainer, ColGrid, RowGrid } from '@/components/atom';
import { DownloadOutlined } from '@ant-design/icons';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import OpticianSearchBox from '@/components/molecules/SearchBox/OpticianSearchBox';
import { EventSearchBox } from '@/components/molecules/SearchBox';
import useCommonCode from '@/hooks/useCommonCode';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getEventListAction, updateSearchParams } from '@/store/reducers/eventReducer';
import { transDate } from '@/common/utiles';

const columns = [
  {
    title: 'No',
    dataIndex: 'index',
    width: 40,
    align: 'center',
  },
  {
    title: '제목',
    dataIndex: 'event_title',
    align: 'center',
  },
  {
    title: '이벤트 시작일',
    dataIndex: 'event_start_date',
    width: 150,
    align: 'center',
  },
  {
    title: '이벤트 종료일',
    dataIndex: 'event_end_date',
    width: 150,
    align: 'center',
  },
  {
    title: '이벤트 등록일',
    dataIndex: 'event_register_date',
    width: 150,
    align: 'center',
  },
  {
    title: '이벤트 상태',
    dataIndex: 'event_status',
    width: 100,
    align: 'center',
  },
  {
    title: '노출 여부',
    dataIndex: 'event_show_status',
    width: 100,
    align: 'center',
  },
];

const EventListTemplate = () => {
  const dispatch = useDispatch();
  const eventListData = useSelector(state => state.event.eventList);
  const eventPaging = useSelector(state => state.event.paging);
  const searchOption = useSelector(state => state.event.search);

  const router = useRouter();

  // 이벤트 상태 코드
  const [eventStatusCode, findEventStatusCode] = useCommonCode('eventStatusCode');
  // 이벤트 노출 상태 코드
  const [showStatusCode, findShowStatusCode] = useCommonCode('opticianShowStatusCode');

  // 검색
  const handleSearchEvent = data => {
    const { searchText, date, showStatus, status } = data;

    let startDate = null;
    let endDate = null;

    if (date) {
      startDate = transDate(date?.[0], 'YYYY-MM-DD');
      endDate = transDate(date?.[1], 'YYYY-MM-DD');
    }

    const searchObject = {
      startDate,
      endDate,
      status,
      showStatus,
      searchText,
    };

    dispatch(updateSearchParams({ search: searchObject }));

    getInitData({}, searchObject);
  };

  // 최초 랜더, 페이징, 검색 시 호출하는 함수
  const getInitData = ({ offset = 1, pageSize = 10 } = {}, { startDate, endDate, searchText, showStatus, status } = {}) => {
    const params = {
      pageSize: pageSize,
      offset: offset,
      startDate: startDate,
      endDate: endDate,
      searchText: searchText,
      showStatus: showStatus,
      status: status,
    };
    console.log(findEventStatusCode, '?');
    dispatch(getEventListAction({ params, findEventStatusCode, findShowStatusCode }));
  };

  useEffect(() => {
    if (findEventStatusCode && findShowStatusCode) {
      console.log(findEventStatusCode, findShowStatusCode);
      getInitData();
    }
  }, [findEventStatusCode, findShowStatusCode]);

  return (
    <>
      <EventSearchBox
        onHandleSearchEvent={handleSearchEvent}
        eventStatusCode={eventStatusCode}
        showStatusCode={showStatusCode}
        getInitData={getInitData}
      />

      <CardContainer>
        <RowGrid css={marginBottomStyle(12)}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{eventPaging?.total}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            <Buttons type={'primary'} ghost name={'이벤트 등록'} htmlType={'button'} onClick={() => router.push('/events/create')} />
          </ColGrid>
        </RowGrid>
        <Tables
          listData={eventListData}
          columns={columns}
          pagination={eventPaging}
          handleChangePageOption={param => getInitData(param, searchOption)}
        />
      </CardContainer>
    </>
  );
};

export default EventListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
