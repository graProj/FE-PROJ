
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;
function LectureData() {
    
    const token = localStorage.getItem('token');
    const { data, isLoading, error, refetch} = useQuery({
      queryKey: ['lectureData'],
      queryFn: async () => {
        const params = {
          page: 1,
          size:10,
          sort:'createdTime',
          deleted : false
        };
        const response = await axios.get(`${BACK_SERVER}/api/v1/lecture-member/list/member`,{
          params,
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.response.lectureMembers;
        
      },
      staleTime:30000,
    });
  
    return { data, isLoading, error , refetch };
  }

export default LectureData;
