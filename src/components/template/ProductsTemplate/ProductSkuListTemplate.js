import Tables from '../../atom/Tables';

const columns = [
  {
    title: 'No',
    dataIndex: 'number',
    width: 100,
    align: 'center',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    width: 100,
    align: 'center',
  },
  {
    title: '바코드',
    dataIndex: 'productBarcode',
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
  { title: '축', dataIndex: 'axis', align: 'center' },
  { title: 'ADD', dataIndex: 'lensAdd', align: 'center' },
  { title: 'BC', dataIndex: 'bc', align: 'center' },
  { title: '창고', dataIndex: 'wareHouseCode', align: 'center' },
  { title: 'REF#2', dataIndex: 'ref2', align: 'center' },
];
const ProductSkuListTemplate = ({ skuList }) => {
  return <Tables detail={false} listData={skuList} columns={columns} rowKey={'sku'} />;
};

export default ProductSkuListTemplate;
