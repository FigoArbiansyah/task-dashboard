export const theme = {
  color: {
    low: "rgba(59, 130, 246, 0.35)",
    medium: "rgba(250, 204, 21, 0.35)",
    high: "rgba(239, 68, 68, 0.35)",
  },
};

export const ApiHeaders = (token: string | undefined) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return headers;
};
