const getData = (path) => {
  return fetch(path).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(
        "Sorry we are having difficulty loading this page, please try again later!"
      );
    }
  });
};

export const apiCalls = {

  getOrders: () => {
    return getData(`http://localhost:3001/api/v1/orders`);
  },
}