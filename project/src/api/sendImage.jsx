import axios from 'axios';

const token = localStorage.getItem('token');
const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;
async function sendImage(lectureId,encodedImageBase64) {
    try {
        const response = await axios.post(`${BACK_SERVER}/api/v1/monitoring/image/upload`, { lectureId, encodedImageBase64 }, { headers: { Authorization: `Bearer ${token}` }});
        console.log("전송 성공")
        return response.data;
    } catch (err) {
        alert("전송 실패")
    }
}
export {sendImage};
  