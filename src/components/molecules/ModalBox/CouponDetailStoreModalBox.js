import { useDispatch, useSelector } from 'react-redux';
import Portal from '@/components/atom/Portal';
import { Modal, Tabs } from 'antd';
import { closeStore } from '@/store/reducers/admin/storeSettingReducer';
import { StoreAddExcelFormSection, StoreAddSearchFormSection, StoreDeleteExcelFormSection } from '@/components/molecules';
import NoticeLabel from '@/components/atom/Notice';
import { Buttons, DividingLine, Form } from '@/components/atom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { openPops } from '@/store/reducers/popupsReducer';
import { css } from '@emotion/react';
import useCommonCode from '@/hooks/useCommonCode';
import { transSelectBox } from '@/common/utiles';
import {
  deleteStoreFromExcelAction,
  getDetailCouponStoreListAction,
  insertCampaignDetailStoreGroupListAction,
  postCampaignDetailStoreMergeAction,
  registerStoreFromExcelAction,
} from '@/store/reducers/admin/campaignDetailReducer';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { uploadCampaignDetailStoreExcelApi } from '@/api/admin/campaignDetailApi';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

const CouponDetailStoreModalBox = ({}) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      storeGroupIdsArr: [],
      storeCode: '',
    },
  });

  const onSubmit = data => handleRegister(data);
  const onError = errors => handleError(errors);

  const handleError = err => {
    console.error(err);
  };

  const [result, setResult] = useState([]);
  const [selectedStoreGroupIds, setSelectedStoreGroupIds] = useState([]); //선택된 그룹 스토어 ID들
  const [storeGroupOptions, setStoreGroupOptions] = useState([]);
  const [activeTab, setActiveTab] = useState('A');
  const { isModalOpen } = useSelector(state => state.popups);
  // 공통코드 호출
  const { storeGroup } = useCommonCodeBatch(['storeGroup']);
  const [skuFileList, setSkuFileList] = useState([]); // 초기 상태를 빈 배열로 설정

  // 스토어 옵션 (전체 미포함)
  useEffect(() => {
    if (storeGroup) {
      setStoreGroupOptions(transSelectBox(storeGroup));
    }
  }, [storeGroup]);

  // 탭변경하기
  const handleChangeTabMenu = key => {
    setActiveTab(key);
    handleReset();
  };

  // 취소
  const handleCancel = () => {
    dispatch(openPops({ width: null, isModalOpen: false, content: null, title: 'My Custom Title' }));
  };

  // 모달 닫힐때 초기화하기
  useEffect(() => {
    if (!isModalOpen) {
      handleReset();
      setActiveTab('A');
    }
  }, [isModalOpen]);

  // 초기화함수
  const handleReset = () => {
    reset();
    setResult([]);
    dispatch(
      insertCampaignDetailStoreGroupListAction({
        result: [],
        pageable: {
          pageNumber: 0,
          pageSize: 10,
        },
        totalElements: 0,
      }),
    );
    setSkuFileList([]);
  };

  // 스토어 제외하기 (엑셀)
  const handleDeleteStoreFromExcel = () => {
    const storeIds = result?.map(store => store?.storeId);
    const sendObject = {
      storeIds,
    };
    dispatch(deleteStoreFromExcelAction({ sendObject }));
  };

  // 스토어 추가하기 (엑셀)
  const handleAddStoreFromExcel = () => {
    const storeIds = result?.map(store => store?.storeId);
    const sendObject = {
      storeIds,
    };
    dispatch(registerStoreFromExcelAction({ sendObject }));
  };

  // 엑셀 데이터 가져오기
  const getExcelData = async file => {
    const formData = new FormData();
    formData.append('multipartFile', file.originFileObj);

    try {
      dispatch(startLoading());
      const response = await uploadCampaignDetailStoreExcelApi(formData);
      if (response.status === 200) {
        const result = response?.data?.result;
        setResult(result);
        dispatch(
          successSnackOpen({
            message: '스토어 파일 업로드 성공',
            description: '스토어 파일이 업로드 되었습니다.',
          }),
        );
      } else {
        dispatch(
          errorSnackOpen({
            message: '스토어 파일 업로드 실패',
            description: `${response.message}`,
          }),
        );
      }
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(
        errorSnackOpen({
          message: '스토어 파일 업로드 실패',
          description: '파일 업로드 중 문제가 발생했습니다.',
        }),
      );
    }
  };

  // 등록하기
  const handleRegister = data => {
    // 스토어 추가 (그룹)
    if (activeTab === 'A') {
      const { storeGroupIdsArr } = data;
      const storeGroupIds = storeGroupIdsArr?.flat(); // 한개 배열로 합치기
      const storeIds = result?.map(store => store?.storeId);
      if (storeGroupIdsArr.length === 0 && result.length === 0) {
        alert('스토어 그룹 또는 개별 스토어를 추가해주세요 ');
        return;
      }
      const sendObject = {
        storeIds,
        storeGroupIds,
      };
      dispatch(postCampaignDetailStoreMergeAction(sendObject));
    }
    // 스토어 추가 (excel)
    if (activeTab === 'B') {
      if (skuFileList.length === 0) {
        alert('스토어 파일을 업로드해주세요');
        return;
      }
      handleAddStoreFromExcel();
    }
    // 스토어 제외 (excel)
    if (activeTab === 'C') {
      if (skuFileList.length === 0) {
        alert('스토어 파일을 업로드해주세요');
        return;
      }
      handleDeleteStoreFromExcel();
    }
  };

  const tabMenuList = () => {
    return [
      {
        label: '스토어 추가 (그룹)',
        key: 'A',
        children: <StoreAddSearchFormSection control={control} setResult={setResult} storeGroupOptions={storeGroupOptions} getValues={getValues} />,
      },
      {
        label: '스토어 추가 (excel)',
        key: 'B',
        children: (
          <StoreAddExcelFormSection
            setResult={setResult}
            result={result}
            skuFileList={skuFileList}
            setSkuFileList={setSkuFileList}
            getExcelData={getExcelData}
          />
        ),
      },
      {
        label: '스토어 제외 (excel)',
        key: 'C',
        children: (
          <StoreDeleteExcelFormSection
            setResult={setResult}
            result={result}
            skuFileList={skuFileList}
            setSkuFileList={setSkuFileList}
            getExcelData={getExcelData}
          />
        ),
      },
    ];
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <NoticeLabel title={'👉🏼대상 스토어를 등록해주세요. 파일 업로드 또는 검색을 통해 등록할 수 있습니다.'} />
      <DividingLine border={false} />
      <Tabs onTabClick={handleChangeTabMenu} type="line" centered size={'small'} items={tabMenuList()} activeKey={activeTab} />
      <DividingLine border={false} />
      <div css={buttonRowStyle}>
        <Buttons type={'danger'} name={'취소'} htmlType={'button'} onClick={handleCancel} />
        <Buttons type={'primary'} name={'등록하기'} htmlType={'submit'} />
      </div>
    </Form>
  );
};

export default CouponDetailStoreModalBox;
const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
