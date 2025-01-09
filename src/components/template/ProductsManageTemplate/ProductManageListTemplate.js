// components
import { ListHeaderSection } from '@/components/molecules';
import { Buttons, CardContainer, DividingLine, Form } from '@/components/atom';
import Tables from '../../atom/Tables';
import NoticeLabel from '@/components/atom/Notice';
import ProductMangeSearchBox from '@/components/molecules/SearchBox/ProductMangeSearchBox';
import ListFooterSection from '@/components/molecules/ListFooterSection';

//antd
import { Modal, Tabs } from 'antd';
import { ExclamationCircleOutlined, SettingOutlined } from '@ant-design/icons';

//css
import { marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';

//redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

//lib
import { useForm } from 'react-hook-form';
import { PRODUCT_GROUP_OPTIONS, RETIRED_OPTIONS } from '@/common/options';
import usePagination from '@/hooks/usePagination';
import { getProductListAction, productDeleteAction, productReset } from '@/store/reducers/admin/productReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { downloadExcel, transFilterSelectBox } from '@/common/utiles';
import { getProductLenslyListAction, productDeleteLenslyAction, productLenslyReset } from '@/store/reducers/admin/productLenslyReducer';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

// 탭 메뉴 배열 만들기
const tabMenuList = () => {
  return [
    {
      label: 'BAUSCH',
      key: 'B',
    },
    {
      label: 'LENSLY',
      key: 'L',
    },
  ];
};

const columns = [
  {
    title: 'No',
    dataIndex: 'productId',
    align: 'center',
  },
  {
    title: '제품 그룹명',
    dataIndex: 'productGroupName',
    align: 'center',
  },
  {
    title: '제품명',
    dataIndex: 'productName',
    align: 'center',
  },
  {
    title: '도수 구분',
    dataIndex: 'lensPowerType',
    align: 'center',
  },
  {
    title: '사용 주기',
    dataIndex: 'lensCycle',
    align: 'center',
  },
  {
    title: '등록일',
    dataIndex: 'createdDate',
    align: 'center',
    defaultSortOrder: 'descend',
    sorter: (a, b) => {
      return a.key - b.key;
    },
  },
  {
    title: '단종',
    dataIndex: 'salesStatus',
    align: 'center',
    defaultSortOrder: 'salesStatus',
    sorter: (a, b) => {
      return a.key - b.key;
    },
  },
];

const ProductManageListTemplate = () => {
  const dispatch = useDispatch();
  const { push, query } = useRouter();
  const { tab } = query;

  // 페이지 네이션 용 커스텀훅
  const { handlePageChange, getInitData, pagination } = usePagination(state => state.product, getProductListAction);

  const {
    handlePageChange: lenslyHandlePageChange,
    getInitData: lenslyGetInitData,
    pagination: lenslyPagination,
  } = usePagination(state => state.productLensly, getProductLenslyListAction);

  const { paging, content, totalElements } = useSelector(state => state.product);
  const { paging: lenslyPaging, content: lenslyContent, totalElements: lenslyTotalElements } = useSelector(state => state.productLensly);

  const { salesStatus, productGroupBausch, productGroupLensly } = useCommonCodeBatch(['salesStatus', 'productGroupBausch', 'productGroupLensly']);

  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 탭 상태
  const [tabStatus, setTabStatus] = useState(tab || 'B');
  const [bauschGroupOptions, setBauschGroupOptions] = useState([]);
  const [lenslyGroupOptions, setLenslyGroupOptions] = useState([]);
  const [salesStatusOptions, setSalesStatusOptions] = useState([]);
  const [resetState, setResetState] = useState(false);
  // 제품 그룹 옵션 (바슈)
  useEffect(() => {
    if (productGroupBausch) {
      const options = transFilterSelectBox(productGroupBausch);
      setBauschGroupOptions(options);
    }
  }, [productGroupBausch]);

  // 제품 그룹 옵션 (렌즐리)
  useEffect(() => {
    if (productGroupLensly) {
      const options = transFilterSelectBox(productGroupLensly);
      setLenslyGroupOptions(options);
    }
  }, [productGroupLensly]);

  // 단종 옵션
  useEffect(() => {
    if (salesStatus) {
      const options = transFilterSelectBox(salesStatus);
      setSalesStatusOptions(options);
    }
  }, [salesStatus]);

  useEffect(() => {
    if (tab) {
      setTabStatus(tab);
    }
  }, [tab]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // 삭제에 대한 상태 변경
  const onSubmit = data => handleSendData(data);

  // 상품 상태 변경 함수
  const handleSendData = data => {
    const sendObject = {
      ids: selectedRowKeys,
    };

    tabStatus === 'B' ? dispatch(productDeleteAction({ sendObject })) : dispatch(productDeleteLenslyAction({ sendObject }));
    setSelectedRowKeys([]);
  };

  // 리스트 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    tabStatus === 'B' ? getInitData() : lenslyGetInitData();

    return () => {
      dispatch(productReset());
      dispatch(productLenslyReset());
    };
  }, [tabStatus]);

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e, url) => {
    if (key === 'B') {
      setResetState(true);
      push(`/admin/product/manage?tab=${key}`);
    } else if (key === 'L') {
      setResetState(true);
      push(`/admin/product/manage?tab=${key}`);
    }
  };

  // 엑셀로 내보낼 데이터 형식 조정
  const exportData = content?.map(item => ({
    No: item.productId,
    제품그룹명: item.productGroupName,
    제품명: item.productName,
    도수구분: item.lensPowerType,
    사용주기: item.lensCycle,
    등록일: item.createdDate,
    단종: item.salesStatus,
  }));

  const handleDownloadExcelClick = () => {
    Modal.confirm({
      title: '엑셀 다운로드',
      icon: <ExclamationCircleOutlined />,
      content: '현재 테이블을 엑셀 다운로드 하시겠습니까?',
      okText: '다운로드',
      cancelText: '취소',
      onOk: () => downloadExcel(exportData),
    });
  };

  const goRouterHandler = type => {
    const typing = type === 'B' ? 'bausch' : 'lensly';
    push(`/admin/product/manage/sub/${typing}`);
  };

  // 제품명 검색 입력 함수
  const handleSearch = data => {
    const params = {
      searchProductName: data.searchText,
    };
    if (tabStatus === 'B') {
      getInitData({ page: 0, size: 20 }, params);
    } else {
      lenslyGetInitData({ page: 0, size: 20 }, params);
    }
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 바슈롬의 제품 리스트이며, 바슈롬의 제품을 관리하는 페이지입니다. '} />
        <Buttons
          type={'dashed'}
          icon={<SettingOutlined />}
          name={'증정제품 관리'}
          onClick={() => push('/admin/product/manage/set-giveaway')}
          css={marginRightStyle(10)}
        />
      </div>
      <DividingLine border={false} />
      <Tabs
        activeKey={tabStatus}
        onTabClick={(key, e, url) => handleChangeTabMenu(key, e, url)}
        type="line"
        centered
        size={'smail'}
        items={tabMenuList()}
      />
      {/* 필터 박스 */}
      <ProductMangeSearchBox
        selectGroupOption={tabStatus === 'B' ? bauschGroupOptions : lenslyGroupOptions}
        salesStatusOption={salesStatusOptions} // 단종 salesStatusOptions
        onHandleSearchData={tabStatus === 'B' ? getInitData : lenslyGetInitData}
        tabStatus={tabStatus}
        setResetState={setResetState}
      />

      <CardContainer>
        <ListHeaderSection
          handleSearch={handleSearch}
          total={tabStatus === 'B' ? totalElements : lenslyTotalElements}
          select={selectedRowKeys?.length}
          searchPlaceholder={'제품명 입력'}
          resetState={resetState}
          setResetState={setResetState}
        />
        <Tables
          tabStatus={tabStatus}
          checkbox
          selectedRowKeys={selectedRowKeys}
          onSelectListItem={selectListItem}
          listData={tabStatus === 'B' ? content : lenslyContent}
          columns={columns}
          pagination={tabStatus === 'B' ? pagination : lenslyPagination}
          handleChangePageOption={tabStatus === 'B' ? handlePageChange : lenslyHandlePageChange}
          slugType="productAccount"
          option={
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Buttons htmlType={'danger'} type={'danger'} name="삭제" css={marginLeftStyle(5)}></Buttons>
            </Form>
          }
        />
      </CardContainer>

      <DividingLine border={false} />

      <CardContainer>
        <ListFooterSection
          goRouterHandler={() => goRouterHandler(tabStatus)}
          showButton={true}
          showLeftBtn={true}
          showRightBtn={true}
          lfText="엑셀 다운로드"
          rtText={`${tabStatus === 'B' ? '바슈롬 제품등록' : '렌즐리 제품등록'}`}
          onClick={handleDownloadExcelClick}
        />
      </CardContainer>
    </>
  );
};

export default ProductManageListTemplate;

const descStyle = css`
  display: flex;
  justify-content: space-between;
`;
