import { buttonFlexEndRowStyle, contentsContainerStyle, marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { Buttons, CardContainer, ColGrid, RowGrid } from '@/components/atom';
import { DownloadOutlined } from '@ant-design/icons';
import Tables from '../../atom/Tables';
import { useEffect } from 'react';
import { ManagementSearchBox } from '@/components/molecules/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { getManagerList, managerReset } from '@/store/reducers/admin/managerReducer';

const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    width: 40,
    align: 'center',
  },
  {
    title: '관리자명',
    dataIndex: 'manager_name',
    width: 200,
    align: 'center',
  },
  {
    title: '소속',
    dataIndex: 'manager_group',
    width: 250,
    align: 'center',
  },
  {
    title: '이메일',
    dataIndex: 'manager_email',
  },
  {
    title: '휴대전화번호',
    dataIndex: 'manager_phone',
    width: 300,
    align: 'left',
  },
  {
    title: '등록일',
    dataIndex: 'manager_register_date',
    width: 300,
    align: 'left',
  },
];

const selectInputOptions = [
  {
    value: 'name',
    label: '관리자 명',
  },
  {
    value: 'number',
    label: '전화번호',
  },
];

const ManagementListTemplate = () => {
  const dispatch = useDispatch();
  const managerData = useSelector(state => state.manager.managerList);
  const pagination = useSelector(state => state.manager.paging);

  const getManagerListData = params => {
    dispatch(getManagerList({ params }));
  };

  useEffect(() => {
    const params = {
      pageSize: 5,
      offset: 1,
    };
    getManagerListData(params);
    return () => {
      dispatch(managerReset());
    };
  }, []);

  return (
    <>
      {/*<OpticianSearchBox selectInputOptions={selectInputOptions} selectOptions={selectOptions} />*/}
      <ManagementSearchBox selectInputOptions={selectInputOptions} />
      <CardContainer>
        <RowGrid css={marginBottomStyle(12)}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{pagination?.total}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonFlexEndRowStyle}>
            <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} />
          </ColGrid>
        </RowGrid>
        <Tables listData={managerData} pagination={pagination} handleChangePageOption={getManagerListData} columns={columns} />
      </CardContainer>
    </>
  );
};

export default ManagementListTemplate;
