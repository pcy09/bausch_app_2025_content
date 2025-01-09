import { Buttons, ColGrid, RowGrid, SelectBox, SelectInputSearchAtom, Tables } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { marginBottomStyle, tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import { Descriptions, Input } from 'antd';
import useCommonCode from '@/hooks/useCommonCode';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { getReissueCouponSelectAction } from '@/store/reducers/admin/campaignReducer';
import { useDispatch } from 'react-redux';

const ReissueCouponListSection = ({
  control,
  getValues,
  storeId,
  reissueCouponSelectData,
  onAddCoupon,
  couponSearchCodeOptions,
  reissueSelectList,
  handleDeleteCoupon,
}) => {
  const columns = [
    {
      title: '유형',
      dataIndex: 'couponType',
      align: 'center',
      width: 150,
    },
    {
      title: '쿠폰 명',
      dataIndex: 'couponName',
      align: 'center',
    },
    {
      title: '쿠폰 ID',
      dataIndex: 'couponId',
      align: 'center',
      width: 150,
    },
    {
      title: '유효 기간',
      dataIndex: 'startEndDate',
      align: 'center',
      width: 300,
    },
    {
      title: '등록일',
      dataIndex: 'couponRegDate',
      align: 'center',
      width: 150,
    },
    {
      title: '선택',
      dataIndex: '',
      align: 'center',
      width: 150,
      render: (text, record) => {
        const couponId = record.couponId;
        const isSelected = reissueSelectList.some(item => item.couponId === couponId);
        return (
          <Buttons
            name={isSelected ? '취소' : '선택'}
            type={isSelected && 'danger'}
            onClick={() => {
              handleSelectStore(record);
            }}
          />
        );
      },
    },
  ];
  const dispatch = useDispatch();
  const handleSearch = searchText => {
    const couponSearchCode = getValues('couponOption');

    const params = {
      couponSearchCode,
      searchText,
      storeId,
    };

    console.log(params);
    dispatch(getReissueCouponSelectAction({ params }));
  };

  const handleSelectStore = record => {
    const selectedCoupon = {
      couponType: record.couponType,
      couponName: record.couponName,
      couponId: record.couponId,
    };
    const isSelected = reissueSelectList.some(item => item.couponId === record.couponId);
    if (isSelected) {
      handleDeleteCoupon(record.couponId);
    } else {
      // 선택된 쿠폰을 부모 컴포넌트로 전달
      onAddCoupon(selectedCoupon);
    }
  };

  const rowClassName = record => {
    const isSelected = reissueSelectList.some(item => item.couponId === record.couponId);
    if (isSelected) {
      return 'highlight-row'; // 조건에 맞는 경우 클래스 이름 반환
    }
    return '';
  };

  return (
    <>
      <Descriptions title={'쿠폰 선택'} />
      <RowGrid css={marginBottomStyle(12)} gutter={12}>
        <ColGrid span={16} css={span_style}></ColGrid>
        <ColGrid span={3} css={tableSearch}>
          <Controller
            name="couponOption"
            control={control}
            defaultValue={'COUPON_NAME'}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <SelectBox value={value} options={couponSearchCodeOptions} placeholder={'회원 옵션'} {...rest} />
            )}
          />
        </ColGrid>
        <ColGrid span={5}>
          <Controller
            name="searchText"
            control={control}
            render={({ field }) => <Input.Search {...field} type="text" placeholder="검색어 입력" onSearch={handleSearch} enterButton />}
          />
        </ColGrid>
      </RowGrid>
      <div css={couponTableContainerStyle}>
        <Tables
          rowKey={'couponId'}
          rowClassName={rowClassName}
          scroll={{ y: 250 }}
          detail={false}
          listData={reissueCouponSelectData} //뿌리려는 리스트 값
          columns={columns} //열 구분 하는 방법 및 사용할 데이터 지정
        />
      </div>
    </>
  );
};

export default ReissueCouponListSection;
const span_style = css`
  display: flex;
  align-items: center;
`;
const couponTableContainerStyle = css`
  .highlight-row,
  .highlight-row:hover td {
    background: #b8ccca !important;
    // background: #e0f0f1 !important;
  }
`;
