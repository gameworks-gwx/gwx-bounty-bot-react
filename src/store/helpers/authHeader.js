export const authHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return {
      'Authorization': token
    }
  } else {
    return {}
  }
}
