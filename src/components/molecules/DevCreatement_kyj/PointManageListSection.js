import { CardContainer, Tables } from '@/components/atom';

const PointManageListSection = ({ listData, columns, selectedRowKeys, onSelectListItem, ...props }) => {
  return (
    <CardContainer>
      <Tables
        listData={listData} //뿌리려는 리스트 값
        columns={columns} //열 구분 하는 방법 및 사용할 데이터 지정
        selectedRowKeys={selectedRowKeys}
        onSelectListItem={onSelectListItem}
        checkbox
        detail={true}
        {...props}
      />
    </CardContainer>
  );
};

export default PointManageListSection;
