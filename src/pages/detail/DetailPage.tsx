import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Row, Col } from 'antd';
import styles from './DetailPage.module.css';
import { Header, Footer, ProductIntro } from '../../components';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
}

const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { touristRouteId } = useParams<MatchParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`);
        setProduct(data);
      } catch (e) {
        setError('network error');
      } finally {
        setLoading(false);
      }
    })();
  }, [touristRouteId]);

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
    <>
      <Header />
      <div className={styles['page-content']}>
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
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 錨點菜單 */}
        <div className={styles['product-detail-anchor']}></div>
        {/* 產品特色 */}
        <div id='feature' className={styles['product-detail-container']}></div>
        {/* 费用 */}
        <div id='fees' className={styles['product-detail-container']}></div>
        {/* 預定須知 */}
        <div id='notes' className={styles['product-detail-container']}></div>
        {/* 商品評價 */}
        <div id='comments' className={styles['product-detail-container']}></div>
      </div>
      <Footer />
    </>
  );
};

export { DetailPage };
