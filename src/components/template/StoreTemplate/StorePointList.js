import { tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { ColGrid, DividingLine, RowGrid, SelectInputSearchAtom } from '@/components/atom';
import Tables from '../../atom/Tables';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOpticianListAction, opticianReset } from '@/store/reducers/admin/opticianReducer';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import StoreManageDetailSearchBox from '@/components/molecules/SearchBox/StoreManageDetailSearchBox';

const selectOptions = [
  {
    value: '',
    label: '전체',
  },
  {
    value: 'Y',
    label: '취급매장',
  },
  {
    value: 'N',
    label: '미취급매장',
  },
];

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    width: 100,
    align: 'center',
  },
  {
    title: '안경원명',
    dataIndex: 'fsStoreName',
    width: 300,
    align: 'center',
  },
  {
    title: '코드',
    dataIndex: 'fiStoreID',
    width: 100,
    align: 'center',
  },
  {
    title: '주소',
    dataIndex: 'fsStoreAddr1',
  },
  {
    title: 'ABC S/M',
    dataIndex: 'fsStoreABC',
    width: 100,
    align: 'center',
  },

  {
    title: '등록일',
    dataIndex: 'fdRegdate',
    width: 150,
    align: 'center',
  },
  {
    title: '판매매장',
    dataIndex: 'store_show_status',
    align: 'center',
  },
];

const selectInputOptions = [
  {
    value: 'fsStoreName',
    label: '안경원 이름',
  },
  {
    value: 'fiStoreID',
    label: '안경원 코드',
  },
];
const options = [
  {
    value: 'user_name',
    label: '이름',
  },
  {
    value: 'user_email',
    label: '이메일',
  },
  {
    value: 'user_phone',
    label: '휴대폰번호',
  },
];

const StorePointList = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { opticianList, paging } = useSelector(state => state.optician);
  const { register, control, handleSubmit } = useForm();

  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };

  useEffect(() => {
    getInitData();

    return () => {
      dispatch(opticianReset());
    };
  }, [dispatch, getInitData]);

  return (
    <>
      <StoreManageDetailSearchBox selectInputOptions={selectInputOptions} selectOptions={selectOptions} onHandleSearchData={getInitData} />

      <RowGrid css={tableRowStyle(12, 'center')}>
        <ColGrid span={8}>
          <span>
            조회된 컨텐츠는 총 <strong>{paging?.total}</strong>건 입니다.
          </span>
        </ColGrid>
        <ColGrid span={8} />
        <ColGrid span={8} css={tableSearch}>
          <SelectInputSearchAtom options={options} control={control} />
        </ColGrid>
      </RowGrid>
      <Tables listData={opticianList} columns={columns} pagination={paging} handleChangePageOption={getInitData} />

      <DividingLine border={false} />
    </>
  );
};

export default StorePointList;
