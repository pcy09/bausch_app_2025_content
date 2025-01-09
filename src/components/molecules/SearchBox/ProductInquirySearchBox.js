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
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';

const ProductInquirySearchBox = ({ getInitData }) => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = useCallback(
    data => {
      const searchData = {
        // ...data,
        searchText: data?.searchText,
        startDate: data?.date && dayjs(data?.date[0]).format('YYYY-MM-DD'),
        endDate: data?.date && dayjs(data?.date[1]).format('YYYY-MM-DD'),
      };
      console.log(data?.date);
      getInitData({ offset: 1, pageSize: 20 }, searchData);
    },
    [getInitData],
  );

  const handleResetSearch = () => {
    const searchData = {
      searchText: null,
      startDate: null,
      endDate: null,
    };

    setValue('searchText', null);
    setValue('date', null);

    getInitData({ offset: 1, pageSize: 20 }, searchData);
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RowGrid>
          <ColGrid span={7}>
            <InputSearchAtom type={'text'} title={'제목'} placeholder={'제목을 입력해주세요'} control={control} />
          </ColGrid>
          <ColGrid span={1} />
          <ColGrid span={7}>
            <DateSearchAtom title={'등록기간'} control={control} />
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
    </CardContainer>
  );
};

export default ProductInquirySearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
