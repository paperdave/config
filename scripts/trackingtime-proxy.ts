const ac = {
  username: "me@paperdave.net",
  password: Bun.env.TT_PSWD,
};
const token = "Basic " + btoa(ac.username + ":" + ac.password);
console.log(token);
const AccountID = "486843";
const UserID = "582329";

const response = await fetch(
  `https://app.trackingtime.co/api/v4/${AccountID}/users/${UserID}/tasks/tracking`,
  {
    method: "GET",
    headers: {
      Authorization: token,
      "User-Agent": "paperdave.net/0.1.0",
    },
  }
).then((response) => {
  console.log(response);
  return response.json();
});

console.log(response);
