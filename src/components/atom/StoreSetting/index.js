import { useDispatch, useSelector } from 'react-redux';
import Portal from '@/components/atom/Portal';
import { Modal, Tabs } from 'antd';
import { closeStore } from '@/store/reducers/admin/storeSettingReducer';
import NoticeLabel from '../Notice';
import DividingLine from '../DividingLine';
import { StoreAddExcelFormSection, StoreAddSearchFormSection, StoreDeleteExcelFormSection } from '@/components/molecules';

// 스토어 리스트 더미
const store_list_dummy = [];
for (let i = 0; i < 100; i++) {
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

// 칼럼
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
    width: 150,
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
    width: 70,
  },
  {
    title: '지역(시/도)',
    dataIndex: 'store_location',
    align: 'center',
    width: 100,
  },
  {
    title: '주소(구/군/동)',
    dataIndex: 'store_address',
    align: 'center',
    width: 100,
  },
  {
    title: '등록일',
    dataIndex: 'store_date',
    align: 'center',
  },
];

const StoreSetting = () => {
  // **********************공통
  const show = useSelector(state => state?.storeSetting?.show);
  const dispatch = useDispatch();

  // 에러
  const handleError = errors => {
    console.log(errors);
  };

  // 취소
  const handleModalCancel = () => {
    dispatch(closeStore());
  };

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e) => {
    console.log(key);
  };

  // 탭 메뉴 배열 만들기
  const tabMenuList = () => {
    return [
      {
        label: '스토어 추가 (excel)',
        key: 'A',
        children: (
          <StoreAddExcelFormSection handleError={handleError} handleCancel={handleModalCancel} listData={store_list_dummy} columns={columns} />
        ),
      },
      {
        label: '스토어 추가 (검색)',
        key: 'B',
        children: (
          <StoreAddSearchFormSection handleError={handleError} handleCancel={handleModalCancel} listData={store_list_dummy} columns={columns} />
        ),
      },
      {
        label: '스토어 제외 (excel)',
        key: 'C',
        children: (
          <StoreDeleteExcelFormSection handleError={handleError} handleCancel={handleModalCancel} listData={store_list_dummy} columns={columns} />
        ),
      },
    ];
  };
  return (
    <>
      {show && (
        <Portal selector={'modal-root'}>
          <Modal footer={false} title="대상 스토어 설정" centered open={show} onCancel={handleModalCancel} width={1000}>
            <NoticeLabel title={'👉🏼대상 스토어를 등록해주세요. 파일 업로드 또는 검색을 통해 등록할 수 있습니다. '} />
            <DividingLine border={false} />
            <Tabs
              onTabClick={(key, e) => handleChangeTabMenu(key, e)}
              defaultActiveKey={'A'}
              type="line"
              centered
              size={'small'}
              items={tabMenuList()}
            />
          </Modal>
        </Portal>
      )}
    </>
  );
};
export default StoreSetting;
