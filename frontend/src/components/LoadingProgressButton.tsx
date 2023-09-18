import { Button, ButtonProps, CircularProgress } from '@mui/material';

type MyCustomButtonProps = ButtonProps & {
  isLoading: boolean;
};

const LoadingProgressButton: React.FC<MyCustomButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <CircularProgress size={24} /> : children}
    </Button>
  );
};

export default LoadingProgressButton;
