export function getAPIParams(keys, searchParams) {
  return Object.fromEntries(
    keys.map((k) => [k, searchParams.get(k)]).filter(([, v]) => v != null)
  );
}
