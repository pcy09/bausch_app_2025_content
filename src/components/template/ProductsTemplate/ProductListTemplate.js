import { Buttons, CardContainer, Form, ColGrid, RowGrid, SelectBox, InputSearchAtom } from '@/components/atom';
import { contentsContainerStyle, marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import OpticianSearchBox from '../../molecules/SearchBox/OpticianSearchBox';
import { DownloadOutlined } from '@ant-design/icons';
import Tables from '../../atom/Tables';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { PageTitle, ProductSearchBox } from '@/components/molecules';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListAction, productDeleteAction } from '@/store/reducers/admin/productReducer';
import { useRouter } from 'next/router';
import useCommonCode from '@/hooks/useCommonCode';

import { useForm } from 'react-hook-form';
import SelectMultiBox from '@/components/atom/SelectMultiBox';

const showStatusOptions = [
  { label: '노출', value: '노출' },
  { label: '비노출', value: '비노출' },
];

const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    width: 40,
    align: 'center',
  },
  {
    title: '브랜드명',
    dataIndex: 'brand_name',
    align: 'center',
  },
  {
    title: '제품명',
    dataIndex: 'product_name',
    align: 'center',
  },
  {
    title: '도수구분',
    dataIndex: 'sight_code',
    align: 'center',
  },
  {
    title: '사용주기',
    dataIndex: 'cycle_code',
    align: 'center',
  },
  {
    title: '소비자가',
    dataIndex: 'product_price',
    align: 'center',
  },
  {
    title: '할인율',
    dataIndex: 'user_discount',
    align: 'center',
  },
  {
    title: '최종 판매가',
    dataIndex: 'sale_price',
    align: 'center',
  },
  {
    title: '이벤트 상품',
    dataIndex: 'product_event',
    align: 'center',
  },
  {
    title: '노출',
    dataIndex: 'show_status',
    align: 'center',
    render: (text, record) => (
      <SelectBox options={showStatusOptions} placeholder="Select status" defaultValue={text === '노출' ? '노출' : '비노출'} />
    ),
  },
  {
    title: '등록일',
    dataIndex: 'product_register_date',
    align: 'center',
  },
];

