import { AppLayout } from '@/components/layouts';
import { AdminLogTemplate } from '@/components/template';
import React from 'react';

const AdminLog = () => {
  return (
    <>
      <AdminLogTemplate />
    </>
  );
};

AdminLog.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default AdminLog;
