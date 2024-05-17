import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useSearchData(searchText) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['lectureData', searchText],
    queryFn: async () => {
      const params = {
        page: 1,
        size: 10,
        sort: 'createdTime',
        deleted: false,
        titleKeyword: searchText
      };
      const response = await axios.get('http://3.39.22.211/api/v1/lecture/list', {
        params,
      });

      return response.data.response.lectures;
    
    },
  });

  return { data, isLoading, error };
}

export default useSearchData;
