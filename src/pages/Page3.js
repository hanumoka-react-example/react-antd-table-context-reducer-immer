import React, {useState, useEffect} from 'react';
import {Table, Pagination} from 'antd';
import axios from 'axios';
import {useImmerReducer} from "use-immer";
import produce from 'immer';

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

const initialState = {
    data: [],
    currentPage: 1,
    perPage: 5,
    totalDataCnt: 0,
    loading: false
};

function page3Reducer(state, action) {
    switch (action.type) {
        case 'FIELD' : {
            return produce(state, draft => {
                draft[action.fieldName] = action.payload;
            });
        }
        case 'START_SEARCH' : {
            return produce(state, (draft) => {
                draft.loading = true
            })
        }
        case 'END_SEARCH' : {
            return produce(state, (draft) => {
                draft.data = action.data;
                draft.totalDataCnt = action.totalCnt;
                draft.loading = false
            })
        }
    }
}


const Page3 = () => {

    const [state, dispatch] = useImmerReducer(page3Reducer, initialState);

    const {
        data,
        currentPage,
        perPage,
        totalDataCnt,
        loading,
    } = state;


    //화면 진입시 자동 조회
    useEffect(() => {
        reqPagingPosts();
    }, [])

    //페이지 번호가 바뀌면 조회
    useEffect(() => {
        console.log(`currentPage : ${currentPage}`);
        reqPagingPosts();
    }, [currentPage])

    const reqPagingPosts = async () => {
        dispatch({type:'START_SEARCH'});
        const response = await axios.get(`http://localhost:3004/page2?page=${currentPage}&limit=${perPage}`);
        console.log(JSON.stringify(response));
        dispatch({type:'END_SEARCH', data: response.data.data.data, totalCnt:response.data.data.totalCnt});
    };

    const setCurrentPage = (pageNumber) => {
        dispatch({type:'FIELD',fieldName: 'currentPage', payload: pageNumber});
    };

    return (
        <div className="site-layout-content">
            <h1>page3</h1>
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={data}
                pagination={false}
                loading={loading}
            />
            <MyPagination
                total={totalDataCnt}
                current={currentPage}
                pageSize={perPage}
                onChange={setCurrentPage}
            />
        </div>)
}

// Custom pagination component
const MyPagination = ({total, onChange, current, pageSize}) => {
    return (
        <Pagination
            onChange={onChange}
            total={total}
            current={current}
            pageSize={pageSize}
        />
    );
};

export default Page3;