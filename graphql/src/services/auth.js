export function getToken() {
  return localStorage.getItem("jwt");
}

export function logout() {
  localStorage.removeItem("jwt");
}
