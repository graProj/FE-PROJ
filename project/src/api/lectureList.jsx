
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
        const response = await axios.get('http://3.39.22.211/api/v1/lecture-member/list/member',{
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