const ProductListTemplate = ({ onGetProductListData }) => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.product.productList);
  const pagination = useSelector(state => state.product.paging);
  const search = useSelector(state => state.product.search);
  const onError = errors => console.log('fail', errors);

  const { brandInfo } = useSelector(state => state.commonCode);

  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 회원 상태 변경
  const onSubmit = data => handleSendData(data);
  const onFilterSubmit = data => handleSearch(data);

  const handleSearch = data => {
    const searchData = {
      brand_id: data?.selectOption,
      product_name: data?.searchText,
    };

    getInitData({ offset: 1, pageSize: 2 }, searchData);

    console.log(searchData, '?');
  };

  const handleResetSearch = () => {
    const searchData = {
      brand_id: null,
      product_name: null,
    };

    setValue('selectOption', null);
    setValue('searchText', null);

    getInitData({ offset: 1, pageSize: 2 }, searchData);
  };
  const handleChangeDate = (name, value) => {
    setValue('startDate', value[0]);
    setValue('endDate', value[1]);
  };

  // 상품 상태 변경 함수
  const handleSendData = data => {
    const sendObject = {
      ...data,
      ids: selectedRowKeys,
    };

    // const params = {
    //   pageSize: pagination.pageSize,
    //   offset: pagination.current,
    //   status: tab,
    //   ...search,
    // };

    dispatch(productDeleteAction({ sendObject }));
    setSelectedRowKeys([]);
  };

  // 리스트 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 브랜드 선택 select option
  const selectOption = brandInfo?.reduce(
    (acc, cur) =>
      acc.concat({
        label: cur.brand_name,
        id: cur.id,
        value: cur.id,
      }),
    [],
  );

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  // 도수구분 상태 코드 custom hooks
  const [sightTypeCode, findSightTypeCode] = useCommonCode('sightTypeCode');
  // 사용주기 상태 코드 custom hooks
  const [lensCycleCode, findLensCycleCode] = useCommonCode('lensCycleCode');
  // 노출여부 상태 코드 custom hooks
  const [showStatusCode, findShowStatusCode] = useCommonCode('opticianShowStatusCode');

  const router = useRouter();
  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    const getValueObject = {
      findSightTypeCode,
      findLensCycleCode,
      findShowStatusCode,
    };
    dispatch(getProductListAction({ params, getValueObject }));
  };

  useEffect(() => {
    if (findSightTypeCode && findLensCycleCode && findShowStatusCode) {
      getInitData({ offset: 1, pageSize: 10 });
    }
  }, [findSightTypeCode, findLensCycleCode, findShowStatusCode]);

  return (
    <>
      <ProductSearchBox selectOptions={selectOption} onGetProductListData={getInitData} />

      <CardContainer>
        <RowGrid css={marginBottomStyle(12)}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{pagination?.total}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />

          <ColGrid span={8} css={buttonRowStyle}>
            <Form onSubmit={handleSubmit(onFilterSubmit, onError)}>
              <InputSearchAtom type={'text'} title={'제품명'} placeholder={'주소를 입력해주세요.'} control={control} />
              <Buttons type={'primary'} name={'검색'} htmlType={'submit'} css={marginRightStyle(5)} onClick={handleResetSearch} />
              <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} htmlType={'button'} css={marginRightStyle(10)} />
              <Buttons type={'primary'} ghost name={'제품 등록'} htmlType={'button'} onClick={() => router.push('/products/create')} />
            </Form>
          </ColGrid>
        </RowGrid>
        <Tables
          onSelectListItem={selectListItem}
          selectedRowKeys={selectedRowKeys}
          checkbox
          listData={productList}
          columns={columns}
          pagination={pagination}
          handleChangePageOption={getInitData}
          option={
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Buttons type={'default'} name="삭제" htmlType={'submit'} css={marginLeftStyle(5)}></Buttons>
              <Buttons type={'default'} name="삭제" htmlType={'submit'} css={marginLeftStyle(5)}></Buttons>
            </Form>
          }
        />
      </CardContainer>
      {/* atom multi select Test */}
      <SelectMultiBox />
    </>
  );
};

export default ProductListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const pageTitleStyle = css`
  .ant-card-body {
    padding: 0 24px 24px;
  }
`;

// 이전 커밋
// import { Buttons, CardContainer, Form, ColGrid, RowGrid } from '@/components/atom';
// import { contentsContainerStyle, marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
// import OpticianSearchBox from '../../molecules/SearchBox/OpticianSearchBox';
// import { DownloadOutlined } from '@ant-design/icons';
// import Tables from '../../atom/Tables';
// import { css } from '@emotion/react';
// import { useEffect, useState } from 'react';
// import { ProductSearchBox } from '@/components/molecules';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProductListAction, productDeleteAction } from '@/store/reducers/productReducer';
// import { useRouter } from 'next/router';
// import useCommonCode from '@/hooks/useCommonCode';

// import { useForm } from 'react-hook-form';

// const columns = [
//   {
//     title: 'No',
//     dataIndex: 'id',
//     width: 40,
//     align: 'center',
//   },
//   {
//     title: '브랜드명',
//     dataIndex: 'brand_name',
//     align: 'center',
//   },
//   {
//     title: '제품명',
//     dataIndex: 'product_name',
//     align: 'center',
//   },
//   {
//     title: '도수구분',
//     dataIndex: 'sight_code',
//     align: 'center',
//   },
//   {
//     title: '사용주기',
//     dataIndex: 'cycle_code',
//     align: 'center',
//   },
//   {
//     title: '소비자가',
//     dataIndex: 'product_price',
//     align: 'center',
//   },
//   {
//     title: '할인율',
//     dataIndex: 'user_discount',
//     align: 'center',
//   },
//   {
//     title: '최종 판매가',
//     dataIndex: 'sale_price',
//     align: 'center',
//   },
//   {
//     title: '이벤트 상품',
//     dataIndex: 'product_event',
//     align: 'center',
//   },
//   {
//     title: '노출',
//     dataIndex: 'show_status',
//     align: 'center',
//   },
//   {
//     title: '등록일',
//     dataIndex: 'product_register_date',
//     align: 'center',
//   },
// ];

