import { css } from '@emotion/react';
import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { useDispatch } from 'react-redux';
import { getStoreListAction } from '@/store/reducers/admin/storeReducer';
import { useEffect } from 'react';

const AdminStoreManageSearchBox = ({
  selectOptions1,
  selectOptions2,
  selectOptions3,
  onHandleSearchData,
  selectOptions4,
  tabStatus,
  setResetState,
}) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);
  const handleSearch = data => {
    const { date, autoOrderOption, lenslyOption, storeLocation, storeGroup } = data;

    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      autoOrderStatus: autoOrderOption === 'all' ? null : autoOrderOption,
      lenslyStatus: lenslyOption === 'all' ? null : lenslyOption,
      storeLocation: storeLocation === 'all' ? null : storeLocation,
      storeGroupId: storeGroup === 'all' ? null : storeGroup,
      storeType: tabStatus || null,
    };

    onHandleSearchData({ page: 0, size: 10 }, searchData);
  };

  const handleResetSearch = () => {
    const searchData = {
      storeType: tabStatus || null,
    };

    setValue('date', null);
    setValue('autoOrderOption', 'all');
    setValue('lenslyOption', 'all');
    setValue('storeLocation', 'all');
    setValue('storeGroup', 'all');
    reset();
    onHandleSearchData({ page: 0, size: 10 }, searchData);
    setResetState(true);
  };

  useEffect(() => {
    reset();
  }, [tabStatus, reset]);

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'스토어 등록기간'} control={control} />
          <SelectAtom defaultValue="all" control={control} title={'자동발주'} options={selectOptions1} name="autoOrderOption" />
          <SelectAtom defaultValue="all" control={control} title={'Lensly'} options={selectOptions2} name="lenslyOption" />
          <SelectAtom defaultValue="all" control={control} title={'스토어 지역'} options={selectOptions3} name="storeLocation" />
          <SelectAtom
            style={{ width: '150px' }}
            defaultValue="all"
            control={control}
            title={'스토어 그룹'}
            options={selectOptions4}
            name="storeGroup"
          />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default AdminStoreManageSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
