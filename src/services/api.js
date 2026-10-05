const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://script.google.com/macros/s/AKfycbzGd3teoYUS4ibN71cHJ7YGgXmjYYsueht9hrGGKm0TsxruMVTr9pXXVmfweyvoH9dE/exec";

export async function apiGet(action, params = {}) {
  const query = new URLSearchParams({ action, ...params });
  const response = await fetch(`${API_URL}?${query.toString()}`, {
    method: "GET",
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data dari server.");
  }

  return response.json();
}

export async function apiPost(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Gagal mengirim data ke server.");
  }

  return response.json();
}
