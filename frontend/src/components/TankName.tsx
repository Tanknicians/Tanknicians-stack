import { useGetTankDataQuery } from '../redux/slices/tanks/tankDataSlice';

export default function TankName({ tankId }: { tankId: number }) {
  const { data, error } = useGetTankDataQuery(tankId);
  if (error) {
    return <>N/A</>;
  }
  return <>{data?.description}</>;
}
