import React from 'react'
import {Pagination} from 'antd';

const CustomPagination = ({total, onChange, current, pageSize}) => {
    return (
        <Pagination
            onChange={onChange}
            total={total}
            current={current}
            pageSize={pageSize}
        />
    );
};

export default CustomPagination;

