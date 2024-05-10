// signIn.js


const signIn = async (formData, setLoading) => { // 로딩 상태를 매개변수로 전달받음
  try {
    setLoading(true); // 로딩 시작

    const response = await fetch('http://3.39.22.211/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert("로그인 실패")
    } 
    const data = await response.json();
    console.log(data)
    if(data.response.accessToken){
      localStorage.setItem('token', data
      .response.accessToken);
    }
    return data;
    
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);// 로딩 종료
  }
};

export default signIn;
