import { ColGrid, InputSearchAtom, RowGrid, Tables } from '@/components/atom';
import { tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { Form } from 'antd';
import { useForm } from 'react-hook-form';

export default function ProductManageGift() {
  const { register, control, handleSubmit } = useForm();

  return (
    <>
      <RowGrid css={tableRowStyle(12, 'center')}>
        <ColGrid span={7} />
        <ColGrid span={5} css={tableSearch}>
          <span style={{ marginRight: '10px' }}>제품명</span>
        </ColGrid>
        <ColGrid span={4} css={tableSearch}>
          <Form onSubmit={''}>
            <InputSearchAtom type={'text'} placeholder={'주소를 입력해주세요.'} control={control} />
          </Form>
        </ColGrid>
      </RowGrid>
      <Tables
        onSelectListItem={''}
        checkbox
        selectedRowKeys={'selectedRowKeys'}
        listData={''}
        columns={''}
        pagination={''}
        handleChangePageOption={''}
        slugType="productAccount"
      />
    </>
  );
}
