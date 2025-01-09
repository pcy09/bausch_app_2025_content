import { OrderStatus, Tables } from '@/components/atom';
import { ProductChangeButton } from '@/components/atom/TableAtoms';
import { Descriptions } from 'antd';

// 제품 정보
const columns = [
  {
    title: '제품 유형',
    dataIndex: 'data1',
    align: 'center',
  },
  {
    title: '제품명',
    dataIndex: 'data2',
    align: 'center',
  },
  {
    title: 'SKU',
    dataIndex: 'data3',
    align: 'center',
  },
  {
    title: '수량',
    dataIndex: 'data4',
    align: 'center',
  },
  {
    title: '근시',
    dataIndex: 'data5',
    align: 'center',
  },
  {
    title: '난시',
    dataIndex: 'data6',
    align: 'center',
  },
  {
    title: '축',
    dataIndex: 'data7',
    align: 'center',
  },
  {
    title: '구매가',
    dataIndex: 'data8',
    align: 'center',
  },
  {
    title: '주문일',
    dataIndex: 'data9',
    align: 'center',
  },
  {
    title: '제품 오더 상태',
    dataIndex: 'data10',
    align: 'center',
    render: status => {
      return <OrderStatus status={status} />;
    },
  },
  {
    title: '제품 변경',
    dataIndex: 'data11',
    align: 'center',
    render: (name, record) => {
      return <ProductChangeButton id={record.key} name={name} type={'coupon'} />;
    },
  },
];

const AdminCouponDetailSection = ({}) => {
  // 리스트 더미
  const store_list_dummy = [];
  for (let i = 0; i < 10; i++) {
    store_list_dummy.push({
      key: i,
      data1: '판매',
      data2: '시밀러트루(30)',
      data3: 'ULA6-0375275070',
      data4: '1',
      data5: '-4.25',
      data6: '-3.25',
      data7: '0',
      data8: '12,000',
      data9: '2024-01-01',
      data10: '바이오트루(30)',
      data11: '변경',
    });
  }

  return (
    <>
      <Descriptions title={'제품 정보'} />
      <Tables listData={store_list_dummy} columns={columns} detail={false} />
    </>
  );
};

export default AdminCouponDetailSection;
