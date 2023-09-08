import { Button, ButtonProps, CircularProgress, styled } from '@mui/material'

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  '&.Mui-disabled': {
    pointerEvents: 'none',
    backgroundColor: 'initial'
  }
}))

type MyCustomButtonProps = ButtonProps & {
  isLoading: boolean
}

const LoadingProgressButton: React.FC<MyCustomButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <CustomButton disabled={isLoading} {...props}>
      {isLoading ? <CircularProgress size={24} /> : children}
    </CustomButton>
  )
}

export default LoadingProgressButton
