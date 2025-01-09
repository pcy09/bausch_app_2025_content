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
import { marginLeftStyle, marginRightStyle, tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ListHeaderSection from '../ListHeaderSection';

const PromotionCouponListSection = () => {
  const router = useRouter();
  const paging = { total: 150, pageSize: 20, current: 1 };
  const { control } = useForm();
  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };
  const promotionList = [
    {
      coupon_num: '1',
      coupon_type: '증정',
      coupon_name: '레이셀 3+1 증정',
      coupon_id: '525252111',
      coupon_data: '2024-02-25 ~ 2024-04-05',
      coupon_add_data: '2024-02-25',
      coupon_show_status: 'Y',
      key: 1111,
    },
    {
      coupon_num: '2',
      coupon_type: '증정',
      coupon_name: '365 1+1 증정',
      coupon_id: '2222234',
      coupon_data: '2024-02-25 ~ 2024-04-05',
      coupon_add_data: '2024-02-25',
      coupon_show_status: 'Y',
      key: 2222,
    },
    {
      coupon_num: '3',
      coupon_type: '증정',
      coupon_name: '가입 축하 증정 쿠폰',
      coupon_id: '1123444',
      coupon_data: '2024-02-25 ~ 2024-04-05',
      coupon_add_data: '2024-02-25',
      coupon_show_status: 'N',
      key: 3333,
    },
  ];
  const columns = [
    {
      title: 'No',
      dataIndex: 'coupon_num',
      align: 'center',
    },
    {
      title: '쿠폰 유형',
      dataIndex: 'coupon_type',
      align: 'center',
    },
    {
      title: '쿠폰 명',
      dataIndex: 'coupon_name',
      align: 'center',
    },
    {
      title: '쿠폰 ID',
      dataIndex: 'coupon_id',
      align: 'center',
    },
    {
      title: '유효 기간',
      dataIndex: 'coupon_data',
      align: 'center',
    },
    {
      title: '등록일',
      dataIndex: 'coupon_add_data',
      align: 'center',
    },
    {
      title: '노출 여부',
      dataIndex: 'coupon_show_status',
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
      label: '쿠폰 명',
    },
    {
      value: 'promotion_subtitle',
      label: '쿠폰 ID',
    },
  ];

  const goRouterHandler = () => {
    push('/');
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // 리스트 셀렉트 박스 라벨
  const list = ['쿠폰명', '쿠폰 ID'];
  const handleSearch = data => {
    console.log(data);
  };
  return (
    <CardContainer>
      <ListHeaderSection handleSearch={handleSearch} list={list} total={paging?.total} select={selectedRowKeys?.length} />

      <Tables
        checkbox
        selectedRowKeys={selectedRowKeys}
        onSelectListItem={selectListItem}
        detail={true}
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
  );
};

export default PromotionCouponListSection;
