const btn = document.getElementById("loadBtn");
const result = document.getElementById("result");

function renderUser(u) {
  const picture = u.picture?.large ?? "";
  const name = `${u.name?.title ?? ""} ${u.name?.first ?? ""} ${u.name?.last ?? ""}`.trim();
  const city = u.location?.city ?? "";
  const country = u.location?.country ?? "";
  const postcode = u.location?.postcode ?? "";

  result.innerHTML = `
    <div class="user">
      <img src="${picture}" alt="User photo" />
      <div>
        <h2>${name || "—"}</h2>
        <p><b>Місто:</b> ${city || "—"}</p>
        <p><b>Країна:</b> ${country || "—"}</p>
        <p><b>Поштовий індекс:</b> ${postcode || "—"}</p>
      </div>
    </div>
  `;
}

function renderError(message) {
  result.innerHTML = `<p class="err">Помилка: ${message}</p>`;
}

btn.addEventListener("click", () => {
  result.innerHTML = `<p class="hint">Завантаження...</p>`;

  fetch("https://randomuser.me/api")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const user = data?.results?.[0];
      if (!user) throw new Error("У відповіді немає results[0]");
      renderUser(user);
    })
    .catch((err) => renderError(err.message));
});
