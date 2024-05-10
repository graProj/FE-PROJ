export default async function postData(data) {
    return await axios.post('http://3.39.22.211/api/v1/enrollment', {'lectureId':data},{'Authorization':'awef'},);
  }