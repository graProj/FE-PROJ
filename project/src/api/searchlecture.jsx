import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;

async function fetchAllPages(searchText) {
  let page = 1;
  let allResults = [];
  let hasMore = true;
  while (hasMore) {
    const params = {
      page,
      size: 10,
      sort: 'createdTime',
      deleted: false,
      titleKeyword: searchText
    };
    const response = await axios.get(`${BACK_SERVER}/api/v1/lecture/list`, { params });
    const data = response.data.response.lectures;

    if (data && data.length > 0) {
      allResults = [...allResults, ...data];
      page += 1;
    } else {
      hasMore = false;
    }
  }

  return allResults;
}

function useSearchData(searchText) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['lectureData', searchText],
    queryFn: () => fetchAllPages(searchText),
    staleTime:3600*1000,
  });

  return { data, isLoading, error };
}

export default useSearchData;