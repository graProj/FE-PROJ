
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function LectureData() {
    const { data, isLoading, error } = useQuery({
      queryKey: ['lectureData'],
      queryFn: async () => {
        const params = {
          page: 1,
          size: 1,
          sort: []
        };
        const response = await axios.get('http://3.39.22.211/api/v1/lecture/page',{ params });
        console.log("계속 get?")
        return response.data;
      },
      staleTime: 60000,
    });
  
    return { data, isLoading, error };
  }

export default LectureData;
