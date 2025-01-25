const checkPassword = async (password) => {
  const response = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });
  const body = await response.json();

  return {
    success: response.ok,
    error: response.status === 400 ? body.error : null,
  };
};


export default checkPassword;