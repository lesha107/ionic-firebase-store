export const initFirestoreData = (items): [] =>
  items.map(({ payload }) => ({
    id: payload.doc.id,
    ...payload.doc.data(),
  }));
