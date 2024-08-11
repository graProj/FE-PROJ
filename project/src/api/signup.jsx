const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;
const signUp = async (formData) => {
  try {
    const response = await fetch(`${BACK_SERVER}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export default signUp;
