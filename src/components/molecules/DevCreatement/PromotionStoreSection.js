import { Buttons, ColGrid, Inputs, RowGrid, SelectBox, Tables } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Descriptions, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { marginBottomStyle, marginLeftStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import css from 'styled-jsx/css';
import { useState } from 'react';
import { openPopupAction } from '@/store/reducers/popupReducer';
import { openStore } from '@/store/reducers/admin/storeSettingReducer';
// 리스트 칼럼 설정
const columns = [
  {
    title: '스토어 코드',
    dataIndex: 'store_code',
    align: 'center',
  },
  {
    title: '스토어명',
    dataIndex: 'store_name',
    align: 'center',
  },
  {
    title: '스토어 그룹',
    dataIndex: 'store_group',
    align: 'center',
  },
  {
    title: 'ABC S/M',
    dataIndex: 'store_abc',
    align: 'center',
  },
  {
    title: '자동발주',
    dataIndex: 'store_order',
    align: 'center',
  },
  {
    title: '지역(시/도)',
    dataIndex: 'store_location',
    align: 'center',
  },
  {
    title: '주소(구/군/동)',
    dataIndex: 'store_address',
    align: 'center',
  },
  {
    title: '등록일',
    dataIndex: 'store_date',
    align: 'center',
  },
];

//스토어 그룹 옵션
const options = [
  {
    value: 'store_01',
    label: '스토어1',
  },
  {
    value: 'store_02',
    label: '스토어2',
  },
  {
    value: 'store_03',
    label: '스토어3',
  },
];

const PromotionStoreSection = ({}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchStore, setSearchStore] = useState();
  const dispatch = useDispatch();

  const handleStore = () => {
    dispatch(openStore());
  };
  const handlePopup = type => {
    const updateData = {
      show: true,
      type,
    };
    dispatch(openPopupAction(updateData));
  };
  // 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 스토어 리스트 더미
  const store_list_dummy = [];
  for (let i = 0; i < 10; i++) {
    store_list_dummy.push({
      key: i,
      store_group: '다비치',
      store_name: `아이좋은나라${i}`,
      store_code: '708997',
      store_order: 'YES',
      store_abc: 'CM',
      store_location: '경기도',
      store_address: '다산동',
      store_date: '2018-3-24',
    });
  }

  // 페이지네이션
  const paging = { total: 150, pageSize: 10, current: 1 };

  const handleSearch = searchText => {
    console.log('스토어명 : ' + searchStore, '검색어 : ' + searchText);
  };
  const handleSelect = value => {
    setSearchStore(value);
  };
  return (
    <>
      <Descriptions title={'스토어 설정'} extra={<Buttons onClick={handleStore} name={'대상 스토어 설정'} />} />

      <RowGrid css={marginBottomStyle(12)} gutter={12}>
        <ColGrid span={16} css={span_style}>
          <span>
            전체 : <strong>{store_list_dummy?.length}</strong>개 / 선택 : <strong>{selectedRowKeys?.length}</strong>개
          </span>
        </ColGrid>
        <ColGrid span={3} css={tableSearch}>
          <SelectBox onChange={handleSelect} defaultValue={searchStore} options={options} placeholder={'스토어명'} />
        </ColGrid>
        <ColGrid span={5}>
          <Input.Search type="text" placeholder="검색어 입력" onSearch={handleSearch} enterButton />
        </ColGrid>
      </RowGrid>
      <Tables
        listData={store_list_dummy}
        columns={columns}
        checkbox
        selectedRowKeys={selectedRowKeys}
        detail={false}
        onSelectListItem={selectListItem}
        pagination={paging}
        option={
          <>
            <Buttons
              onClick={() => {
                handlePopup('delete');
              }}
              type={'danger'}
              name="삭제"
              css={marginLeftStyle(5)}
            />
          </>
        }
      />
    </>
  );
};

export default PromotionStoreSection;
const span_style = css`
  display: flex;
  align-items: center;
`;
