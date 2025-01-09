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
import { getStorePointAction, pointProductOrderResetAction } from '@/store/reducers/admin/pointProductOrderReducer';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { transSelectBox } from '@/common/utiles';

const { Text } = Typography;

const OrderPointStoreSection = ({ orderPointSellingStore, handleStoreSearch, setSelectedStoreId }) => {
  // 리스트 칼럼 설정
  const columns = [
    {
      title: '스토어 코드',
      dataIndex: 'storeCode',
      align: 'center',
    },
    {
      title: '스토어명',
      dataIndex: 'storeName',
      align: 'center',
    },
    {
      title: '스토어 그룹',
      dataIndex: 'storeGroupName',
      align: 'center',
    },
    {
      title: '자동발주',
      dataIndex: 'autoOrderStatus',
      align: 'center',
    },
    {
      title: 'ABC S/M',
      dataIndex: 'abcSm',
      align: 'center',
    },
    {
      title: '지역(시/도)',
      dataIndex: 'city',
      align: 'center',
    },
    {
      title: '주소(시/군/구)',
      dataIndex: 'district',
      align: 'center',
    },
    {
      title: '등록일',
      dataIndex: 'createTime',
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

  const dispatch = useDispatch();
  const { pointStoreSearchCond } = useCommonCodeBatch(['pointStoreSearchCond']);
  const [storeOptions, setStoreOptions] = useState([]);
  const { control, getValues, setValue, reset } = useFormContext();
  const [inputValue, setInputValue] = useState({
    memberId: '',
    myopiaLeft: '', //근시 좌
    astiLeft: '', // 난시 좌
    axisLeft: '', // 축 좌
    myopiaRight: '', // 근시 우
    astiRight: '', // 난시 우
    axisRight: '', // 축 우
  });

  // 셀렉트 박스 옵션
  useEffect(() => {
    if (pointStoreSearchCond) {
      const options = transSelectBox(pointStoreSearchCond);
      setStoreOptions(options);
    }
  }, [pointStoreSearchCond]);

  // 스토어 선택
  const handleSelectStore = store => {
    setSelectedStoreId(store.storeId);
    const param = { id: store.storeId };
    dispatch(getStorePointAction(param));
    setInputValue({
      storeName: store.storeName,
      storeCode: store.storeCode,
      monthOrderCount: store.monthOrderCount,
      monthOrderLimit: store.monthOrderLimit,
      storeId: store.storeId,
      storeGroupId: store.storeGroupId,
    });
  };

  // 테이블 선택시 스토어 상세 새창
  const handleStoreNameClick = () => {
    if (inputValue.storeId) {
      window.open(`/admin/store/manage/${inputValue.storeId}`, '_blank');
    }
  };

  useEffect(() => {
    // Redux 상태 업데이트 후 React Hook Form의 값을 설정
    setValue('selectedStoreName', inputValue.storeName, { shouldValidate: true });
    setValue('selectedStoreCode', inputValue.storeCode, { shouldValidate: true });
    setValue('currentMonthOrders', inputValue.monthOrderCount, { shouldValidate: true });
    setValue('availableMonthOrders', inputValue.monthOrderLimit, { shouldValidate: true });
  }, [inputValue, setValue]);

  // 초기화 버튼
  const handleReset = () => {
    reset({
      selectedStoreName: '',
      selectedStoreCode: '',
      currentMonthOrders: '',
      availableMonthOrders: '',
      storeOption: '',
      searchText: '',
    });
    dispatch(pointProductOrderResetAction());
  };

  return (
    <>
      <Descriptions title={'판매 스토어 선택'} />
      <RowGrid css={marginBottomStyle(12)} gutter={12}>
        <ColGrid span={16} css={span_style}></ColGrid>
        <ColGrid span={3} css={tableSearch}>
          <Controller
            name={'storeOption'}
            control={control}
            defaultValue={'STORE_CODE'}
            render={({ field: { ref, value, ...rest }, fieldState }) => {
              return <SelectBox options={storeOptions} value={value || null} placeholder={'스토어 옵션'} {...rest} />;
            }}
          />
        </ColGrid>
        <ColGrid span={5}>
          <Controller
            name="searchText"
            control={control}
            render={({ field }) => <Input.Search {...field} type="text" placeholder="검색어 입력" onSearch={handleStoreSearch} enterButton />}
          />
        </ColGrid>
      </RowGrid>
      <Tables listData={orderPointSellingStore} columns={columns} detail={false} rowKey={record => record.storeId} />
      <DividingLine border={false} />

      <>
        <Descriptions bordered={true}>
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
          <Descriptions.Item span={1} label="당월 주문 횟수">
            <Controller name="currentMonthOrders" control={control} render={({ field }) => <Input {...field} readOnly />} />
          </Descriptions.Item>
          <Descriptions.Item
            span={2}
            label={
              <div>
                당월 주문 가능 횟수
                <div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    (어드민에서는 제한이 없습니다)
                  </Text>
                </div>
              </div>
            }>
            <Controller name="availableMonthOrders" control={control} render={({ field }) => <Input {...field} readOnly />} />
          </Descriptions.Item>
        </Descriptions>

        <RowGrid css={buttonFlexEndRowStyle} style={{ padding: '10px' }} gutter={12}>
          <Buttons type={'dash'} name={'초기화'} onClick={handleReset} />
        </RowGrid>
      </>
    </>
  );
};

export default OrderPointStoreSection;
const span_style = css`
  display: flex;
  align-items: center;
`;
