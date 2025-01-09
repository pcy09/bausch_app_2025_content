import { marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, SelectBox } from '@/components/atom';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoticeLabel from '@/components/atom/Notice';
import { Descriptions, Modal } from 'antd';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { AdminStoreGroupDetailSearchBox } from '@/components/molecules/SearchBox';
import { getStoreGroupDetailListAction, storeGroupReset, updateStoreGroupDetailOnceAction } from '@/store/reducers/admin/storeGroupReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { ListHeaderSection } from '@/components/molecules';
import usePagination from '@/hooks/usePagination';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import StoreGroupDetailGroupNameTemplate from './StoreGroupDetailGroupNameTemplate';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

import { transFilterSelectBox, transSelectBox } from '@/common/utiles';

const StoreGroupDetail = () => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: 'center',
    },
    {
      title: '매장유형',
      dataIndex: 'storeType',
      align: 'center',
    },
    {
      title: '스토어 코드',
      dataIndex: 'storeCode',
      align: 'center',
    },
    {
      title: '스토어명',
      dataIndex: 'storeName',
      align: 'center',
      render: (text, record) => (
        <a target="_blank" rel="noopener noreferrer" href={`/admin/store/manage/${record?.storeId}`}>
          {text}
        </a>
      ),
    },
    {
      title: 'ABC S/M',
      dataIndex: 'abcSm',
      align: 'center',
    },
    {
      title: '스토어 그룹',
      dataIndex: 'storeGroupName',
      align: 'center',
    },
    {
      title: '지역 (시/도)',
      dataIndex: 'city',
      align: 'center',
    },
    {
      title: '주소 (시/군/구)',
      dataIndex: 'district',
      align: 'center',
    },
    {
      title: '등록일',
      dataIndex: 'storeRegDate',
      align: 'center',
    },
    {
      title: '발주 정보',
      dataIndex: 'autoOrderStatusValue',
      align: 'center',
    },
  ];
  const dispatch = useDispatch();
  const { query, back, push } = useRouter();
  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.storeGroup, getStoreGroupDetailListAction, query?.id);
  const { setValue, control, handleSubmit, watch } = useForm();
  const { content } = useSelector(state => state?.storeGroup);
  const groupName = useSelector(state => state?.storeGroup?.groupName);

  const { storeSearchCord, storeLocation, autoOrderStatusByType } = useCommonCodeBatch(['storeSearchCord', 'storeLocation', 'autoOrderStatusByType']);
  const [autoOrderStatusByTypeOptions, setAutoOrderStatusByTypeOptions] = useState([]);
  const [allAutoOrderStatusByTypeOptions, setAllAutoOrderStatusByTypeOptions] = useState([]);
  const [storeSearchCordOptions, setStoreSearchCordOptions] = useState([]);
  const [storeLocationOptions, setStoreLocationOptions] = useState([]);
  const [resetState, setResetState] = useState(false);

  const router = useRouter();

  // 발주 정보 옵션 (셀렉트박스)
  useEffect(() => {
    if (autoOrderStatusByType) {
      const options = transSelectBox(autoOrderStatusByType);
      setAutoOrderStatusByTypeOptions(options);
    }
  }, [autoOrderStatusByType]);

  // 발주 정보 옵션 (필터박스)
  useEffect(() => {
    if (autoOrderStatusByType) {
      const options = transFilterSelectBox(autoOrderStatusByType);
      setAllAutoOrderStatusByTypeOptions(options);
    }
  }, [autoOrderStatusByType]);

  // 스토어 지역 옵션
  useEffect(() => {
    if (storeLocation) {
      const options = transFilterSelectBox(storeLocation);
      setStoreLocationOptions(options);
    }
  }, [storeLocation]);

  // 테이블 헤더 옵션
  useEffect(() => {
    if (storeSearchCord) {
      const options = transSelectBox(storeSearchCord);
      setStoreSearchCordOptions(options);
    }
  }, [storeSearchCord]);

  // 리스트 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 상세 데이터 가져오기
  useEffect(() => {
    if (query.id) {
      getInitData({ page: 0, size: 20 });
    }
    return () => {
      dispatch(storeGroupReset());
    };
  }, [query.id]);

  // 테이블 헤더 검색하기
  const handleSearch = data => {
    const { selectOptions, searchText } = data;

    const searchData = {
      storeSearchCord: selectOptions || null, // 키값을 params에 포함
      searchText,
    };

    getInitData({ page: 0, size: 20 }, searchData);
  };

  // 발주정보 수정
  const handleSelectChange = autoOrderStatus => {
    const ids = selectedRowKeys.map(key => `ids=${content.find(item => item.key === key).storeId}`).join('&');

    Modal.confirm({
      title: '발주 정보 변경',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div style={{ fontSize: '16px' }}>
          선택된 스토어들의 발주 정보를{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>{autoOrderStatus === 'AUTO_ORDER_ENABLED' ? '자동발주' : '미발주'}</span>로 업데이트
          하시겠습니까?`
        </div>
      ),
      okText: '확인',
      cancelText: '취소',
      onOk: () => {
        dispatch(
          updateStoreGroupDetailOnceAction({
            id: query.id,
            params: `${ids}&autoOrderStatus=${autoOrderStatus}`,
          }),
        );
        setValue('autoOrderStatusValue', null);
      },
      onCancel: () => {
        setValue('autoOrderStatusValue', null);
      },
    });
  };

  const watchAutoOrderStatusValue = useWatch({
    control,
    name: 'autoOrderStatusValue',
  });

  useEffect(() => {
    if (watchAutoOrderStatusValue) {
      handleSelectChange(watchAutoOrderStatusValue);
    }
  }, [watchAutoOrderStatusValue]);
  return (
    <>
      <NoticeLabel title={'👉🏼바슈롬의 스토어 그룹 상세 페이지입니다. 그룹에 속해 있는 스토어를 관리할 수 있습니다.'} />
      <DividingLine border={false} />
      {/* 스토어 그룹 정보 */}
      <StoreGroupDetailGroupNameTemplate autoOrderStatusByTypeOptions={autoOrderStatusByTypeOptions} />
      <DividingLine border={false} />
      <CardContainer>
        <Descriptions bordered={true} column={4} labelStyle={{ width: '200px' }}>
          <Descriptions.Item label="스토어 그룹명">{groupName}</Descriptions.Item>
        </Descriptions>
      </CardContainer>
      <DividingLine border={false} />
      {/* 필터 박스 */}
      <AdminStoreGroupDetailSearchBox
        selectOptions1={allAutoOrderStatusByTypeOptions}
        selectOptions2={storeLocationOptions}
        onHandleSearchData={getInitData}
        setResetState={setResetState}
      />
      <CardContainer>
        <ListHeaderSection
          handleSearch={handleSearch}
          handleChangePageOption={handlePageChange}
          pagination={pagination}
          selectOptions={storeSearchCordOptions}
          defaultValue="STORE_CODE"
          resetState={resetState}
          setResetState={setResetState}
        />
        <Tables
          checkbox={true}
          detail={false}
          listData={content}
          columns={columns}
          selectedRowKeys={selectedRowKeys}
          onSelectListItem={selectListItem}
          handleChangePageOption={handlePageChange}
          pagination={pagination}
          option={
            <Form onSubmit={handleSubmit()}>
              <>선택한 스토어 발주 정보 수정 : </>
              <Controller
                name="autoOrderStatusValue"
                defaultValue=""
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return (
                    <SelectBox
                      options={[
                        { label: '자동발주', value: 'AUTO_ORDER_ENABLED' },
                        { label: '미발주', value: 'AUTO_ORDER_DISABLED' },
                      ]}
                      css={{ width: '150px' }}
                      placeholder={'상태변경'}
                      value={value || null}
                      {...rest}
                    />
                  );
                }}
              />
            </Form>
          }
        />
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid>
          <ColGrid span={24} css={buttonRowStyle}>
            <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => router.push('/admin/store/group')} css={marginLeftStyle(5)} />
          </ColGrid>
        </RowGrid>
      </CardContainer>
    </>
  );
};

export default StoreGroupDetail;

const buttonRowStyle = css`
  display: flex;
  justify-content: left;
  align-items: center;
`;
