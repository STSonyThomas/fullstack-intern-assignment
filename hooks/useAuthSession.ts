import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setUser, clearAuth,setToken } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import { toast,Toast } from "react-hot-toast";

const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state:RootState)=>state.auth.token);
  const user = useAppSelector((state: RootState) => state.auth.user);
  //  implement the logic here to check user session
  console.log(user);
  

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUser(response.data));
        } catch (error) {
          console.error('Error fetching user:', error);
          dispatch(clearAuth());
        }
      }
    };

    fetchUser();
  }, [token, dispatch]);


  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      dispatch(setToken(response.data.token));
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed!');
      throw error;
    }
  };
  //end of logic implementation
  return {user,login};
};

export default useAuthSession;
