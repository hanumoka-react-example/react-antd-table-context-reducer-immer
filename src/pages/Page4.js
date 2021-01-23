import React from 'react';
import CustomTable from "../components/CustomTable";
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


function pageReducer(state, action) {
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

const StateContext = React.createContext({});
const DispatchContext = React.createContext({});

export default function Page4() {

    const [state1, dispatch1] = useImmerReducer(pageReducer, initialState); // 1번 테이블 상태
    const [state2, dispatch2] = useImmerReducer(pageReducer, initialState); // 2번 테이블 상태

    //1번 테이블 조회
    const reqPagingPosts1 = async (currentPage, perPage) => {
        dispatch1({type: 'START_SEARCH'});
        const response = await axios.get(`http://localhost:3004/page2?page=${currentPage}&limit=${perPage}`);
        //console.log(JSON.stringify(response));
        dispatch1({type: 'END_SEARCH', data: response.data.data.data, totalCnt: response.data.data.totalCnt});
    };

    //2번 테이블 조회
    const reqPagingPosts2 = async (currentPage, perPage) => {
        dispatch2({type: 'START_SEARCH'});
        const response = await axios.get(`http://localhost:3004/page2?page=${currentPage}&limit=${perPage}`);
        dispatch2({type: 'END_SEARCH', data: response.data.data.data, totalCnt: response.data.data.totalCnt});
    };

    return (
        <div className="site-layout-content">
            <h1>page4</h1>
            <DispatchContext.Provider value={dispatch1}>
                <StateContext.Provider value={state1}>
                <CustomTable
                    name="1번 테이블"
                    columns={columns}
                    searchFN={reqPagingPosts1}
                    stateContext={StateContext}
                    dispatchContext={DispatchContext}
                />
                </StateContext.Provider>
            </DispatchContext.Provider>
            {/* 동일한 콘텍스트를 사용하는 것이 옳은 것인지 모르겠다.*/}
            <DispatchContext.Provider value={dispatch2}>
                <StateContext.Provider value={state2}>
                    <CustomTable
                        name="2번 테이블"
                        columns={columns}
                        searchFN={reqPagingPosts2}
                        stateContext={StateContext}
                        dispatchContext={DispatchContext}
                    />
                </StateContext.Provider>
            </DispatchContext.Provider>

        </div>)
}
