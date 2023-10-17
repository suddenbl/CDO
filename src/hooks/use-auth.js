import { useSelector } from 'react-redux';

export function useAuth() {
  const { userName, password, id } = useSelector((state) => state.user);

  return {
    isAuth: !!userName,
    userName,
    password,
    id,
  };
}
