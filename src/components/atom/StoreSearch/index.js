import { Buttons, ColGrid, Form, Inputs, RowGrid, SelectBox } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { marginBottomStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { Input } from 'antd';

const StoreSearch = ({ type, handleSearch, searchStore, setSearchStore, length, selectedLength, options }) => {
  const handleSelect = value => {
    setSearchStore(value);
  };
  return (
    <RowGrid css={marginBottomStyle(12)} gutter={12}>
      <ColGrid span={16} css={span_style}>
        {type === 'search' ? (
          <span>
            전체 : <strong>{length}</strong>개 / 선택 : <strong>{selectedLength}</strong>개
          </span>
        ) : (
          <span>
            등록된 스토어 : 총 <strong>{length}</strong>개
          </span>
        )}
      </ColGrid>
      {type === 'search' && (
        <>
          <ColGrid span={3} css={tableSearch}>
            <SelectBox onChange={handleSelect} defaultValue={searchStore} options={options} placeholder={'스토어명'} />
          </ColGrid>
          <ColGrid span={5}>
            <Input.Search type="text" placeholder="검색어 입력" onSearch={handleSearch} enterButton />
          </ColGrid>
        </>
      )}
    </RowGrid>
  );
};

export default StoreSearch;
const span_style = css`
  display: flex;
  align-items: center;
`;
