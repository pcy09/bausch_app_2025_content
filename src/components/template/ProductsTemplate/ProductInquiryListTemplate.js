import { contentsContainerStyle, marginBottomStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { ProductSearchBox } from '@/components/molecules';
import { Buttons, CardContainer, ColGrid, RowGrid } from '@/components/atom';
import { DownloadOutlined } from '@ant-design/icons';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import ProductInquirySearchBox from '../../molecules/SearchBox/ProductInquirySearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getProductInquiryAction } from '@/store/reducers/app/productInquiryReducer';

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    width: 40,
    align: 'center',
  },
  {
    title: '제목',
    dataIndex: 'qa_title',
  },
  {
    title: '제품명',
    dataIndex: 'product_name',
    align: 'center',
  },
  {
    title: '문의자',
    dataIndex: 'user_email',
    align: 'center',
  },
  {
    title: '작성일',
    dataIndex: 'qa_register_date',
    align: 'center',
  },
  {
    title: '답변',
    dataIndex: 'answer_status',
    align: 'center',
  },
];

const ProductInquiryListTemplate = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productInquiry.productInquiryKey);

  // //TODO: 추가할 것 체크박스 선택 값
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const newProductList = productList?.map(item => ({ ...item, qa_register_date: item.qa_register_date.substr(0, 19).replaceAll('T', ' ') }));

  const pagination = useSelector(state => state.productInquiry.productInquiryData.paging);

  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getProductInquiryAction({ params }));
  };

  //TODO: 추가할 것 리스트 아이템 선택
  // const selectListItem = newSelectedRowKeys => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  useEffect(() => {
    getInitData({ offset: 1, pageSize: 20 });
  }, []);
  return (
    <>
      <ProductInquirySearchBox getInitData={getInitData} />
      <CardContainer>
        <RowGrid css={marginBottomStyle(12)}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{pagination?.total}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            {/*<Buttons type={'primary'} ghost name={'제품 등록'} htmlType={'submit'} />*/}
          </ColGrid>
        </RowGrid>
        <Tables
          // selectedRowKeys={selectedRowKeys}
          // onSelectListItem={selectListItem}
          checkbox
          listData={newProductList}
          columns={columns}
          pagination={pagination}
          handleChangePageOption={getInitData}
        />
      </CardContainer>
    </>
  );
};
export default ProductInquiryListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
