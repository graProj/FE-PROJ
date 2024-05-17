const signIn = async (formData, setLoading) => {
  try {
    setLoading(true);

    const response = await fetch('http://3.39.22.211/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(response)

    const data = await response.json();
    if (data.response.accessToken) {
      localStorage.setItem('token', data.response.accessToken);
      localStorage.setItem('rtk', data.response.refreshToken);
    }

    return data;

  } catch (error) {
    console.log(error)
    if(error.response.errorcode==='ERR_05'){
      alert("비밀번호가 일치하지 않습니다");
    }
    else if(error.response.errorcode==='ERR_04'){
      alert("해당 이메일을 찾을 수 없습니다.");
    }
  } finally {
    setLoading(false);
  }
};

const refreshTokenIfNeeded = async () => {
  const rtk = localStorage.getItem('rtk');

  try {
    const response = await fetch('http://3.39.22.211/api/v1/auth/refresh', {
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
    

  } catch (error) {
    if (error.response.status===403) {
      alert("세션이 만료되었습니다.");
      localStorage.removeItem('token');
    }
    throw error;
  }
};

export { signIn, refreshTokenIfNeeded };