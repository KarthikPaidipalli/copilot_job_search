// -----------------------------
export const setAccessToken = (token: string): void => {
	localStorage.setItem("accessToken", token);
};

export const getAccessToken = (): string | null => {
	return localStorage.getItem("accessToken");
};

export const getAccessTokenExpireTime = (): string | null => {
  const userDetails = localStorage.getItem("userDetails");
  if (!userDetails) return null;
  try {
    const parsed = JSON.parse(userDetails);
    return parsed?.accessTokenExpiresAt ?? null;
  } catch (error) {
    console.error("Invalid userDetails JSON", error);
    return null;
  }
};


// -----------------------------
// REFRESH TOKEN — LOCAL STORAGE
// -----------------------------

export const setRefreshToken = (token: string): void => {
	localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = (): string | null => {
	return localStorage.getItem("refreshToken");
};

export const clearTokens = (): void => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
};