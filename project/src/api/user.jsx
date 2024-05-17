
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const token = localStorage.getItem('token');
function UserData() {
    
    const Info = JSON.parse(atob(token.split('.')[1]));
    const id = Info.Id;
    const { data, isLoading, error } = useQuery({
      queryKey: ['userData'],
      queryFn: async () => {
        const params = {
          id : id
        };
        const response = await axios.get(`http://3.39.22.211/api/v1/members/${id}`,{
          params,
        });
        return response.data.response;
        
      },
      staleTime:2000000,
    });
  
    return { data, isLoading, error};
  }
async function Modify(formData,setLoading) {
    setLoading(true);
    try {
        const response = await axios.put('http://3.39.22.211/api/v1/members', formData , { headers: { Authorization: `Bearer ${token}` }});
        alert("정보 수정이 완료되었습니다.")
        return response.data;
    } 
    catch (err) {
      if (err.response.status ===500){
          alert("올바른 형태의 생년월일을 입력해주세요.");
      }
      else if(console.log(err.response.status===422)){
        alert("몰루")
      }
    }
    finally {
      setLoading(false);
    }
}

export {UserData,Modify};
