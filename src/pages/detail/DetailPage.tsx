import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from 'antd';
import styles from './DetailPage.module.css';
import { ProductIntro, ProductComments } from '../../components';
import { MainLayout } from '../../layouts/mainLayout';
import { DatePicker, Button } from 'antd';
import { commentMockData } from './mockup';
import { getProductDetail } from '../../redux/productDetail/slice';
import useSelector from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addShoppingCartItem } from '../../redux/shoppingCart/slice';

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
}

const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { touristRouteId } = useParams<MatchParams>();
  // const [loading, setLoading] = useState<boolean>(true);
  // const [product, setProduct] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);

  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

  const dispatch = useDispatch();

  const jwt = useSelector((s) => s.user.token) as string;
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    dispatch(getProductDetail(touristRouteId));
  }, []);

  if (loading) {
    return (
      <Spin
        size='large'
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      />
    );
  }
  if (error) {
    return <div>網站出錯{error}</div>;
  }

  return (
    <MainLayout>
      {/* 產品簡介與日期選擇 */}
      <div className={styles['product-intro-container']}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.price}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            <Button
              style={{ marginTop: 50, marginBottom: 30, display: 'block' }}
              type='primary'
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(addShoppingCartItem({ jwt, touristRouteId: product.id }));
              }}
            >
              <ShoppingCartOutlined />
              放入購物車
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 錨點菜單 */}
      <Anchor className={styles['product-detail-anchor']}>
        <Menu mode='horizontal'>
          <Menu.Item key='1'>
            <Anchor.Link href='#feature' title='產品特色'></Anchor.Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Anchor.Link href='#fees' title='費用'></Anchor.Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Anchor.Link href='#notes' title='預定須知'></Anchor.Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Anchor.Link href='#comments' title='用戶評論'></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      {/* 產品特色 */}
      <div id='feature' className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>產品特色</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
      </div>
      {/* 費用 */}
      <div id='fees' className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>費用</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
      </div>
      {/* 預定須知 */}
      <div id='notes' className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>預定須知</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
      </div>
      {/* 商品評價 */}
      <div id='comments' className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>用戶評價</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  );
};

export { DetailPage };
