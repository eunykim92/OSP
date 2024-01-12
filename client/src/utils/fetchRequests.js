export function addDesign(body) {
  return fetch('/designs/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: add design: ERROR: ', err));
}
