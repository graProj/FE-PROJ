import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;

function useLectureData() {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const token = localStorage.getItem('token');

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['lectureData', page, size],
        queryFn: async () => {
            const params = {
                page,
                size,
                sort: 'createdTime',
                deleted: false
            };
            const response = await axios.get(`${BACK_SERVER}/api/v1/lecture-member/list/member`, {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.response;
        },
        staleTime: 30000,
    });

    const nextPage = () => setPage((prev) => prev + 1);
    const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

    return { 
        data: data?.lectureMembers, 
        isLoading, 
        error, 
        refetch, 
        nextPage, 
        prevPage, 
        page, 
        totalPages: data?.totalPages 
    };
}

export default useLectureData;