// const ProductListTemplate = () => {
//   const dispatch = useDispatch();
//   const productList = useSelector(state => state.product.productList);
//   const pagination = useSelector(state => state.product.paging);
//   const search = useSelector(state => state.product.search);

//   const { brandInfo } = useSelector(state => state.commonCode);

//   // 체크박스 선택 값
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

//   // 회원 상태 변경
//   const onSubmit = data => handleSendData(data);

//   // 상품 상태 변경 함수
//   const handleSendData = data => {
//     const sendObject = {
//       ...data,
//       ids: selectedRowKeys,
//     };
//     // const params = {
//     //   pageSize: pagination.pageSize,
//     //   offset: pagination.current,
//     //   status: tab,
//     //   ...search,
//     // };
//     dispatch(productDeleteAction({ sendObject }));
//     setSelectedRowKeys([]);
//   };

//   // 리스트 아이템 선택
//   const selectListItem = newSelectedRowKeys => {
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   // 브랜드 선택 select option
//   const selectOption = brandInfo?.reduce(
//     (acc, cur) =>
//       acc.concat({
//         label: cur.brand_name,
//         id: cur.id,
//         value: cur.id,
//       }),
//     [],
//   );

//   const {
//     handleSubmit,
//     formState: { errors },
//   } = useForm({});

//   // 도수구분 상태 코드 custom hooks
//   const [sightTypeCode, findSightTypeCode] = useCommonCode('sightTypeCode');
//   // 사용주기 상태 코드 custom hooks
//   const [lensCycleCode, findLensCycleCode] = useCommonCode('lensCycleCode');
//   // 노출여부 상태 코드 custom hooks
//   const [showStatusCode, findShowStatusCode] = useCommonCode('opticianShowStatusCode');

//   const router = useRouter();
//   const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
//     const params = {
//       pageSize,
//       offset,
//       ...search,
//     };
//     const getValueObject = {
//       findSightTypeCode,
//       findLensCycleCode,
//       findShowStatusCode,
//     };
//     dispatch(getProductListAction({ params, getValueObject }));
//   };

//   useEffect(() => {
//     if (findSightTypeCode && findLensCycleCode && findShowStatusCode) {
//       getInitData({ offset: 1, pageSize: 10 });
//     }
//   }, [findSightTypeCode, findLensCycleCode, findShowStatusCode]);

//   return (
//     <CardContainer css={contentsContainerStyle} shadow={false}>
//       <ProductSearchBox selectOptions={selectOption} onGetProductListData={getInitData} />

//       <CardContainer>
//         <RowGrid css={marginBottomStyle(12)}>
//           <ColGrid span={8}>
//             <span>
//               조회된 컨텐츠는 총 <strong>{pagination?.total}</strong>건 입니다.
//             </span>
//           </ColGrid>
//           <ColGrid span={8} />
//           <ColGrid span={8} css={buttonRowStyle}>
//             <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} htmlType={'button'} css={marginRightStyle(10)} />
//             <Buttons type={'primary'} ghost name={'제품 등록'} htmlType={'button'} onClick={() => router.push('/products/create')} />
//           </ColGrid>
//         </RowGrid>
//         <Tables
//           onSelectListItem={selectListItem}
//           selectedRowKeys={selectedRowKeys}
//           checkbox
//           listData={productList}
//           columns={columns}
//           pagination={pagination}
//           handleChangePageOption={getInitData}
//           option={
//             <Form onSubmit={handleSubmit(onSubmit)}>
//               <Buttons type={'default'} name="삭제" htmlType={'submit'} css={marginLeftStyle(5)}></Buttons>
//             </Form>
//           }
//         />
//       </CardContainer>
//     </CardContainer>
//   );
// };

// export default ProductListTemplate;

// const buttonRowStyle = css`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
// `;
