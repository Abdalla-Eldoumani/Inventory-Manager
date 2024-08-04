import React from 'react';
import classNames from 'classnames';

const Skeleton = ({ className }: { className?: string }) => {
  return <div className={classNames('bg-gray-200 animate-pulse', className)} />;
};

export default Skeleton;