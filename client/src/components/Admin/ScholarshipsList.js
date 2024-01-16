import React, { useEffect, useState } from "react";
import { Table, Input, Space } from 'antd';

import axios from 'axios';

const ScholarshipsList = () => {
  
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/sholarship/getAll', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setScholarships(response.data.scholarships);
      })
      .catch(error => {
        console.error('Error sending GET request to the server:', error);
      })
      .finally(() => {
        // Arrête le chargement, que la requête réussisse ou échoue
        setLoading(false);
      });
  }, []);

  if (scholarships.length === 0) {
    return;
  } 

  console.log('scholarships', scholarships);

  const getFileName = (file) => {
    const fileObject = JSON.parse(file)[0];
    return fileObject.filename;
  };
  
  const getOriginalName = (file) => {
    const fileObject = JSON.parse(file)[0];
    return fileObject.originalname;
  };

  const downloadFile = (fileName, fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateDownloadLinks = (scholarship) => {
    const cvFileName = getOriginalName(scholarship.cv);
    const cvFileUrl = getFileName(scholarship.cv);
  
    const letterFileName = getOriginalName(scholarship.lettreMotivation);
    const letterFileUrl = getFileName(scholarship.lettreMotivation);
  
    return {
      cv: { fileName: cvFileName, fileUrl: cvFileUrl },
      letter: { fileName: letterFileName, fileUrl: letterFileUrl },
    };
  };  
  
  const { Search } = Input;
  const onSearch = (value) => {
    console.log('value', value);
    const filteredData = scholarships.filter(scholarship =>
      scholarship.firstName.toLowerCase().includes(value.toLowerCase()) ||
      scholarship.lastName.toLowerCase().includes(value.toLowerCase()) ||
      scholarship.email.toLowerCase().includes(value.toLowerCase()) ||
      scholarship.msg.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredScholarships(filteredData);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: (text, record) => (
        <span key={`name_${record._id}`}>{`${record.firstName} ${record.lastName}`}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'msg',
      key: 'msg',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button
            key={`download_cv_${record._id}`}
            className="btn_save_upload"
            onClick={() => {
              const { cv } = generateDownloadLinks(record);
              downloadFile(cv.fileName, cv.fileUrl);
            }}
          >
            Download CV
          </button>
          <button
            key={`download_cover_letter_${record._id}`}
            className="btn_save_upload"
            onClick={() => {
              const { letter } = generateDownloadLinks(record);
              downloadFile(letter.fileName, letter.fileUrl);
            }}
          >
            Download Cover Letter
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 className="yellow-text">List of Scholarships</h3>
      {loading && scholarships.length ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Search
            placeholder="input search text"
            className="search_input"
            size="large"
            allowClear
            onChange={(e) => onSearch(e.target.value)}
            enterButton
          />
          <Table columns={columns} dataSource={filteredScholarships.length > 0 ? filteredScholarships : scholarships} rowKey="_id" />
        </div>
      )}
    </div>
  );
};

export default ScholarshipsList;
