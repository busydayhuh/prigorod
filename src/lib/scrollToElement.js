export function scrollToElement(el) {
  if (!el) return;

  const y =
    el.getBoundingClientRect().top +
    (window.pageYOffset || document.documentElement.scrollTop);

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}
