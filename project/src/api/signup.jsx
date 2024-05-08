
const signUp = async (formData) => {
  try {
    const response = await fetch('http://3.39.22.211/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export default signUp;
