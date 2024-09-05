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
    let message = "An unexpected error occurred.";
    if(response.status===401){
      message = "Didacto의 회원이 아닙니다.";
    }
    if(response.status===422){
      message = "아이디를 입력해주세요.";
    }
    const data = await response.json();
    if (data.response.accessToken) {
      localStorage.setItem('token', data.response.accessToken);
      localStorage.setItem('rtk', data.response.refreshToken);
      return { success: true, data, message: "로그인 성공" };
    }

    return { success: false, message };

  } catch (error) {
    return { success: false, message: "An unexpected error occurred." };
  } finally {
    setLoading(false);
  }
};

const refreshTokenIfNeeded = async () => {
  const rtk = localStorage.getItem('rtk');
  let localStorageToken = localStorage.getItem('token');
  const Info = JSON.parse(atob(localStorageToken.split('.')[1]));
  const milliseconds = Info.exp * 1000;
  const date = new Date(milliseconds);
  const currentTime = new Date();
  if (date - currentTime < 60 * 1000) {
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
        localStorageToken = localStorage.getItem('token');
        return localStorageToken;
      }
      
      else{
        localStorage.removeItem('token');
        localStorage.removeItem('rtk');
        window.location.reload();
      }
    } catch (error) {
      console.log('what')
    }
  }
  else return localStorageToken;
};

export { signIn, refreshTokenIfNeeded };