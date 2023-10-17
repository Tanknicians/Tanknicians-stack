import { useGetTankDataQuery } from '../redux/slices/tanks/tankDataSlice';

export default function TankName({ tankId }: { tankId: number }) {
  const { data } = useGetTankDataQuery(tankId);
  return <>{data?.description}</>;
}
