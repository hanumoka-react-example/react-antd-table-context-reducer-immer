import React, {useState, useEffect} from 'react';
import {Table, Pagination} from 'antd';
import axios from 'axios';

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        width: '20%',
    },
    {
        title: 'title',
        dataIndex: 'title',
        width: '20%',
    },
    {
        title: 'author',
        dataIndex: 'author',
    },
];


const Page2 = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPageCnt, setTotalPageCnt] = useState(10);
    const [loading, setLoading] = useState(false);

    //화면 진입시 자동 조회
    useEffect(() => {
        reqPagingPosts();
    }, [])

    //페이지 번호가 바뀌면 조회
    useEffect(() =>{
        reqPagingPosts();
    }, [currentPage])

    const reqPagingPosts = async () => {
        setLoading(true);
        const response = await axios.get(`http://localhost:3004/page2?page=${currentPage}&limit=${pageSize}`);
        console.log(JSON.stringify(response));
        setData(response.data.data.data);
        setTotalPageCnt(response.data.data.totalCnt);
        setLoading(false);
    };

    return (
        <div className="site-layout-content">
            <h1>page2</h1>
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={data}
                pagination={false}
                loading={loading}
                //onChange={handleTableChange}
            />
            <MyPagination
                total={totalPageCnt}
                current={currentPage}
                pageSize={pageSize}
                onChange={setCurrentPage}
            />
        </div>)
}

// Custom pagination component
const MyPagination = ({ total, onChange, current, pageSize }) => {
    return (
        <Pagination
            onChange={onChange}
            total={total}
            current={current}
            pageSize={pageSize}
        />
    );
};

export default Page2;