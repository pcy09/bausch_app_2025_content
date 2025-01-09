import { Buttons, CardContainer, ColGrid, DividingLine, Inputs, RowGrid, SelectBox, Tables } from '@/components/atom';
import { Controller, useFormContext } from 'react-hook-form';
import { Typography, Descriptions, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { buttonFlexEndRowStyle, marginBottomStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import css from 'styled-jsx/css';
import { useEffect, useState } from 'react';
import { openPopupAction } from '@/store/reducers/popupReducer';
import { openStore } from '@/store/reducers/admin/storeSettingReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { couponOrderResetAction, getCouponOrderReserveAction } from '@/store/reducers/admin/couponOrderReducer';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { transSelectBox } from '@/common/utiles';

const OrderUserSection = ({ storeData, onSearch, setUserData }) => {
  // 리스트 칼럼 설정
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
      title: '근시(좌)',
      dataIndex: 'myopiaLeft',
      align: 'center',
    },
    {
      title: '난시(좌)',
      dataIndex: 'astiLeft',
      align: 'center',
    },
    {
      title: '측(좌)',
      dataIndex: 'axisLeft',
      align: 'center',
    },
    {
      title: '근시(우)',
      dataIndex: 'myopiaRight',
      align: 'center',
    },
    {
      title: '난시(우)',
      dataIndex: 'astiRight',
      align: 'center',
    },
    {
      title: '측(우)',
      dataIndex: 'axisRight',
      align: 'center',
    },
    {
      title: '선택',
      dataIndex: '',
      align: 'center',
      render: (text, record) => (
        <a onClick={() => handleSelectStore(record)} style={{ cursor: 'pointer', color: '#1890ff' }}>
          선택
        </a>
      ),
    },
  ];

  const { memberSearchCond } = useCommonCodeBatch(['memberSearchCond']);
  const [storeOptions, setStoreOptions] = useState([]);

  const { control, getValues, setValue, reset } = useFormContext();
  const [inputValue, setInputValue] = useState({
    memberName: '',
    memberPhone: '',
    storeName: '',
    storeCode: '',
    memberId: '',
    storeId: '',
  });

  useEffect(() => {
    if (memberSearchCond) {
      const options = transSelectBox(memberSearchCond);
      setStoreOptions(options);
    }
  }, [memberSearchCond]);

  const dispatch = useDispatch();

  // 검색
  const handleSearch = searchText => {
    if (searchText === '') {
      alert('검색얼르 입력해주세요');
      return;
    }
    const searchStore = getValues('userOption');

    const params = {
      memberSearchCond: searchStore,
      searchValue: searchText,
    };

    onSearch(params);
  };

  const handleSelectStore = member => {
    const param = { id: member.memberId };
    dispatch(getCouponOrderReserveAction(param));
    setInputValue({
      memberId: member.memberId,
      storeId: member.storeId,
      memberName: member.memberName,
      memberPhone: member.memberPhone,
      storeName: member.storeName,
      storeCode: member.storeCode,
    });

    const { memberId, myopiaLeft, astiLeft, axisLeft, lensAddLeft, myopiaRight, astiRight, axisRight, lensAddRight } = member;
    setUserData({
      memberId,
      myopiaLeft, //근시 좌
      astiLeft, // 난시 좌
      axisLeft, // 축 좌
      lensAddLeft, //ADD 좌
      myopiaRight, // 근시 우
      astiRight, // 난시 우
      axisRight, // 축 우
      lensAddRight, //ADD 우
    });
  };

  // 테이블 선택시 회원 상세 새창
  const handleMemberNameClick = () => {
    if (inputValue.memberId) {
      window.open(`/admin/member/${inputValue.memberId}`, '_blank');
    }
  };
  // 테이블 선택시 스토어 상세 새창
  const handleStoreNameClick = () => {
    if (inputValue.storeId) {
      window.open(`/admin/store/manage/${inputValue.storeId}`, '_blank');
    }
  };

  useEffect(() => {
    // Redux 상태 업데이트 후 React Hook Form의 값을 설정
    setValue('selectedMemberName', inputValue.memberName, { shouldValidate: true });
    setValue('selectedMemberPhone', inputValue.memberPhone, { shouldValidate: true });
    setValue('selectedStoreName', inputValue.storeName, { shouldValidate: true });
    setValue('selectedStoreCode', inputValue.storeCode, { shouldValidate: true });
  }, [inputValue, setValue]);

  // 초기화 버튼
  const handleReset = () => {
    reset({
      selectedStoreName: '',
      selectedStoreCode: '',
      selectedMemberName: '',
      selectedMemberPhone: '',
      userOption: '',
      searchText: '',
    });
    dispatch(couponOrderResetAction());
  };
  return (
    <>
      <Descriptions title={'판매 회원 선택'} />
      <RowGrid css={marginBottomStyle(12)} gutter={12}>
        <ColGrid span={16} css={span_style}></ColGrid>
        <ColGrid span={3} css={tableSearch}>
          <Controller
            name={'userOption'}
            control={control}
            defaultValue={'MEMBER_NAME'}
            render={({ field: { ref, value, ...rest }, fieldState }) => {
              return <SelectBox options={storeOptions} value={value || null} placeholder={'회원 옵션'} {...rest} />;
            }}
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
      <Tables listData={storeData} columns={columns} detail={false} rowKey={'memberLoginId'} />
      <DividingLine border={false} />

      <>
        <Descriptions column={3} bordered={true}>
          <Descriptions.Item span={1} label="회원명">
            <Controller
              name="selectedMemberName"
              control={control}
              render={({ field }) => (
                <Input {...field} onClick={handleMemberNameClick} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#1890ff' }} readOnly />
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item span={2} label="휴대폰 번호">
            <Controller name="selectedMemberPhone" control={control} render={({ field }) => <Input {...field} readOnly />} />
          </Descriptions.Item>
          <Descriptions.Item span={1} label="판매 스토어 (마이 스토어)">
            <Controller
              name="selectedStoreName"
              control={control}
              render={({ field }) => (
                <Input {...field} onClick={handleStoreNameClick} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#1890ff' }} readOnly />
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item span={2} label="스토어 코드">
            <Controller name="selectedStoreCode" control={control} render={({ field }) => <Input {...field} readOnly />} />
          </Descriptions.Item>
        </Descriptions>

        <RowGrid css={buttonFlexEndRowStyle} style={{ padding: '10px' }} gutter={12}>
          <Buttons type={'dash'} name={'초기화'} onClick={handleReset} />
        </RowGrid>
      </>
    </>
  );
};

export default OrderUserSection;
const span_style = css`
  display: flex;
  align-items: center;
`;
