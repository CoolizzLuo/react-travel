import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { useTranslation } from 'react-i18next';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import useSelector from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions';
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { userSlice } from '../../redux/user/slice';

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

const Header = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const jwt = useSelector((s) => s.user.token);

  const history = useHistory();
  const language = useSelector((s) => s.language.language);
  const languageList = useSelector((s) => s.language.languageList);
  const dispatch = useDispatch();

  const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);

  const menuClickHandler = (e) => {
    console.log(e);
    if (e.key === 'new') {
      dispatch(addLanguageActionCreator('新語言', 'new_lang'));
    } else {
      dispatch(changeLanguageActionCreator(e.key));
    }
  };

  const onLogout = () => {
    dispatch(userSlice.actions.logOut());
    history.push('/');
  };

  return (
    <div className={styles['app-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => (
                  <Menu.Item key={l.code}>{l.name}</Menu.Item>
                ))}
                <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          {jwt ? (
            <Button.Group className={styles['button-group']}>
              <span>
                {t('header.welcome')}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button loading={shoppingCartLoading} onClick={() => history.push('./shoppingCart')}>
                {t('header.shoppingCart')}({shoppingCartItems.length})
              </Button>
              <Button onClick={onLogout}>{t('header.signOut')}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>{t('header.register')}</Button>
              <Button onClick={() => history.push('/signIn')}>{t('header.signin')}</Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => history.push('/')}>
          <img src={logo} alt='logo' className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            {t('header.title')}
          </Typography.Title>
        </span>
        <Input.Search
          placeholder={'請輸入旅遊目的地、主題、或關鍵字'}
          className={styles['search-input']}
          onSearch={(keywords) => history.push('/search/' + keywords)}
        />
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles['main-menu']}>
        <Menu.Item key='1'> {t('header.home_page')} </Menu.Item>
        <Menu.Item key='2'> {t('header.weekend')} </Menu.Item>
        <Menu.Item key='3'> {t('header.group')} </Menu.Item>
        <Menu.Item key='4'> {t('header.backpack')} </Menu.Item>
        <Menu.Item key='5'> {t('header.private')} </Menu.Item>
        <Menu.Item key='6'> {t('header.cruise')} </Menu.Item>
        <Menu.Item key='7'> {t('header.hotel')} </Menu.Item>
        <Menu.Item key='8'> {t('header.local')} </Menu.Item>
        <Menu.Item key='9'> {t('header.theme')} </Menu.Item>
        <Menu.Item key='10'> {t('header.custom')} </Menu.Item>
        <Menu.Item key='11'> {t('header.study')} </Menu.Item>
        <Menu.Item key='12'> {t('header.visa')} </Menu.Item>
        <Menu.Item key='13'> {t('header.enterprise')} </Menu.Item>
        <Menu.Item key='14'> {t('header.high_end')} </Menu.Item>
        <Menu.Item key='15'> {t('header.outdoor')} </Menu.Item>
        <Menu.Item key='16'> {t('header.insurance')} </Menu.Item>
      </Menu>
    </div>
  );
};

export { Header };
