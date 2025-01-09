import { css } from '@emotion/react';
import { Buttons, CardContainer, ColGrid, DividingLine, RowGrid, SelectInputSearchAtom } from '@/components/atom';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from '@/store/reducers/userReducer';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { useRouter } from 'next/router';

const UserSearchBox = ({ options, onGetUserListData }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(state => state.user.paging);
  const search = useSelector(state => state.user.search);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    if (data.searchText && data.searchType) {
      const params = {
        pageSize: pagination.pageSize,
        offset: pagination.current,
      };
      const search = {
        searchType: data.searchType,
        searchText: data.searchText,
      };

      onGetUserListData({ ...params, ...search });

      // router.push(`/users?searchType=${data.searchType}&searchText=${data.searchText}`);
    } else {
      dispatch(
        errorSnackOpen({
          message: '검색 실패',
          description: '검색 유형 및 검색어를 입력하세요.',
        }),
      );
    }
  };

  const searchReset = () => {
    dispatch(
      changeSearch({
        search: {
          searchType: '',
          searchText: '',
        },
      }),
    );
    const params = {
      pageSize: pagination.pageSize,
      offset: pagination.current,
    };
    onGetUserListData({
      ...params,
      search: {
        searchType: '',
        searchText: '',
      },
    });
  };

  useEffect(() => {
    if (search) {
      setValue('searchType', search.searchType);
      setValue('searchText', search.searchText);
    }
  }, [search, setValue]);

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RowGrid>
          <ColGrid span={7}>
            <SelectInputSearchAtom options={options} title={'검색어'} control={control} />
          </ColGrid>
        </RowGrid>
        <DividingLine border={false} />

        <RowGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            <Buttons type={'primary'} name={'검색'} htmlType={'submit'} css={marginRightStyle(5)} />
            <Buttons onClick={searchReset} type={'default'} name={'초기화'} htmlType={'button'} css={marginLeftStyle(5)} />
          </ColGrid>
          <ColGrid span={8} />
        </RowGrid>
      </Form>
    </CardContainer>
  );
};

export default UserSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
