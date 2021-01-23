import React,{useEffect, useContext} from 'react'
import {Table} from 'antd';
import CustomPagination from "./CustomPagination";

const CustomTable = ({columns, searchFN, stateContext, dispatchContext}) => {

    const {
        data,
        currentPage,
        perPage,
        totalDataCnt,
        loading,
    } = useContext(stateContext);

    const dispatch = useContext(dispatchContext);

    //화면 진입시 자동 조회
    useEffect(() => {
        searchFN(currentPage, perPage);
    }, [])

    //페이지 번호가 바뀌면 조회
    useEffect(() => {
        searchFN(currentPage, perPage);
    }, [currentPage])


    const setCurrentPage = (pageNumber) => {
        dispatch({type: 'FIELD', fieldName: 'currentPage', payload: pageNumber});
    };

    return (<>
        <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={false}
            loading={loading}
        />
        <CustomPagination
            total={totalDataCnt}
            current={currentPage}
            pageSize={perPage}
            onChange={setCurrentPage}
        />
    </>)
}

export default CustomTable;