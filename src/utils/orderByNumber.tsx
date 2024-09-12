export const sortByOrderNumber = (a: any, b: any) => {
  if (a.order_number > b.order_number) {
    return 1;
  } else return -1;
};

export const sortByOrderNumberReverse = (a: any, b: any) => {
  if (a.order_number < b.order_number) {
    return 1;
  } else return -1;
};
