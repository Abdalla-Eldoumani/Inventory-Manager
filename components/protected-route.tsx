"use client";

import Loader from '@/components/loader';
import DashboardSkeleton from '@/components/dashboard-skeleton';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [router, user, loading]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;