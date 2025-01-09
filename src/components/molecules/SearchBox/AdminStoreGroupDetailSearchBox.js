import { Col } from 'antd';
import { css } from '@emotion/react';
import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';

const AdminStoreGroupDetailSearchBox = ({ selectOptions1, selectOptions2, onHandleSearchData, setResetState }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    const { date, autoOrderOption, storeLocation } = data;

    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      autoOrderStatus: autoOrderOption === 'all' ? null : autoOrderOption,
      storeLocation: storeLocation === 'all' ? null : storeLocation,
    };

    onHandleSearchData({ page: 0, size: 10 }, searchData); // 검색시 초기화
  };

  //초기화
  const handleResetSearch = () => {
    setValue('date', null);
    setValue('storeLocation', 'all');
    setValue('autoOrderOption', 'all');
    setResetState(true);
    onHandleSearchData({ page: 0, size: 20 });
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'등록일'} control={control} />
          <SelectAtom defaultValue="all" control={control} title={'발주 정보'} options={selectOptions1} name="autoOrderOption" />
          <SelectAtom defaultValue="all" control={control} title={'스토어 지역'} options={selectOptions2} name="storeLocation" />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default AdminStoreGroupDetailSearchBox;
