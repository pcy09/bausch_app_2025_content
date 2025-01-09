import { Buttons, Form, RowGrid, StoreSearch, Tables } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { buttonFlexBetweenRowStyle, marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { useState } from 'react';

const StoreListBox = ({ type, handleDelete, options, handleAdd, handleError, listData, columns }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchStore, setSearchStore] = useState();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => {
    handleAdd(data);
  };
  const onError = errors => handleError(errors);

  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
    setValue('listData', newSelectedRowKeys);
  };

  // 리스트 검색
  const handleSearch = searchText => {
    console.log('스토어명 : ' + searchStore, '검색어 : ' + searchText);
  };
  return (
    <>
      <StoreSearch
        handleSearch={handleSearch}
        searchStore={searchStore}
        setSearchStore={setSearchStore}
        options={options}
        length={listData?.length}
        selectedLength={selectedRowKeys?.length}
        type={type}
      />

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Controller
          name="listData"
          control={control}
          defaultValue=""
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <>
              {handleAdd ? (
                <Tables
                  listData={listData}
                  columns={columns}
                  checkbox
                  selectedRowKeys={selectedRowKeys}
                  detail={false}
                  onSelectListItem={selectListItem}
                  scroll={{
                    y: 240,
                  }}
                  footer={() => (
                    <RowGrid css={buttonFlexBetweenRowStyle}>
                      <Buttons disabled={!selectedRowKeys?.length > 0} name={'추가'} htmlType={'submit'} />
                    </RowGrid>
                  )}
                />
              ) : (
                <Tables
                  listData={listData}
                  columns={columns}
                  checkbox
                  selectedRowKeys={selectedRowKeys}
                  detail={false}
                  onSelectListItem={selectListItem}
                  scroll={{
                    y: 240,
                  }}
                  footer={() => (
                    <RowGrid css={buttonFlexBetweenRowStyle}>
                      <Buttons
                        disabled={!selectedRowKeys?.length > 0}
                        onClick={() => {
                          handleDelete(selectedRowKeys);
                        }}
                        type={'danger'}
                        name="제외"
                        css={marginLeftStyle(5)}
                      />
                    </RowGrid>
                  )}
                />
              )}
            </>
          )}
        />
      </Form>
    </>
  );
};

export default StoreListBox;
