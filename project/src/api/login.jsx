const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;
const signIn = async (formData, setLoading) => {
  try {
    setLoading(true);
    
    const response = await fetch(`${BACK_SERVER}/api/v1/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(response)
    if(response.status===401){
      alert("Didacto의 회원이 아닙니다.");
    }
    if(response.status===422){
      alert("아이디를 입력해주세요.");
    }
    const data = await response.json();
    if (data.response.accessToken) {
      localStorage.setItem('token', data.response.accessToken);
      localStorage.setItem('rtk', data.response.refreshToken);
    }

    return data;

  } catch (error) {
    alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
  } finally {
    setLoading(false);
  }
};

const refreshTokenIfNeeded = async () => {
  const rtk = localStorage.getItem('rtk');

  try {
    const response = await fetch(`${BACK_SERVER}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${rtk}`
      },
    });

    const data = await response.json();
    if (response.status===200) {
      localStorage.setItem('token', data.response.accessToken);
    }
    if (response.status===403) {
      localStorage.removeItem('token');
      localStorage.removeItem('rtk');
      window.location.href('/auth');
    }
  } catch (error) {
    console.log('what')
  }
  
};

export { signIn, refreshTokenIfNeeded };