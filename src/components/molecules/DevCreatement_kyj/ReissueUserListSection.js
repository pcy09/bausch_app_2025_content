import { Buttons, ColGrid, DividingLine, Inputs, RowGrid, SelectBox, SelectInputSearchAtom, Tables } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { marginBottomStyle, marginTopStyle, tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import { Descriptions, Input } from 'antd';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import useCommonCode from '@/hooks/useCommonCode';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  campaignReset,
  getReissueCouponSelectAction,
  getReissueMemberCouponAction,
  resetReissueCouponSelectAction,
} from '@/store/reducers/admin/campaignReducer';
import { css } from '@emotion/react';

const ReissueUserListSection = ({
  control,
  getValues,
  reissueMemberListData,
  memberSearchCondOptions,
  selectedMemberInfo,
  setSelectedMemberInfo,
  setReissueSelectList,
}) => {
  const columns = [
    {
      title: '회원구분',
      dataIndex: 'memberType',
      align: 'center',
    },
    {
      title: '회원명',
      dataIndex: 'memberName',
      align: 'center',
      render: (value, record) => (
        <a target={'_blank'} href={`/admin/member/${record.memberId}`}>
          {value}
        </a>
      ),
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'memberPhone',
      align: 'center',
    },
    {
      title: '회원 ID',
      dataIndex: 'memberLoginId',
      align: 'center',
    },
    {
      title: '마이 스토어 코드',
      dataIndex: 'memberStoreCode',
      align: 'center',
    },
    {
      title: '마이 스토어',
      dataIndex: 'memberStoreName',
      align: 'center',
      render: (value, record) => (
        <a target={'_blank'} href={`/admin/store/manage/${record.storeId}`}>
          {value}
        </a>
      ),
    },
    {
      title: '선택',
      dataIndex: '',
      align: 'center',
      render: (text, record) =>
        record.memberPhone === selectedMemberInfo?.memberPhone ? (
          <Buttons name={'취소'} type={'danger'} onClick={() => handleDeselectMember(record)} />
        ) : (
          <Buttons name={'선택'} onClick={() => handleSelectMember(record)} />
        ),
    },
  ];
  const dispatch = useDispatch();

  // 특정 행에만 클래스 추가
  const rowClassName = record => {
    if (record.memberPhone === selectedMemberInfo?.memberPhone) {
      return 'highlight-row'; // 조건에 맞는 경우 클래스 이름 반환
    }
    return '';
  };

  // 검색
  const handleSearch = searchValue => {
    const memberSearchCond = getValues('memberSelectOptions');
    const params = {
      memberSearchCond,
      searchValue,
    };
    handleDeselectMember();
    dispatch(getReissueMemberCouponAction({ params }));
  };

  const handleSelectMember = record => {
    const { memberName, memberPhone, memberStoreName, memberStoreCode, storeId, memberId } = record;

    setSelectedMemberInfo({
      memberName,
      memberPhone,
      memberStoreName,
      memberStoreCode,
      storeId,
      memberId,
    });
    setReissueSelectList([]);

    const params = {
      storeId,
    };
    dispatch(getReissueCouponSelectAction({ params }));
  };

  const handleDeselectMember = () => {
    setSelectedMemberInfo(null);
    setReissueSelectList([]);
    dispatch(resetReissueCouponSelectAction());
  };

  return (
    <div css={memberContainerStyle}>
      {/* 회원 정보 선택 */}
      <Descriptions title={'회원 정보'} />
      <RowGrid css={marginBottomStyle(12)} gutter={12}>
        <ColGrid span={16} css={span_style}></ColGrid>
        <ColGrid span={3} css={tableSearch}>
          <Controller
            name="memberSelectOptions"
            control={control}
            defaultValue={'MEMBER_NAME'}
            render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
              <SelectBox
                onChange={value => {
                  onChange(value);
                }}
                value={value}
                options={memberSearchCondOptions}
                placeholder={'회원 옵션'}
                {...rest}
              />
            )}
          />
        </ColGrid>
        <ColGrid span={5}>
          <Controller
            name="memberSearchText"
            control={control}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Input.Search type="text" onSearch={handleSearch} enterButton placeholder={'검색어 입력'} value={value} {...rest} />
            )}
          />
        </ColGrid>
      </RowGrid>

      <Tables scroll={{ y: 250 }} rowClassName={rowClassName} detail={false} listData={reissueMemberListData} columns={columns} />
      <DividingLine border={false} />
      {selectedMemberInfo && (
        <Descriptions labelStyle={{ width: '250px' }} bordered={true} column={8} css={marginTopStyle(18)}>
          <Descriptions.Item span={4} label="회원명">
            <span>{selectedMemberInfo?.memberName}</span>
          </Descriptions.Item>
          <Descriptions.Item span={4} label="휴대폰 번호">
            <span>{selectedMemberInfo?.memberPhone}</span>
          </Descriptions.Item>
          <Descriptions.Item span={4} label="마이 스토어">
            <span>{selectedMemberInfo?.memberStoreName}</span>
          </Descriptions.Item>
          <Descriptions.Item span={4} label="마이 스토어 코드">
            <span>{selectedMemberInfo?.memberStoreCode}</span>
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default ReissueUserListSection;
const span_style = css`
  display: flex;
  align-items: center;
`;
const memberContainerStyle = css`
  .highlight-row,
  .highlight-row:hover td {
    background: #b8ccca !important;
  }
`;
