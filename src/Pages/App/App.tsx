import { PlusOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button, ConfigProvider, Flex, Layout, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import VehicleModal from "../../components/vehicle/Modal";
import { Vehicle } from "../../types/vehicle";
import "./App.css";
import {
  buttonSection,
  contentStyle,
  headerStyle,
  THEME_PRIMARY_COLOR,
} from "./App.style";
import { VEHICLES_DUMMY } from "./dummyData";

const TABLE_COLUMNS: TableProps<Vehicle>["columns"] = [
  {
    title: "",
    key: "index",
    render: (value, record, index) => index + 1,
    align: "center",
  },
  {
    title: "Vehicle ID",
    dataIndex: "vehicleID",
    key: "vehicleID",
    sorter: (a, b) => a.vehicleID.localeCompare(b.vehicleID),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sorter: (a, b) => a.type.localeCompare(b.type),
  },
  {
    title: "Lock/Unlock",
    dataIndex: "lockStatus",
    key: "lockStatus",
    sorter: (a, b) => a.lockStatus.localeCompare(b.lockStatus),
    align: "center",
  },
  {
    title: "Current Speed",
    dataIndex: "speed",
    key: "speed",
    render: (value) => `${value} km/h`,
    sorter: (a, b) => a.speed - b.speed,
    align: "center",
  },
  {
    title: "Battery level",
    dataIndex: "batteryLevel",
    key: "batteryLevel",
    render: (value) => `${value}%`,
    sorter: (a, b) => a.batteryLevel - b.batteryLevel,
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => value.toUpperCase(),
    sorter: (a, b) => a.status.localeCompare(b.status),
    align: "center",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    sorter: (a, b) => a.status.localeCompare(b.status),
    align: "center",
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    render: (value) => format(value, "yyyy-MM-dd hh:mma"),
    sorter: (a, b) => a.lastUpdated.getTime() - b.lastUpdated.getTime(),
    align: "center",
  },
];

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES_DUMMY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [modalKey, setModalKey] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const appendData = (vehicle: Vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  const replaceData = (vehicle: Vehicle) => {
    const originalDataIndex = vehicles.findIndex(
      (v) => v.vehicleID === vehicle.vehicleID
    );

    const replacedArr = vehicles.map((v, index) =>
      index === originalDataIndex ? vehicle : v
    );

    setVehicles(replacedArr);
  };

  const deleteData = (vehicle: Vehicle) => {
    const deletedArr = vehicles.filter(
      (v) => v.vehicleID !== vehicle.vehicleID
    );

    setVehicles(deletedArr);
  };

  useEffect(() => {
    setModalKey((prev) => {
      if (prev === 0) {
        return 1;
      }
      return 0;
    });
  }, [selectedVehicle]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: THEME_PRIMARY_COLOR,
          colorTextLightSolid: "black",
        },
        components: {
          Button: {
            borderRadius: 20,
          },
          Input: {
            borderRadius: 20,
          },
          InputNumber: {
            borderRadius: 20,
          },
          Select: {
            borderRadius: 20,
          },
        },
      }}
    >
      <Layout>
        <Header style={headerStyle}>Vehicle Management</Header>
        <Content style={contentStyle}>
          <Flex justify="end" style={buttonSection}>
            <Button type="primary" onClick={openModal}>
              <PlusOutlined /> New Vehicle
            </Button>
          </Flex>
          <Table
            columns={TABLE_COLUMNS}
            dataSource={vehicles}
            size="small"
            scroll={{ x: 400 }}
            showSorterTooltip={false}
            onRow={(record) => ({
              onClick: () => {
                setSelectedVehicle(record);
                openModal();
              },
            })}
            rowKey={(record) =>
              `${record.vehicleID}${record.lastUpdated.getTime()}`
            }
          />
        </Content>
      </Layout>
      <VehicleModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        appendData={appendData}
        replaceData={replaceData}
        deleteData={deleteData}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
        key={modalKey}
      />
    </ConfigProvider>
  );
}

export default App;
