import YandexError from "./YandexErrorClass";

export const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new YandexError(
      `HTTP error! Status: ${res.status}`,
      res.status,
    );

    throw error;
  }
  return await res.json();
};

export default fetcher;
