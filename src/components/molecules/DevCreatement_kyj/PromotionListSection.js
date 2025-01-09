import {
  Buttons,
  CardContainer,
  ColGrid,
  DividingLine,
  Form,
  RowGrid,
  SelectBox,
  SelectInputSearchAtom,
  ShowStatus,
  Tables,
} from '@/components/atom';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { marginLeftStyle, tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ListHeaderSection from '../ListHeaderSection';
const promotionList = [
  {
    promotion_num: '1',
    promotion_name: '새학기 프로모션',
    promotion_subtitle: '3월 1일, 3+1 프로모션',
    promotion_date: '2024-03-01 ~ 2024-03-30',
    promotion_add: '2024-02-25',
    show_status: 'Y',
    key: 1111,
  },
  {
    promotion_num: '2',
    promotion_name: '플러스 프로모션',
    promotion_subtitle: '4월 1일, 1+1 프로모션',
    promotion_date: '2024-03-01 ~ 2024-03-30',
    promotion_add: '2024-02-25',
    show_status: 'Y',
    key: 2222,
  },
  {
    promotion_num: '3',
    promotion_name: '가정의달 프로모션',
    promotion_subtitle: '5월 1일, 2+1 프로모션',
    promotion_date: '2024-03-01 ~ 2024-03-30',
    promotion_add: '2024-02-25',
    show_status: 'N',
    key: 3333,
  },
];
const columns = [
  {
    title: 'No',
    dataIndex: 'promotion_num',
    align: 'center',
  },
  {
    title: '프로모션 명',
    dataIndex: 'promotion_name',
    align: 'center',
  },
  {
    title: '프로모션 부제목',
    dataIndex: 'promotion_subtitle',
    align: 'center',
  },
  {
    title: '진행 기간',
    dataIndex: 'promotion_date',
    align: 'center',
  },
  {
    title: '등록일',
    dataIndex: 'promotion_add',
    align: 'center',
  },
  {
    title: '노출 여부',
    dataIndex: 'show_status',
    align: 'center',
    render: value => <ShowStatus options={publishStatusOptions} value={value} />,
  },
];
const publishStatusOptions = [
  { label: '노출', value: 'Y' },
  { label: '비노출', value: 'N' },
];
// 테이블 검색 옵션
const options = [
  {
    value: 'promotion_name',
    label: '프로모션 명',
  },
  {
    value: 'promotion_subtitle',
    label: '프로모션 부제목',
  },
];
const PromotionListSection = ({ selectPromotionListItem }) => {
  const router = useRouter();
  const paging = { total: 150, pageSize: 20, current: 1 };
  const { control, onSubmit } = useForm();
  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };

  const goRouterHandler = () => {
    push('/');
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // 리스트 셀렉트 박스 라벨
  const list = ['프로모션 명', '프로모션 부제목'];
  const handleSearch = data => {
    console.log(data);
  };
  return (
    <>
      <CardContainer>
        <ListHeaderSection handleSearch={handleSearch} list={list} total={paging?.total} select={selectedRowKeys?.length} />

        <Tables
          checkbox
          detail={true}
          selectedRowKeys={selectedRowKeys}
          onSelectListItem={selectListItem}
          listData={promotionList} //뿌리려는 리스트 값
          columns={columns} //열 구분 하는 방법 및 사용할 데이터 지정
          pagination={paging} //페이지네이션 할때
          handleChangePageOption={getInitData} //페이지 바뀔때
          option={
            // handleSubmit(onSubmit)
            <Form onSubmit={''}>
              <Buttons type={'danger'} name="삭제" htmlType={'danger'} css={marginLeftStyle(5)}></Buttons>
            </Form>
          }
        />
      </CardContainer>
    </>
  );
};

export default PromotionListSection;

const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
