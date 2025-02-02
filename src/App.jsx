import React, { useState } from 'react';
import axios from 'axios';
import { Flex, Input, Button, message, Upload, Spin } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import "./App.css"

const transcript_props = {
  name: 'file',
  action: `${import.meta.env.VITE_APP_SERVER}/api/v1/file/transcript`,
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const score_props = {
  name: 'file',
  action: `${import.meta.env.VITE_APP_SERVER}/api/v1/file/score`,
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function FileUpload() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [assessor, setAssessor] = useState("");
  const [organization, setOrganization] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generate = () => {
    setIsLoading(true);
    axios.post(`${import.meta.env.VITE_APP_SERVER}/api/v1/report/generate`, {
      firstName,
      lastName,
      assessor,
      organization
    })
      .then(response => {
        setIsLoading(false);
        message.success("Report generated successfully. Please download the report");
      })
      .catch(error => {
        setIsLoading(false);
        message.error("Failed to generate report. Try again.");
      });
  }

  return (
    <Flex justify='center' style={{ padding: "100px" }}>
      {!isLoading ? <Flex vertical gap={20}>
        <Input placeholder='First Name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
        <Input placeholder='Last Name' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
        <Input placeholder='Assessor' value={assessor} onChange={(e) => { setAssessor(e.target.value) }} />
        <Input placeholder='Organization' value={organization} onChange={(e) => { setOrganization(e.target.value) }} />
        <Upload {...transcript_props}>
          <Button icon={<UploadOutlined />}>Upload Transcript</Button>
        </Upload>
        <Upload {...score_props}>
          <Button icon={<UploadOutlined />}>Upload Score</Button>
        </Upload>
        <Button onClick={generate}>Generate Report</Button>
        <Button type="primary">
          <a href={`${import.meta.env.VITE_APP_SERVER}/api/v1/file/download`}>Download</a>
        </Button>
      </Flex> : <Spin />}

    </Flex>

  );
}

export default FileUpload;