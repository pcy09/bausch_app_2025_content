import { Col } from 'antd';
import { css } from '@emotion/react';
import {
  Buttons,
  CardContainer,
  Checkboxes,
  ColGrid,
  DateSearchAtom,
  DividingLine,
  InputSearchAtom,
  Radios,
  RowGrid,
  SelectInputSearchAtom,
  SelectSearchAtom,
} from '@/components/atom';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { getProductListAction } from '@/store/reducers/admin/productReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { useDispatch } from 'react-redux';

const ProductSearchBox = ({ selectOptions, onGetProductListData }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);
  const [isChecked, setIsChecked] = useState(false);

  const handleSearch = data => {
    const searchData = {
      brand_id: data?.selectOption,
      product_name: data?.searchText,
    };

    onGetProductListData({ offset: 1, pageSize: 2 }, searchData);

    console.log(searchData, '?');
  };
  const handleChangeDate = (name, value) => {
    setValue('startDate', value[0]);
    setValue('endDate', value[1]);
  };

  const handleResetSearch = () => {
    const searchData = {
      brand_id: null,
      product_name: null,
    };

    setValue('selectOption', null);
    setValue('searchText', null);

    onGetProductListData({ offset: 1, pageSize: 2 }, searchData);
  };
  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    const getValueObject = {
      findSightTypeCode,
      findLensCycleCode,
      findShowStatusCode,
    };
    dispatch(getProductListAction({ params, getValueObject }));
  };
  // 도수구분 상태 코드 custom hooks
  const [sightTypeCode, findSightTypeCode] = useCommonCode('sightTypeCode');
  // 사용주기 상태 코드 custom hooks
  const [lensCycleCode, findLensCycleCode] = useCommonCode('lensCycleCode');
  // 노출여부 상태 코드 custom hooks
  const [showStatusCode, findShowStatusCode] = useCommonCode('opticianShowStatusCode');

  useEffect(() => {
    if (findSightTypeCode && findLensCycleCode && findShowStatusCode) {
      getInitData({ offset: 1, pageSize: 10 });
    }
  }, [findSightTypeCode, findLensCycleCode, findShowStatusCode, getInitData]);

  const handleBrandCheckboxChange = isChecked => {
    setIsChecked(isChecked);
    if (isChecked) {
      // "애프터글로우"가 체크된 경우
      handleSearch({ brand_id: '애프터글로우', product_name: null });
    } else {
      // "애프터글로우"가 체크 해제된 경우
      getInitData({ offset: 1, pageSize: 10 });
    }
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RowGrid>
          <ColGrid span={7}>
            <SelectSearchAtom control={control} title={'브랜드명'} options={selectOptions} />
          </ColGrid>
          <ColGrid span={7}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>애프터글로우</span>
              <Checkboxes checked={isChecked} onChange={handleBrandCheckboxChange} />
            </div>
          </ColGrid>
          <ColGrid span={1} />
          <ColGrid span={7}>
            <InputSearchAtom type={'text'} title={'제품명'} placeholder={'주소를 입력해주세요.'} control={control} />
          </ColGrid>
          {/*<ColGrid span={1} />*/}
          {/*<Col span={7}>*/}
          {/*  <DateSearchAtom title={'기간'} control={control} />*/}
          {/*</Col>*/}
          <ColGrid span={8} />
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

export default ProductSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
