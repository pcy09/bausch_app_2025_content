import { descStyle } from '@/styles/components/atomCommonStyle';
import { ListHeaderSection } from '@/components/molecules';
import { CardContainer, ColGrid, DividingLine } from '@/components/atom';
import Tables from '../../atom/Tables';
import { useEffect } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import NoticeLabel from '@/components/atom/Notice';
import { useRouter } from 'next/router';
import { getStoreGroupListAction, storeGroupReset } from '@/store/reducers/admin/storeGroupReducer';

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '스토어 그룹명',
    dataIndex: 'storeGroupName',
    align: 'center',
  },
  {
    title: '그룹 코드',
    dataIndex: 'storeGroupCode',
    align: 'center',
  },
  {
    title: '발주 정보',
    dataIndex: 'autoOrderStatus',
    align: 'center',
  },
  {
    title: '스토어 개수',
    dataIndex: 'totalStoreCount',
    align: 'center',
  },
  {
    title: '자동 발주',
    dataIndex: 'autoOrderCount',
    align: 'center',
  },
  {
    title: '미발주',
    dataIndex: 'notOrderCount',
    align: 'center',
  },
];

const StoreGroupList = () => {
  const { push } = useRouter();

  const dispatch = useDispatch();
  const { content } = useSelector(state => state.storeGroup);

  useEffect(() => {
    dispatch(getStoreGroupListAction());
    return () => {
      dispatch(storeGroupReset());
    };
  }, [dispatch]);

  const handleSearch = data => {
    const params = {
      searchText: data.searchText || '',
    };
    dispatch(getStoreGroupListAction({ params }));
  };

  const handleRowClick = record => {
    const id = record?.storeGroupId;
    push(`/admin/store/group/${id}`);
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel
          title={'👉🏼바슈롬의 스토어를 그룹핑하여 분류하는 스토어 그룹 리스트 페이지입니다. 스토어 그룹에 따라 안경원 정책에 차이가 있을 수 있습니다.'}
        />
      </div>
      <DividingLine border={false} />

      <CardContainer>
        <ListHeaderSection handleSearch={handleSearch} selectOptions={[{ label: '스토어 그룹', value: 'default' }]} defaultValue="default" />
        <Tables
          listData={content}
          columns={columns}
          onRow={record => ({
            onClick: () => handleRowClick(record), // 클릭 핸들러 추가
          })}
        />
      </CardContainer>

      <DividingLine border={false} />
    </>
  );
};

export default StoreGroupList;

const buttonRowStyle = css`
  border-radius: 40px;
`;
