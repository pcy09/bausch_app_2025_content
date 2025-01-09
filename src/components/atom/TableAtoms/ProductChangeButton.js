import { useDispatch } from 'react-redux';
import Buttons from '../Buttons';
import { getPointDropDataAction, openPointProductChangeModalAction } from '@/store/reducers/admin/pointProductChangeReducer';

const ProductChangeButton = ({ name, record, disabled, pointProductGroupId }) => {
  //PointProductChangeModal 과 연결
  const dispatch = useDispatch();
  const data = { ...record, pointProductGroupId };
  const openModal = () => {
    dispatch(openPointProductChangeModalAction({ data }));
    // 제품 드롭 가져오기
    const params = {
      pointProductGroupId,
    };
    dispatch(getPointDropDataAction({ params }));
  };
  return <Buttons name={name} onClick={openModal} disabled={disabled} />;
};

export default ProductChangeButton;
