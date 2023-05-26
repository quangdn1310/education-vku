import React, { useEffect, useState } from "react";

import vkuApi from "../../../components/Api/vkuApi";
import ListCredit from "../../../components/CreditRegistry/ListCredit";
import { useCookies } from "react-cookie";
import { Space, notification } from "antd";
import ListRegistered from "../../../components/CreditRegistry/ListRegistered";

const CreditRegistry = () => {
  const [cookies] = useCookies();
  const { profile } = cookies;

  const [data, setData] = useState([]);
  const [myRegistryList, setMyRegistryList] = useState([]);

  // GET ALL CLASS REGISTRY BY STUDENT
  useEffect(() => {
    const getStudentRegistryById = async () => {
      const params = {
        ma_sv: profile?.ma_sv,
      };
      let response = await vkuApi.getStudentRegistryById({ params });

      if (response) {
        setMyRegistryList(response);
      }
    };

    getStudentRegistryById(profile?.ma_sv);
  }, [profile]);

  useEffect(() => {
    const getAllCreditClassByParams = async () => {
      const params = {
        khoa_hoc: profile.khoa_hoc,
        ma_khoa: profile.ma_khoa,
      };
      let response = await vkuApi.getAllCreditClassByParams({ params });

      if (response) {
        setData(response);
      }
    };

    getAllCreditClassByParams();
  }, [profile]);

  const handleCreate = async (data, callback) => {
    const params = data;
    try {
      const res = await vkuApi.createSubjectRegistry({ params });
      if (res) {
        const res_2 = await vkuApi.getStudentRegistryById({
          params: {
            ma_sv: profile?.ma_sv,
          },
        });
        setMyRegistryList(res_2);
        notification.success({ message: "Đăng kí thành công!" });
      }
    } catch (error) {
      notification.error({ message: "Đăng kí thất bại!" });
    }

    callback();
  };

  const handleDelete = async (id) => {
    if (id) {
      const params = { id };
      try {
        let res = await vkuApi.deleteRegistry({ params });
        if (res) {
          const res_2 = await vkuApi.getStudentRegistryById({
            params: {
              ma_sv: profile?.ma_sv,
            },
          });
          setMyRegistryList(res_2);

          notification.success({ message: "Hủy đăng kí học phần thành công!" });
        }
      } catch (error) {
        notification.error({ message: "Không thể hủy đăng kí khóa học này!" });
      }
    }
  };

  return (
    <div className="page-content">
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        {myRegistryList?.length > 0 && (
          <ListRegistered
            data={myRegistryList}
            profile={profile}
            onDelete={handleDelete}
          />
        )}
        <ListCredit data={data} profile={profile} onCreate={handleCreate} />
      </Space>
    </div>
  );
};

export default CreditRegistry;
