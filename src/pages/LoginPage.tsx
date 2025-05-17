import { LoginForm } from '../features/auth/LoginForm';
import { Box, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>Вход в систему</Typography>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
