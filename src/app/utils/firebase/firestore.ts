export const initFirestoreCollection = (items): [] =>
  items.map(({ payload }) => ({
    uid: payload.doc.id,
    ...payload.doc.data(),
  }));

export function initFirestoreDoc(item) {
  return {
    uid: item.payload.id,
    ...item.payload.data(),
  };
}
