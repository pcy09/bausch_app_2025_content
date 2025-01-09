import { Buttons, CardContainer, DividingLine, RowGrid } from '@/components/atom';
import NoticeLabel from '@/components/atom/Notice';
import { useEffect, useState } from 'react';
import PointManageListSection from '@/components/molecules/DevCreatement_kyj/PointManageListSection';
import { marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSavingPointAction, getSavingPointAction, resetSavingPointAction } from '@/store/reducers/admin/savingPointReducer';
import useAddKeyList from '@/hooks/useAddKeyList';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const PointManageTemplate = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 적립금 리스트 데이터

  const savingPointList = useSelector(state => state?.savingPoint.pointProductGroup);

  // key 속성이 추가된 리스트
  const keyedSavingPointList = useAddKeyList(savingPointList, 'pointId', 'pointProductCount');

  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 리스트 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    dispatch(getSavingPointAction());
    return () => {
      dispatch(resetSavingPointAction());
    };
  }, [dispatch]);

  const columns = [
    {
      title: '적립금 이름',
      dataIndex: 'pointName',
      align: 'center',
    },
    {
      title: '구매가능 제품',
      dataIndex: 'pointProductCount',
      align: 'center',
      width: 130,
    },
  ];

  const deleteConfirmHandler = () => {
    Modal.confirm({
      title: '적립금 삭제',
      icon: <ExclamationCircleOutlined />,
      content: '적립금 목록을 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      onOk: handleDelete,
    });
  };

  const handleDelete = () => {
    const sendObject = {
      savingPointId: selectedRowKeys,
    };

    dispatch(deleteSavingPointAction({ sendObject }));
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 적립금 리스트이며, 새로운 유형의 적립금을 등록할 수 있습니다.'} />
      <DividingLine border={false} />
      <PointManageListSection listData={keyedSavingPointList} columns={columns} selectedRowKeys={selectedRowKeys} onSelectListItem={selectListItem} />

      <DividingLine border={false} />
      <CardContainer>
        <RowGrid justify="space-between">
          <Buttons name={'삭제'} type={'danger'} htmlType={'button'} css={marginRightStyle(5)} onClick={deleteConfirmHandler} />
          <Buttons type={'primary'} name={'적립금 등록'} htmlType={'submit'} css={marginLeftStyle(5)} onClick={() => router.push('manage/sub')} />
        </RowGrid>
      </CardContainer>
    </>
  );
};

export default PointManageTemplate;
