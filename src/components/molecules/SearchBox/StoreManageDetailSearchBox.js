import { Col } from 'antd';
import { css } from '@emotion/react';
import {
  Buttons,
  CardContainer,
  ColGrid,
  DateSearchAtom,
  DividingLine,
  InputSearchAtom,
  Radios,
  RowGrid,
  SelectInputSearchAtom,
  SelectSearchAtom,
} from '@/components/atom';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useSelector } from 'react-redux';

const StoreManageDetailSearchBox = ({ selectOptions, selectInputOptions, onHandleSearchData }) => {
  const search = useSelector(state => state.optician.search);
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    const { date, searchType, searchText, searchInputText, selectOption } = data;
    const searchData = {
      startDate: date ? dayjs(data?.date[0]).format('YYYY-MM-DD') : null,
      endDate: date ? dayjs(data?.date[1]).format('YYYY-MM-DD') : null,
      searchType: searchType ?? null,
      searchText: searchText ?? null,
      searchInputText: searchInputText ?? null,
      showStatus: selectOption ?? null,
    };

    onHandleSearchData({ offset: 1, pageSize: 20 }, searchData);
    console.log(searchData, 'SEARCH DATA');
  };

  const handleResetSearch = () => {
    const searchData = {
      startDate: null,
      endDate: null,
      searchType: null,
      searchText: null,
      searchInputText: null,
      showStatus: null,
    };

    setValue('date', null);
    setValue('searchType', null);
    setValue('searchText', null);
    setValue('searchInputText', null);
    setValue('selectOption', null);

    onHandleSearchData({ offset: 1, pageSize: 20 }, searchData);
  };

  return (
    <div css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RowGrid>
          <ColGrid span={7}>
            {/*<InputSearchAtom type={'text'} title={'회원이름22'} placeholder={'검색어를 입력해주세요.'} control={control} />*/}
            <DateSearchAtom title={'스토어 등록기간'} control={control} />
          </ColGrid>
          <ColGrid span={1} />
          <ColGrid span={7}>
            <SelectSearchAtom control={control} title={'스토어 구분'} options={selectOptions} />
          </ColGrid>
          <ColGrid span={1} />
          <ColGrid span={7}>
            <SelectSearchAtom control={control} title={'자동발주'} options={selectOptions} />
          </ColGrid>
        </RowGrid>
        <DividingLine border={false} />
        <RowGrid>
          <ColGrid span={7}>
            <SelectSearchAtom control={control} title={'스토어 지역'} options={selectOptions} />
          </ColGrid>
        </RowGrid>

        <DividingLine border={false} />
        <RowGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            <Buttons type={'primary'} name={'검색'} htmlType={'submit'} css={marginRightStyle(5)} />
            <Buttons type={'default'} name={'초기화'} htmlType={'button'} css={marginLeftStyle(5)} onClick={handleResetSearch} />
          </ColGrid>
          <ColGrid span={8} />
        </RowGrid>
      </Form>
    </div>
  );
};

export default StoreManageDetailSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
