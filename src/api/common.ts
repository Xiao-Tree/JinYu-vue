import { useMyFetch } from ".";

export function fetchLogin(username: string, password: string) {
  let urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);
  return useMyFetch(
    "/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded,
    },
    { immediate: true }
  ).json<Result<data.LoginUser>>();
}
