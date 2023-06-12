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
  getStudentsByProjectClassId: (params) => {
    const path = `getStudentsByProjectClassId.php`;
    return axiosClient.get(path, params);
  },
  updateScore: (params) => {
    const path = `updateScore.php`;
    return axiosClient.get(path, params);
  },
  updateScoreProject: (params) => {
    const path = `updateScoreProject.php`;
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
  getSchoolYears: (params) => {
    const path = `getAllSchoolYearByCourseId.php`;
    return axiosClient.get(path, params);
  },
  getAllCreditClassByParams: (params) => {
    const path = `getAllCreditClassByParams.php`;
    return axiosClient.get(path, params);
  },
  getAllProjectClass: (params) => {
    const path = `getAllProjectClass.php`;
    return axiosClient.get(path, params);
  },
  getAllHPRegistry: (params) => {
    const path = `getAllHPRegistry.php`;
    return axiosClient.get(path, params);
  },
  getAllStudentRegistry: (params) => {
    const path = `getAllStudentRegistry.php`;
    return axiosClient.get(path, params);
  },
  getStudentRegistryById: (params) => {
    const path = `getStudentRegistryById.php`;
    return axiosClient.get(path, params);
  },
  createSubjectRegistry: (params) => {
    const path = `createSubjectRegistry.php`;
    return axiosClient.get(path, params);
  },
  updateRegistry: (params) => {
    const path = `updateRegistry.php`;
    return axiosClient.get(path, params);
  },
  deleteRegistry: (params) => {
    const path = `deleteRegistry.php`;
    return axiosClient.get(path, params);
  },
  getStudentAttendance: (params) => {
    const path = `getStudentAttendance.php`;
    return axiosClient.get(path, params);
  },
  createStudentAttendance: (params) => {
    const path = `createStudentAttendance.php`;
    return axiosClient.get(path, params);
  },
  countStudentAttendance: (params) => {
    const path = `countStudentAttendance.php`;
    return axiosClient.get(path, params);
  },
};

export default vkuApi;
