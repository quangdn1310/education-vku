import axiosClient from "./axiosClient";

const vkuApi = {
  getTkb: (params) => {
    const path = `tkb.php`;
    return axiosClient.get(path, params);
  },
  getTkbDoAn: (params) => {
    const path = `tkbDoAn.php`;
    return axiosClient.get(path, params);
  },
  getTkbSinhVien: (params) => {
    const path = `tkbsv.php`;
    return axiosClient.get(path, params);
  },
  getTkbDoAnSv: (params) => {
    const path = `tkbDoAnSv.php`;
    return axiosClient.get(path, params);
  },
  login: (params) => {
    const path = `login.php`;
    return axiosClient.get(path, params);
  },
  getTeacher: (params) => {
    const path = `getTeacher.php`;
    return axiosClient.get(path, params);
  },
  getStudentsByClassId: (params) => {
    const path = `getStudentsByClassId.php`;
    return axiosClient.get(path, params);
  },
  updateScore: (params) => {
    const path = `updateScore.php`;
    return axiosClient.get(path, params);
  },
  getStudent: (params) => {
    const path = `getStudent.php`;
    return axiosClient.get(path, params);
  },
  getScore: (params) => {
    const path = `getScore.php`;
    return axiosClient.get(path, params);
  },
};

export default vkuApi;
