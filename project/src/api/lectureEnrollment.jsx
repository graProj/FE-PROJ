import { useMutation } from '@tanstack/react-query';
import {  useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const token = localStorage.getItem('token');
async function postData(lectureId) {
    
    try {
        const response = await axios.post('http://3.39.22.211/api/v1/enrollment', { lectureId, }, { headers: { Authorization: `Bearer ${token}` }});
        alert("강의 신청이 완료되었습니다.")
        return response.data;
    } catch (err) {
        if (err.response.status ===404){
            alert("해당 강의를 찾을 수 없습니다.");
        }
        else if(err.response.status ===409){
            alert("이미 교수자에게 강의 등록 요청을 보냈습니다");
        }
    }
}

const CancelData = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (enrollmentId) => {
            console.log(enrollmentId)
            return axios.delete(`http://3.39.22.211/api/v1/enrollment?enrollmentId=${enrollmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
        },
        onSuccess: async () => {
            console.log("삭제가 완료되었습니다.")
            queryClient.invalidateQueries('requestLecture');
        },
        onError: (error, variables, context) => {
            console.log("what?")
        },
    });
  
    return mutation;
  };

  const DeleteData = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: ( lectureId) => {
            console.log("first",lectureId)
            return axios.delete(`http://3.39.22.211/api/v1/lecture-member/member?lectureId=${lectureId.lecid}&memberId=${lectureId.memid}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
        },
        onSuccess: async () => {
            alert("삭제가 완료되었습니다.");
            queryClient.invalidateQueries('requestLecture');
        },
        onError: (error, variables, context) => {
            console.log("what?")
        },
    });
  
    return mutation;
  };

export {postData,DeleteData,CancelData};