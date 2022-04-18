export const validateNumber = text => {
  return text.replace(/[^\d]/g, '');
};

const regName =
  /[^a-zA-ZА-Яа-яÄäÖöÜüßЇїЁёіІєЄ\-Ђђ\sЉљЊњЋћЏџЈјẞČčĆćDždžĐđŠšŽ’']/g;

export const validateName = text => {
  return text.replace(regName, '');
};
