import { Buttons, ColGrid, DateSearchAtom, DividingLine, Form, RowGrid, SelectSearchAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { flexCenterStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';

//스토어 그룹 옵션
const group_options = [
  {
    value: 'all',
    label: '그룹 전체',
  },
  {
    value: 'store_01',
    label: '스토어1',
  },
  {
    value: 'store_02',
    label: '스토어2',
  },
  {
    value: 'store_03',
    label: '스토어3',
  },
];

//스토어 발주 옵션
const order_options = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'true',
    label: 'Y',
  },
  {
    value: 'false',
    label: 'N',
  },
];

//스토어 지역 옵션
const location_options = [
  {
    value: 'all',
    label: '지역 (시/도)',
  },
  {
    value: 'seoul',
    label: '서울',
  },
  {
    value: 'gyeonggi-do',
    label: '경기도',
  },
];

const StoreFilterBox = ({}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearchData(data);
  const onError = errors => handleError(errors);

  const handleSearchData = data => {
    console.log(data);
  };
  const handleResetSearch = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <RowGrid gutter={16}>
        <ColGrid span={6}>
          <DateSearchAtom title={'스토어 등록 기간'} control={control} />
        </ColGrid>
        <ColGrid span={6}>
          <SelectSearchAtom name="storeGroup" defaultValue="all" control={control} title={'스토어 그룹'} options={group_options} />
        </ColGrid>
        <ColGrid span={6}>
          <SelectSearchAtom name="storeOrder" defaultValue="all" control={control} title={'자동발주'} options={order_options} />
        </ColGrid>
        <ColGrid span={6}>
          <SelectSearchAtom name="storeLocation" defaultValue="all" control={control} title={'스토어 지역'} options={location_options} />
        </ColGrid>
      </RowGrid>
      <DividingLine border={false} />
      <RowGrid>
        <ColGrid span={8} />
        <ColGrid span={8} css={flexCenterStyle}>
          <Buttons
            type={'default'}
            name={'초기화'}
            htmlType={'button'}
            icon={<RedoOutlined />}
            css={marginRightStyle(5)}
            onClick={handleResetSearch}
          />
          <Buttons type={'primary'} name={'필터 적용'} htmlType={'submit'} icon={<SearchOutlined />} css={marginLeftStyle(5)} />
        </ColGrid>
        <ColGrid span={8} />
      </RowGrid>
    </Form>
  );
};

export default StoreFilterBox;
