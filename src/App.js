import React from 'react';
import {Route, BrowserRouter, Link } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import 'antd/dist/antd.css';
import './App.css';
import {Layout, Menu, Breadcrumb} from 'antd';

const {Header, Content, Footer} = Layout;

function App() {

    const onClickMenu = () => {

    }

    return (
        <div className="App">
            <BrowserRouter>
                <Layout className="layout">
                    <Header>
                        <div className="logo"/>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1"><Link to="/">기본테이블</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/page2">페이징 useState</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/page3">페이징 useReducer + immer</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/page4">페이징 userContext</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-content">
                            <Route exact path="/" component={Page1}/>
                            <Route path="/page2" component={Page2}/>
                            <Route path="/page3" component={Page3}/>
                            <Route path="/page4" component={Page4}/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
