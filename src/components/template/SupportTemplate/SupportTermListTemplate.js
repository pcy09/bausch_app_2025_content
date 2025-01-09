import { contentsContainerStyle, marginBottomStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { Buttons, CardContainer, ColGrid, RowGrid } from '@/components/atom';
import { DownloadOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Tables from '../../atom/Tables';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTabMenu, getTermsAction, termsReset } from '@/store/reducers/termsReducer';
import useCommonCode from '@/hooks/useCommonCode';

const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    width: 40,
    align: 'center',
  },
  {
    title: '제목',
    dataIndex: 'terms_title',
  },
  {
    title: '작성일',
    dataIndex: 'terms_register_date',
    width: 150,
    align: 'center',
  },
  {
    title: '노출 여부',
    dataIndex: 'terms_show_status',
    width: 100,
    align: 'center',
  },
];

const SupportTermListTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pagination = useSelector(state => state.terms.paging);
  const termsList = useSelector(state => state.terms.list);
  const tabMenu = useSelector(state => state.terms.tab);

  const { push } = useRouter();

  // 약관 타입코드
  const [termsTypeCode, findTermsTypeCode] = useCommonCode('termsTypeCode');
  const termsTab = {
    U: '이용약관',
    P: '개인정보처리방침',
    L: '위치정보 이용약관',
    M: '마케팅 수신 동의',
  };
  const [termsShowStatusCode, findTermsShowStatusCode] = useCommonCode('termsShowStatusCode');

  // active Tab Menu
  const tabMenuList = () => {
    return termsTypeCode?.map(item => {
      return {
        ...item,
        label: item.label,
        key: item.code,
        children: renderTermsList(),
      };
    });
  };
  const renderTermsList = () => {
    return <Tables handleChangePageOption={getInitData} pagination={pagination} listData={termsList} columns={columns} />;
  };

  const handleChangeTabMenu = (key, e) => {
    dispatch(changeTabMenu({ tab: key }));
    const params = {
      pageSize: pagination.pageSize,
      offset: 1,
      termsType: key,
    };
    getInitData(params);
  };

  // 리스트 호출
  const getInitData = useCallback(
    params => {
      dispatch(
        getTermsAction({
          params: {
            ...params,
            termsType: params?.termsType ?? tabMenu,
          },
          findTermsShowStatusCode,
        }),
      );
    },

    [tabMenu, findTermsShowStatusCode, dispatch],
  );

  const handleChangeTabValue = () => {
    push(`/support/terms/create?termsType=${tabMenu}`);
  };

  useEffect(() => {
    if (findTermsTypeCode) {
      const params = {
        pageSize: pagination.pageSize,
        offset: 1,
        status: tabMenu,
      };

      getInitData(params);
    }
  }, [findTermsTypeCode, getInitData, pagination, tabMenu]);

  return (
    <>
      <CardContainer>
        <RowGrid css={marginBottomStyle(12)}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{termsList?.length}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} css={marginRightStyle(10)} />
            <Buttons
              type={'primary'}
              ghost
              name={
                tabMenu === 'U'
                  ? '서비스 약관 등록'
                  : tabMenu === 'P'
                  ? '개인정보처리방침 등록'
                  : tabMenu === 'L'
                  ? '위치정보 이용약관 등록'
                  : '마케팅 정책 등록'
              }
              htmlType={'button'}
              onClick={handleChangeTabValue}
            />
          </ColGrid>
        </RowGrid>

        <Tabs onTabClick={(key, e) => handleChangeTabMenu(key, e)} activeKey={tabMenu} type="card" centered size={'smail'} items={tabMenuList()} />

        {/*<Tables listData={termData} columns={columns} rowSelection={checkboxOption} />*/}
      </CardContainer>
    </>
  );
};

export default SupportTermListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
