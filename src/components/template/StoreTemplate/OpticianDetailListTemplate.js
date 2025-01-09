import { contentsContainerStyle, descStyle, marginBottomStyle, tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { PageTitle, UserSearchBox } from '@/components/molecules';
import {
  Buttons,
  CardContainer,
  ColGrid,
  DividingLine,
  InputSearchAtom,
  RowGrid,
  SelectBox,
  SelectInputSearchAtom,
  TradeStatus,
} from '@/components/atom';
import { DownloadOutlined } from '@ant-design/icons';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import OpticianSearchBox from '@/components/molecules/SearchBox/OpticianSearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { getOpticianListAction, opticianReset } from '@/store/reducers/admin/opticianReducer';
import NoticeLabel from '@/components/atom/Notice';
import { Button, Form, Tabs } from 'antd';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const selectOptions = [
  {
    value: '',
    label: '전체',
  },
  {
    value: 'Y',
    label: '취급매장',
  },
  {
    value: 'N',
    label: '미취급매장',
  },
];

const columns = [
  {
    title: '거래 ID',
    dataIndex: 'data1',
    align: 'center',
  },
  {
    title: '적립 구분',
    dataIndex: 'data2',
    align: 'center',
  },
  {
    title: '적립금',
    dataIndex: 'data3',
    align: 'center',
  },
  {
    title: '제품명/쿠폰명',
    dataIndex: 'data4',
    align: 'center',
  },
  {
    title: '수량',
    dataIndex: 'data5',
    align: 'center',
  },

  {
    title: '사용 적립금',
    dataIndex: 'data6',
    align: 'center',
  },
  {
    title: '누적 적립금액',
    dataIndex: 'data7',
    align: 'center',
  },
  {
    title: '주문일',
    dataIndex: 'data8',
    align: 'center',
  },
  {
    title: '거래 상태',
    dataIndex: 'data9',
    align: 'center',
    render: status => {
      return <TradeStatus status={status} />;
    },
  },
];

const selectInputOptions = [
  {
    value: 'fsStoreName',
    label: '안경원 이름',
  },
  {
    value: 'fiStoreID',
    label: '안경원 코드',
  },
];
const options = [
  {
    value: 'user_name',
    label: '이름',
  },
  {
    value: 'user_email',
    label: '이메일',
  },
  {
    value: 'user_phone',
    label: '휴대폰번호',
  },
];

const OpticianDetailListTemplate = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { paging } = useSelector(state => state.optician);
  const opticianList = [
    {
      data1: '123123123',
      data2: '적립',
      data3: '울트라 적립금',
      data4: '관리자 적립',
      data5: '1',
      data6: '+64,000',
      data7: '321,500',
      data8: '2024-09-11',
      data9: '거래 완료',
      key: 111,
    },
    {
      data1: '321321321',
      data2: '사용',
      data3: '바이오 적립금',
      data4: '울트라 2000원 할인 쿠폰',
      data5: '2',
      data6: '-65,000',
      data7: '190,500',
      data8: '2024-01-01',
      data9: '거래 중',
      key: 222,
    },
    {
      data1: '456456456',
      data2: '적립',
      data3: '기타 적립금',
      data4: '울트라 원데이(30)',
      data5: '4',
      data6: '+2,000',
      data7: '1,500',
      data8: '2024-04-04',
      data9: '거래 취소',
      key: 333,
    },
  ];
  const { register, control, handleSubmit } = useForm();

  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };

  useEffect(() => {
    getInitData();

    return () => {
      dispatch(opticianReset());
    };
  }, []);

  return (
    <>
      <OpticianSearchBox selectInputOptions={selectInputOptions} selectOptions={selectOptions} onHandleSearchData={getInitData} />

      <CardContainer>
        <RowGrid css={tableRowStyle(12, 'center')}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{paging?.total}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={tableSearch}>
            <SelectInputSearchAtom options={options} control={control} />
          </ColGrid>
        </RowGrid>
        <Tables listData={opticianList} columns={columns} pagination={paging} handleChangePageOption={getInitData} />

        <DividingLine border={false} />
      </CardContainer>
    </>
  );
};

export default OpticianDetailListTemplate;
