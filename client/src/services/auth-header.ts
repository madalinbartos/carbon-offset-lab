export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return undefined;
  }
}
