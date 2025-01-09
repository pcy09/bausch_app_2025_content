import { Buttons, CardContainer, Tables } from '@/components/atom';
import { openPopupAction } from '@/store/reducers/popupReducer';
import { marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import ListHeaderSection from '../ListHeaderSection';

const AdminManageListSection = ({ data, columns, selectedRowKeys, selectListItem, paging }) => {
  const dispatch = useDispatch();
  const handlePopup = type => {
    const updateData = {
      show: true,
      type,
    };
    dispatch(openPopupAction(updateData));
  };
  // 리스트 셀렉트 박스 라벨
  const list = ['이름', '어드민 ID'];
  const handleSearch = data => {
    console.log(data);
  };
  return (
    <CardContainer>
      {paging ? (
        <Tables
          listData={data}
          columns={columns}
          checkbox
          selectedRowKeys={selectedRowKeys}
          detail={false}
          onSelectListItem={selectListItem}
          pagination={paging}
          option={
            <Buttons
              onClick={() => {
                handlePopup('delete');
              }}
              type={'danger'}
              name="삭제"
              htmlType={'danger'}
              css={marginLeftStyle(5)}></Buttons>
          }
        />
      ) : (
        <>
          <Descriptions title={'관리자 리스트'} />
          <ListHeaderSection handleSearch={handleSearch} list={list} total={123} select={selectedRowKeys?.length} />

          <Tables
            listData={data}
            columns={columns}
            checkbox
            selectedRowKeys={selectedRowKeys}
            onSelectListItem={selectListItem}
            footer={() => (
              <Buttons
                disabled={!selectedRowKeys?.length > 0}
                onClick={() => {
                  handlePopup('delete');
                }}
                type={'danger'}
                name="삭제"
                htmlType={'danger'}
                css={marginLeftStyle(5)}></Buttons>
            )}
          />
        </>
      )}
    </CardContainer>
  );
};

export default AdminManageListSection;
