import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import vkuApi from "../../components/Api/vkuApi";
import ListCredit from "../../components/StudentConfirm/ListCredit";
import { notification } from "antd";

const StudentConfirm = () => {
  const [cookies] = useCookies();
  const { profile } = cookies;

  const [data, setData] = useState();
  const [studentRegistryList, setStudentRegistryList] = useState([]);

  useEffect(() => {
    const getTkbGv = async () => {
      const params = {
        ma_gv: profile?.ma_gv,
      };
      let response = await vkuApi.getTkb({ params });

      if (response) {
        setData(response);
      }
    };

    getTkbGv();
  }, [profile]);

  useEffect(() => {
    const getAllStudentRegistry = async () => {
      let response = await vkuApi.getAllStudentRegistry({});

      if (response) {
        const tmp = response.filter((item) => item?.trang_thai === "2");
        setStudentRegistryList(tmp);
      }
    };

    getAllStudentRegistry();
  }, []);

  const handleConfirmRegistry = (classId, group) => {
    const tmp = studentRegistryList.filter(
      (item) => item?.ma_lop_tc === classId && item?.nhom === group
    );

    tmp.forEach(async (item, i) => {
      if (i === tmp.length - 1) {
        // const res_2 = await vkuApi.getAllStudentRegistry({});
        // setStudentRegistryList(res_2);

        notification.success({ message: "Xác nhận thành công!" });
      }
      const params = {
        id: item?.id,
        trang_thai: 1,
      };
      try {
        await vkuApi.updateRegistry({ params });
      } catch (error) {
        notification.error({ message: "Hiện tại chưa thể xác nhận!" });
      }
    });
  };

  return (
    <div className="page-content">
      <ListCredit
        data={data}
        studentRegistryList={studentRegistryList}
        onConfirm={handleConfirmRegistry}
      />
    </div>
  );
};

export default StudentConfirm;
