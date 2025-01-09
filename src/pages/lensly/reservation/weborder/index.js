import { AppLayout } from '@/components/layouts';
import { ReservationListTemplate } from '@/components/template';

const Reservation = () => {
  return (
    <>
      <ReservationListTemplate />
    </>
  );
};

Reservation.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Reservation;
