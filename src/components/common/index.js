export const checkSessionOfTheDay = (date) => {
  const hours = date.getHours();
  let greeting = "";
  switch (true) {
    case hours < 12:
      greeting += "Chào buổi sáng!";
      break;
    case hours < 17:
      greeting += "Chào buổi chiều!";
      break;
    default:
      greeting += "Chào buổi tối!";
      break;
  }

  return greeting;
};
