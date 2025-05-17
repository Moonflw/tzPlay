import { useForm } from 'react-hook-form';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    if (data.username === 'admin' && data.password === 'admin') {
      dispatch(login());
      navigate('/');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      <TextField label="Логин" {...register('username')} />
      <TextField label="Пароль" type="password" {...register('password')} />
      <Button variant="contained" type="submit">Войти</Button>
    </Box>
  );
};
