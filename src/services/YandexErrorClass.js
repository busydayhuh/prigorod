export default class extends Error {
  constructor(message, status) {
    super(message);
    this.name = "YandexError";
    this.status_code = status;
  }
}
