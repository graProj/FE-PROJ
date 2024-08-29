import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const token = localStorage.getItem('token');
const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;
let message;
const PostData = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (lectureId) => {
            const {data} = await axios.post(`${BACK_SERVER}/api/v1/enrollment`, { lectureId }, { headers: { Authorization: `Bearer ${token}` }});
        
            return { data, message: "강의신청이 완료되었습니다." };
        },
        onSuccess: async (variables) => {
            queryClient.invalidateQueries(['requestLecture', variables]);
        },
    });

    return mutation;
};
const CancelData = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (enrollmentId) => {
            const { data } = await axios.delete(`${BACK_SERVER}/api/v1/enrollment?enrollmentId=${enrollmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { data, message: "취소가 완료되었습니다." };
        },
        onSuccess: async (variables) => {
            queryClient.refetchQueries('requestLecture',variables);
        },
        onError: (error, variables, context) => {
            console.error('취소 중 오류 발생:', error);
        },
    });

    return mutation;
};

const DeleteData = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (lectureId) => {
            return axios.delete(`${BACK_SERVER}/api/v1/lecture-member/member?lectureId=${lectureId.lecid}&memberId=${lectureId.memid}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        },
        onSuccess: async () => {
            queryClient.invalidateQueries('requestLecture');
        },
        onError: (error, variables, context) => {
            console.log(error.response.status)
        },
    });

    return mutation;
};

export { PostData, DeleteData, CancelData };