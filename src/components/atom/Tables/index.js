import { Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Buttons, ColGrid, RowGrid } from '@/components/atom';
import { highlightRow, marginLeftStyle, marginRightStyle, marginTopStyle } from '@/styles/components/atomCommonStyle';

const Tables = ({
  tabStatus = '',
  checkbox,
  listData,
  columns,
  detail = true,
  pagination,
  optionBtn,
  optionClick,
  handleChangePageOption,
  selectedRowKeys,
  onSelectListItem,
  emptyText = '검색 결과가 없습니다. 다른 키워드를 입력해 보세요.',
  ...props
}) => {
  const { pathname, push } = useRouter();
  const [selectionType, setSelectionType] = useState('checkbox');

  //page Change
  const onChangeCurrentPage = (offset, pageSize) => {
    if (handleChangePageOption) {
      const params = {
        offset,
        pageSize,
      };

      handleChangePageOption(params);
    }
  };

  // 체크박스 함수
  const onSelectChange = newSelectedRowKeys => {
    onSelectListItem(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleMoveDetail = (record, rowIndex) => {
    return {
      onClick: event => {
        // Ant Design의 Select 컴포넌트를 클릭한 경우 라우팅 방지
        if (
          event.target.closest('.ant-select') ||
          event.target.closest('.css-fchcu1-selectStyle') ||
          event.target.closest('.ant-select-item') ||
          event.target.closest('.ant-btn')
        ) {
          return;
        }

        if (tabStatus) {
          const url = tabStatus === 'B' ? `${pathname}/bausch/${record.key}` : `${pathname}/lensly/${record.key}`;

          push(url);
        } else {
          push(`${pathname}/${record.key}`);
        }
      },
    };
  };

  // TODO 주문이력 셀렉트로 변경
  const getRowClassName = (record, index) => {
    // 이전 레코드를 확인하여 이름이 같은지 비교
    if (index > 0 && listData[index - 1].webOrderCode === record.webOrderCode) {
      return highlightRow;
    }
    return '';
  };

  return (
    <>
      <Table
        css={tableStyle}
        bordered
        rowSelection={
          checkbox && {
            type: selectionType,
            ...rowSelection,
          }
        }
        size={'middle' || 'large'}
        columns={columns}
        dataSource={listData}
        pagination={false}
        scroll={listData?.length <= 20 ? 'none' : { y: 700 }}
        onRow={detail ? (record, rowIndex) => handleMoveDetail(record, rowIndex) : () => {}}
        rowClassName={getRowClassName}
        {...props}
        showSorterTooltip={false}
        locale={{ emptyText }}
      />

      {pagination && (
        <RowGrid css={marginTopStyle(16)}>
          {props.option && selectedRowKeys?.length > 0 && <ColGrid span={12}>{props.option}</ColGrid>}

          <ColGrid span={props.option && selectedRowKeys?.length > 0 ? 12 : 24} css={paginationBtnStyle}>
            {/* TODO: 등록 버튼의 위치를 변경할 필요가 있음 */}
            {optionBtn && (
              <Buttons
                type={'default'}
                name={optionBtn}
                htmlType={'button'}
                onClick={optionClick !== null ? optionClick : null}
                css={marginRightStyle(20)}
              />
            )}
            <Pagination
              css={paginationStyle}
              total={pagination?.total || 0}
              defaultPageSize={pagination?.pageSize}
              defaultCurrent={pagination?.current || 1}
              pageSize={pagination?.pageSize || 10}
              current={pagination?.current || 1}
              showSizeChanger={true}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              onChange={onChangeCurrentPage}
            />
          </ColGrid>
        </RowGrid>
      )}
    </>
  );
};
export default Tables;

const tableStyle = css`
  cursor: pointer;

  .ant-table-body::-webkit-scrollbar-track {
    background-color: 'red';
  }
`;
const paginationStyle = css`
  .ant-pagination-item-ellipsis {
    white-space: nowrap;
  }
`;
const paginationBtnStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
