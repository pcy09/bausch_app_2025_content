import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { Buttons, CardContainer, ColGrid, DateSearchAtom, DividingLine, InputSearchAtom, RowGrid, SelectInputSearchAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import dayjs from 'dayjs';
import { css } from '@emotion/react';

const ManagementSearchBox = ({ selectInputOptions }) => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = useCallback(data => {
    const searchData = {
      ...data,
      startDate: data?.date && dayjs(data?.date[0]).format('YYYY-MM-DD'),
      endDate: data?.date && dayjs(data?.date[1]).format('YYYY-MM-DD'),
    };
  }, []);

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RowGrid>
          <ColGrid span={7}>
            <DateSearchAtom title={'등록일'} control={control} />
          </ColGrid>

          <ColGrid span={1} />
          <ColGrid span={7}>
            <SelectInputSearchAtom options={selectInputOptions} title={'검색어'} control={control} />
          </ColGrid>
        </RowGrid>

        <DividingLine border={false} />
        <RowGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            <Buttons type={'primary'} name={'검색'} htmlType={'submit'} css={marginRightStyle(5)} />
            <Buttons type={'default'} name={'초기화'} htmlType={'button'} css={marginLeftStyle(5)} />
          </ColGrid>
          <ColGrid span={8} />
        </RowGrid>
      </Form>
    </CardContainer>
  );
};

export default ManagementSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
