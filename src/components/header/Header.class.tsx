import React from 'react';
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import store from '../../redux/store';
import { LanguageState } from "../../redux/languageReducer";


interface State extends LanguageState {}

class HeaderComponent extends React.Component<RouteComponentProps, State> {
  constructor(props) {
    super(props);
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    };
    store.subscribe(this.handleStoreChange);
  };

  handleStoreChange = () => {
    const storeState = store.getState();
    this.setState({
      language: storeState.language,
      languageList: storeState.languageList,
    });
  }

  menuClickHandler = (e) => {
    console.log(e);
    if(e.key === 'new') {
      const action = {
        type: "add_language",
        payload: {
          code: 'new_lang',
          name: '新語言'
        },
      };
      store.dispatch(action);
    } else {
      const action = {
        type: "change_language",
        payload: e.key,
      };
      store.dispatch(action);
    }
  };

  render(): React.ReactNode {
    const { history } = this.props

    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Typography.Text>讓旅遊更幸福</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  { this.state.languageList.map(l => (
                    <Menu.Item key={l.code}>{l.name}</Menu.Item>
                  ))}
                  <Menu.Item key={'new'}>增加新語言</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.state.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => history.push('/register')}>註冊</Button>
              <Button onClick={() => history.push('/signIn')}>登入</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => history.push('/')}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={3} className={styles.title}>React 旅遊網</Typography.Title>
          </span>
          <Input.Search
            placeholder={"請輸入旅遊目的地、主題、或關鍵字"}
            className={styles["search-input"]}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles["main-menu"]}>
          <Menu.Item key={1}>旅遊首頁</Menu.Item>
          <Menu.Item key={2}>周末遊</Menu.Item>
          <Menu.Item key={3}>跟團遊</Menu.Item>
          <Menu.Item key="4"> 自由行 </Menu.Item>
          <Menu.Item key="5"> 私家團 </Menu.Item>
          <Menu.Item key="6"> 遊輪 </Menu.Item>
          <Menu.Item key="7"> 酒店+景點 </Menu.Item>
          <Menu.Item key="8"> 當地玩樂 </Menu.Item>
          <Menu.Item key="9"> 主題遊 </Menu.Item>
          <Menu.Item key="10"> 訂製遊 </Menu.Item>
          <Menu.Item key="11"> 遊學 </Menu.Item>
          <Menu.Item key="12"> 簽證 </Menu.Item>
          <Menu.Item key="13"> 企業遊 </Menu.Item>
          <Menu.Item key="14"> 高端遊 </Menu.Item>
          <Menu.Item key="15"> 愛玩戶外 </Menu.Item>
          <Menu.Item key="16"> 保險 </Menu.Item>
        </Menu>
      </div>
    )
  }
}

const Header = withRouter(HeaderComponent)

export { Header }
