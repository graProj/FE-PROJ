
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { refreshTokenIfNeeded } from './login';
const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;
function UserData() {
  const token = localStorage.getItem('token');
  let Info, id;

  if (token) {
      Info = JSON.parse(atob(token.split('.')[1]));
      id = Info.Id;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      if (!id) return null; // Return null if id is not defined
      const params = {
        id: id
      };
      const response = await axios.get(`${BACK_SERVER}/api/v1/members/${id}`, {
        params,
      });
      return response.data.response;
    },
    staleTime: 2000000,
  });

  return { data, isLoading, error };
}
async function Modify(formData) {
  const token = await refreshTokenIfNeeded();
  try {
    const response = await axios.put(`${BACK_SERVER}/api/v1/members`, formData, { headers: { Authorization: `Bearer ${token}` } });
    return { success: true, message: "정보 수정이 완료되었습니다.", data: response.data };
  } catch (err) {
    let message = "An unexpected error occurred.";
    if (err.response.status === 500) {
      message = "올바른 형태의 생년월일을 입력해주세요.";
    } else if (err.response.status === 422) {
      message = "몰루";
    }
    return { success: false, message };
  }
}

export {UserData,Modify};
