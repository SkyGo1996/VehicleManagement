import React from "react";
import { Button, Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import {
  Vehicle,
  VehicleLockStatus,
  VehicleStatus,
  VehicleType,
} from "../../types/vehicle";
import { Rule } from "antd/es/form";

const { Option } = Select;

interface IVehicleModal {
  isModalOpen: boolean;
  closeModal: () => void;
  appendData: (data: Vehicle) => void;
  replaceData: (vehicle: Vehicle) => void;
  deleteData: (vehicle: Vehicle) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
}

interface IVehicleModalForm extends Vehicle {
  latitude: number;
  longitude: number;
}

const VehicleModal: React.FC<IVehicleModal> = ({
  isModalOpen,
  closeModal,
  appendData,
  replaceData,
  deleteData,
  selectedVehicle,
  setSelectedVehicle,
}) => {
  const [form] = Form.useForm<IVehicleModalForm>();

  const digitOnly = (_: Rule, value: string) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject("Please enter only digit");
    }
    return Promise.resolve();
  };

  const resetForm = () => {
    form.resetFields();
    if (selectedVehicle) {
      setSelectedVehicle(null);
    }
    closeModal();
  };

  const onSubmit = async (values: IVehicleModalForm) => {
    const valueToStore: Vehicle = {
      ...values,
      location: `${values.latitude},${values.longitude}`,
      lastUpdated: new Date(),
    };
    if (selectedVehicle) {
      replaceData(valueToStore);
    } else {
      appendData(valueToStore);
    }
    resetForm();
  };

  const onDelete = () => {
    if (selectedVehicle) {
      deleteData(selectedVehicle);
    }
    resetForm();
  };

  const setInitialValues = (): IVehicleModalForm | undefined => {
    if (selectedVehicle) {
      const [latitude, longitude] = selectedVehicle.location.split(",");
      return {
        ...selectedVehicle,
        latitude: Number(latitude),
        longitude: Number(longitude),
      };
    }
    return undefined;
  };

  return (
    <Modal
      title={selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}
      open={isModalOpen}
      onCancel={resetForm}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Form
        name="add"
        autoComplete="off"
        onFinish={onSubmit}
        form={form}
        labelCol={{ span: 6 }}
        initialValues={setInitialValues()}
      >
        <Form.Item<IVehicleModalForm>
          label="Vehicle No"
          name="vehicleID"
          rules={[
            { required: true, message: "Please input vehicle no!" },
            { validator: digitOnly },
          ]}
        >
          <Input disabled={selectedVehicle ? true : false} pattern="^[0-9]+$" />
        </Form.Item>
        <Form.Item<IVehicleModalForm>
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select vehicle type!" }]}
        >
          {SelectGenerator(VehicleType)}
        </Form.Item>
        <Form.Item<IVehicleModalForm>
          label="Lock/Unlock"
          name="lockStatus"
          rules={[{ required: true, message: "Please select lock status!" }]}
        >
          {SelectGenerator(VehicleLockStatus)}
        </Form.Item>
        <Form.Item<IVehicleModalForm>
          label="Current Speed"
          name="speed"
          rules={[{ required: true, message: "Please input current speed!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item<IVehicleModalForm>
          label="Battery level"
          name="batteryLevel"
          rules={[{ required: true, message: "Please input battery level!" }]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item<IVehicleModalForm>
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          {SelectGenerator(VehicleStatus)}
        </Form.Item>
        <Form.Item
          label="Latitude"
          name="latitude"
          rules={[{ required: true, message: "Please input latitude!" }]}
        >
          <InputNumber min={-90} max={90} />
        </Form.Item>
        <Form.Item
          label="Longitude"
          name="longitude"
          rules={[{ required: true, message: "Please input longitude!" }]}
        >
          <InputNumber min={-180} max={180} />
        </Form.Item>
        <Flex justify="end" gap={20}>
          <Button type="primary" htmlType="submit">
            {selectedVehicle ? "Edit" : "Submit"}
          </Button>
          {selectedVehicle && (
            <Button danger onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button onClick={resetForm}>Cancel</Button>
        </Flex>
      </Form>
    </Modal>
  );
};

const SelectGenerator = <E extends string>(
  enumType: Record<string, E>
): JSX.Element => {
  return (
    <Select>
      {Object.keys(enumType).map((key) => (
        <Option value={enumType[key as keyof typeof enumType]} key={key}>
          {key}
        </Option>
      ))}
    </Select>
  );
};

export default VehicleModal;
