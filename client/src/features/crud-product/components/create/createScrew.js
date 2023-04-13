import { FormRow, FormRowSelect, Alert } from "@components/index";
import { useAppContext } from "@context/appContext";
import { useEffect, useState } from "react";
import { getAllFeatures } from "../../utils/api";

const CreateScrew = () => {
  const { handleChange } = useAppContext();

  const [threadTypes, setThreadTypes] = useState([]);
  const [headTypes, setHeadTypes] = useState([]);
  const [driveTypes, setDriveTypes] = useState([]);
  const [shankTypes, setShankTypes] = useState([]);
  const [pointTypes, setPointTypes] = useState([]);

  useEffect(() => {
    getAllFeatures().then((data) => {
      setThreadTypes(data.threadTypes);
      setHeadTypes(data.headTypes);
      setDriveTypes(data.driveTypes);
      setShankTypes(data.shankTypes);
      setPointTypes(data.pointTypes);
    });
  }, []);

  const handleProductInput = (e) => {
    handleChange(e);
  };
  return (
    <div className="form-section">
      <label className="form-label-section">Features</label>
      {/* Features section*/}
      <FormRowSelect
        labelText="Thread Type"
        name="threadType"
        onChange={handleProductInput}
        options={threadTypes.map((threadType) => ({
          key: threadType._id, // Add the key prop
          value: threadType._id,
          display: threadType.threadTypeName,
        }))}
      />
      <FormRowSelect
        labelText="Head Type"
        name="headType"
        onChange={handleProductInput}
        options={headTypes.map((headType) => ({
          key: headType._id, // Add the key prop
          value: headType._id,
          display: headType.headTypeName,
        }))}
      />
      <FormRowSelect
        labelText="Drive Type"
        name="driveType"
        onChange={handleProductInput}
        options={driveTypes.map((driveType) => ({
          key: driveType._id, // Add the key prop
          value: driveType._id,
          display: driveType.driveTypeName,
        }))}
      />
      <FormRowSelect
        labelText="Shank Type"
        name="shankType"
        onChange={handleProductInput}
        options={shankTypes.map((shankType) => ({
          key: shankType._id, // Add the key prop
          value: shankType._id,
          display: shankType.shankTypeName,
        }))}
      />
      <FormRowSelect
        labelText="Point Type"
        name="pointType"
        onChange={handleProductInput}
        options={pointTypes.map((pointType) => ({
          key: pointType._id, // Add the key prop
          value: pointType._id,
          display: pointType.pointTypeName,
        }))}
      />
    </div>
  );
};

export { CreateScrew };
