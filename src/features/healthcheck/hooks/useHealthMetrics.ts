import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/shared/services/redux/store';
import { RootState } from '@/shared/services/redux/rootReducer';
import { fetchHealthMetrics } from '@/features/healthcheck/store/healthMetricsSlice';

export const useHealthMetrics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const metrics = useSelector((state: RootState) => state.healthMetrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        await dispatch(fetchHealthMetrics()).unwrap();
        setLoading(false);
      } catch (error) {
        console.error('Developer Error: Failed to load health metrics:', error);
        setLoading(false);
      }
    };

    loadMetrics();
  }, [dispatch]);

  return { metrics, loading };
};
