import React from 'react';
import Skeleton from '@/components/skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="p-4">
      <Skeleton className="h-8 w-1/3 mb-4" />
      <Skeleton className="h-6 w-2/3 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
    </div>
  );
};

export default DashboardSkeleton;