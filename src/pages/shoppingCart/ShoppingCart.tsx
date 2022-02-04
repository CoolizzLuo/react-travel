import React from 'react';
import styles from './ShoppingCart.module.css';
import { MainLayout } from '../../layouts/mainLayout';
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCard } from '../../components';

export const ShoppingCartPage: React.FC = (props) => {
  return (
    <MainLayout>
      <Row>
        {/* 購物車清單 */}
        <Col span={16}>
          <div className={styles['product-list-container']}>{/* <ProductList /> */}</div>
        </Col>
        {/* 支付卡組件 */}
        <Col span={8}>
          <Affix>
            <div className={styles['payment-card-container']}>{/* <PaymentCard /> */}</div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
