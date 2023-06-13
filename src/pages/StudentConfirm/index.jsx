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
  const [isLoading, setIsLoading] = useState(false);
  // const [reload, setReload] = useState(false);

  useEffect(() => {
    const getTkbGv = async () => {
      setIsLoading(true);
      try {
        const params = {
          ma_gv: profile?.ma_gv,
        };
        let response = await vkuApi.getTkb({ params });

        if (response) {
          setData(response);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error::", error);
      }
    };

    getTkbGv();
  }, [profile]);

  useEffect(() => {
    const getAllStudentRegistry = async () => {
      try {
        let response = await vkuApi.getAllStudentRegistry({});

        if (response) {
          const tmp = response.filter((item) => item?.trang_thai === "2");
          setStudentRegistryList(tmp);
        }
      } catch (error) {
        console.log("error::", error);
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

        // setReload(!reload);
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
        isLoading={isLoading}
        data={data}
        studentRegistryList={studentRegistryList}
        onConfirm={handleConfirmRegistry}
      />
    </div>
  );
};

export default StudentConfirm;
