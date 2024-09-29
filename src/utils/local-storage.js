export const initAuthStateToStorage = (
  token,
  expiresIn,
  refreshToken,
  email
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expiresIn", expiresIn);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("email", email);
};

export const updateAuthStateFromStorage = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getRefreshTokenPayload = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const expiredToken = localStorage.getItem("token");

  return { refreshToken, expiredToken };
};
