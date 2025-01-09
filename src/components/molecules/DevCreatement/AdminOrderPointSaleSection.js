import { OrderStatus, Tables } from '@/components/atom';
import { ProductChangeButton } from '@/components/atom/TableAtoms';
import { Descriptions } from 'antd';

const AdminOrderPointSaleSection = ({ listData, isDisabled, pointProductGroupId }) => {
  // 제품 정보
  const columns = [
    {
      title: '제품 유형',
      dataIndex: 'productType',
      align: 'center',
    },
    {
      title: '제품명',
      dataIndex: 'productName',
      align: 'center',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      align: 'center',
    },
    {
      title: '수량',
      dataIndex: 'productQuantity',
      align: 'center',
    },
    {
      title: '근시',
      dataIndex: 'myopia',
      align: 'center',
    },
    {
      title: '난시',
      dataIndex: 'asti',
      align: 'center',
    },
    {
      title: '축',
      dataIndex: 'axis',
      align: 'center',
    },
    {
      title: 'ADD',
      dataIndex: 'add',
      align: 'center',
    },
    {
      title: '구매가',
      dataIndex: 'productPointPrice',
      align: 'center',
    },
    {
      title: '주문일',
      dataIndex: 'transactionDate',
      align: 'center',
    },
    {
      title: '제품 오더 상태',
      dataIndex: 'orderStatus',
      align: 'center',
      render: status => {
        return <OrderStatus status={status} />;
      },
    },
    {
      title: '제품 변경',
      dataIndex: 'key',
      align: 'center',
      render: (name, record) => {
        return <ProductChangeButton record={record} name={'변경'} disabled={isDisabled} pointProductGroupId={pointProductGroupId} />;
      },
    },
  ];
  return (
    <>
      <Descriptions title={'제품 정보'} />
      <Tables listData={listData} columns={columns} detail={false} />
    </>
  );
};

export default AdminOrderPointSaleSection;
