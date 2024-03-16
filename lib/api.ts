export function callAPI(search: string) {
  return fetch(`/todos${search ? `?s=${search}` : ""}`);
}
