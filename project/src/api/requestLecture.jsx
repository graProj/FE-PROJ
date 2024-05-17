import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function RequestLecture() {
    const token = localStorage.getItem('token');
    const { data, isLoading, error,refetch } = useQuery({
      queryKey: ['requestLecture'],
      queryFn: async () => {
        try {
          const params = {
            statuses: 'WAITING',
            page: 1,
            size: 10,
            sort: 'createdTime'
          };
          const response = await axios.get('http://3.39.22.211/api/v1/enrollment/list/member', {
            params,
            headers: { Authorization: `Bearer ${token}` }
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching request lecture data:', error);
          throw error;
        }
        
      },
      staleTime:30000,
    });
  
    return { data, isLoading, error,refetch };
}

export default RequestLecture;