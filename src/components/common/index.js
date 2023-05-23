import { Typography } from "antd";

const { Text } = Typography;

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

export const scoreToAlp = (number) => {
  let score = "";
  switch (true) {
    case number < 4:
      score = <Text type="danger">F</Text>;
      break;
    case number < 5.5:
      score = <Text type="warning">D</Text>;
      break;
    case number < 7:
      score = <Text type="secondary">C</Text>;
      break;
    case number < 8.5:
      score = <Text type="info">B</Text>;
      break;
    default:
      score = <Text type="success">A</Text>;
  }

  return score;
};
