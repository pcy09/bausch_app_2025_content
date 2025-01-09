import { Buttons, CardContainer, ColGrid, DividingLine, Inputs, MultiSelectBoxes, RowGrid, Tables } from '@/components/atom';
import { marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { useEffect, useState } from 'react';
import { Cascader, Descriptions } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import useCommonCode from '@/hooks/useCommonCode';
import { useDispatch, useSelector } from 'react-redux';
import ListHeaderAddSection from '../ListHeaderAddSection/ListHeaderAddSection';
import { transFormRadioValue } from '@/common/utiles';
import { deleteCampaignStoreAction, getCampaignDetailStoreGroupListAction } from '@/store/reducers/admin/campaignDetailReducer';
import NoticeLabel from '@/components/atom/Notice';

const StoreAddSearchFormSection = ({ control, setResult, storeGroupOptions, getValues }) => {
  const columns = [
    { title: '스토어 코드', dataIndex: 'storeCode', align: 'center' },
    { title: '스토어 명', dataIndex: 'storeName', align: 'center' },
    { title: '스토어 그룹', dataIndex: 'storeGroupName', align: 'center' },
    { title: 'ABC S/M', dataIndex: 'abcSm', align: 'center' },
    { title: '자동발주', dataIndex: 'autoOrderStatus', align: 'center' },
    { title: '지역 (시/도)', dataIndex: 'city', align: 'center' },
    { title: '주소(시/군/구)', dataIndex: 'district', align: 'center' },
    { title: '등록일', dataIndex: 'storeRegDate', align: 'center' },
    {
      title: '삭제',
      dataIndex: 'transactionStatus',
      align: 'center',
      render: (text, record) => (
        <Buttons type={'danger'} name="삭제" htmlType={'button'} css={marginLeftStyle(5)} onClick={() => handleDeleteData(record)} />
      ),
    },
  ];
  const dispatch = useDispatch();
  const { storeAddSearchResult } = useSelector(state => state?.campaignDetail);

  // 리스트 가져오기
  useEffect(() => {
    if (storeAddSearchResult?.length > 0) {
      setResult(storeAddSearchResult);
    }
  }, [storeAddSearchResult, setResult]);

  // 추가하기
  const handleAddData = () => {
    const { storeCode } = getValues();
    const storeIds = storeAddSearchResult?.map(item => item.storeId);
    const params = {
      storeCode: storeCode || '',
      storeIds: storeIds || '',
    };

    if (storeCode) {
      dispatch(getCampaignDetailStoreGroupListAction({ params }));
    } else {
      alert('스토어 코드를 입력해주세요');
    }
  };

  // 삭제하기
  const handleDeleteData = record => {
    const storeIds = storeAddSearchResult.map(item => item.storeId);

    const params = {
      storeId: record.storeId,
      storeIds: storeIds.filter(id => id !== record.storeId), // 삭제할 항목 제외
    };
    dispatch(deleteCampaignStoreAction({ params }));
  };

  return (
    <>
      <CardContainer>
        <Descriptions title={'스토어 그룹 추가'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
          <Descriptions.Item span={4} label={'스토어 그룹 선택'}>
            <Controller
              name={'storeGroupIdsArr'}
              control={control}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Cascader
                  style={{ width: '100%' }}
                  size={'middle'}
                  placeholder={'스토어 그룹을 선택해주세요'}
                  options={storeGroupOptions}
                  multiple
                  value={value}
                  {...rest}
                />
              )}
            />
          </Descriptions.Item>
        </Descriptions>
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <Descriptions title={'개별 스토어 추가'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
          <Descriptions.Item span={4} label={'개별 스토어 추가'}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Controller
                name={'storeCode'}
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs style={{ width: '200px' }} value={value} placeholder={'스토어 코드를 입력해주세요'} {...rest} />
                )}
              />
              <Buttons type="primary" name={'추가'} onClick={handleAddData} />
            </div>
          </Descriptions.Item>
        </Descriptions>
        <DividingLine border={false} />

        <Tables
          emptyText="추가된 개별 스토어 코드가 없습니다. 스토어 코드를 입력해 추가해주세요."
          detail={false}
          listData={storeAddSearchResult?.map((item, index) => ({ ...item, key: item.storeId || index }))}
          columns={columns}
          scroll={{ y: 180 }}
        />
      </CardContainer>
      {/* <CardContainer>
        <Descriptions column={4} title="스토어 그룹 추가">
          <RowGrid>
            <ColGrid span={24}>
              <Controller
                name={'storeGroupIdsArr'}
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Cascader
                    style={{ width: '100%' }}
                    size={'middle'}
                    placeholder={'스토어 그룹을 선택해주세요'}
                    options={storeGroupOptions}
                    multiple
                    value={value}
                    {...rest}
                  />
                )}
              />
            </ColGrid>
          </RowGrid>
        </Descriptions>
        <Descriptions column={1} title="개별 스토어 추가" />
        <ListHeaderAddSection control={control} handleAddData={handleAddData} placeholder={'스토어 코드 입력'} />
        {storeAddSearchResult.length > 0 && (
          <Tables detail={false} listData={storeAddSearchResult?.map((item, index) => ({ ...item, key: item.storeId || index }))} columns={columns} />
        )}
      </CardContainer> */}
      <DividingLine border={false} />
    </>
  );
};

export default StoreAddSearchFormSection;
