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
import useCommonCode from '@/hooks/useCommonCode';
import { updateSearchParams } from '@/store/reducers/eventReducer';
import { useDispatch } from 'react-redux';

const EventSearchBox = ({ eventStatusCode, showStatusCode, onHandleSearchEvent, getInitData }) => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const onSubmit = data => onHandleSearchEvent(data);
  const onError = errors => console.log('fail', errors);

  // const handleSearch = useCallback(data => {
  //   const searchData = {
  //     ...data,
  //     startDate: data?.date && dayjs(data?.date[0]).format('YYYY-MM-DD'),
  //     endDate: data?.date && dayjs(data?.date[1]).format('YYYY-MM-DD'),
  //   };
  //
  //   console.log(searchData);
  // }, []);
  const handleChangeDate = (name, value) => {
    setValue('startDate', value[0]);
    setValue('endDate', value[1]);
  };

  const handleResetSearch = () => {
    const searchObject = {
      date: null,
      status: null,
      showStatus: null,
      searchText: null,
    };

    dispatch(updateSearchParams({ search: searchObject }));

    setValue('date', null);
    setValue('status', null);
    setValue('showStatus', null);
    setValue('searchText', null);
    getInitData({}, searchObject);
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RowGrid>
          <ColGrid span={7}>
            {/*<InputSearchAtom type={'text'} title={'회원이름22'} placeholder={'검색어를 입력해주세요.'} control={control} />*/}
            <DateSearchAtom format={'YYYY-MM'} placeholder={['시작 달', '종료 달']} period={'month'} title={'이벤트 기간'} control={control} />
          </ColGrid>
          <ColGrid span={1} />
          <Col span={7}>
            <SelectSearchAtom name={'status'} control={control} title={'구분'} options={eventStatusCode} />
          </Col>
          <ColGrid span={1} />
          <ColGrid span={7}>
            <SelectSearchAtom name={'showStatus'} control={control} title={'노출 여부'} options={showStatusCode} />
          </ColGrid>
        </RowGrid>
        <DividingLine border={false} />
        <RowGrid>
          <ColGrid span={7}>
            <InputSearchAtom type={'text'} title={'검색'} placeholder={'이벤트 제목을 입력해주세요.'} control={control} />
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

export default EventSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
