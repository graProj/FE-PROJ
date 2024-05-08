
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function LectureData() {
    const { data, isLoading, error } = useQuery({
      queryKey: ['lectureData'],
      queryFn: async () => {
        const response = await axios.get('http://3.39.22.211/api/v1/lecture/page');
        return response.data;
      }
    });
  
    return { data, isLoading, error };
  }

export default LectureData;
