import { FC, useEffect } from 'react';
import styles from './SearchPage.module.css';
import { FilterArea, ProductList } from '../../components';
import { MainLayout } from '../../layouts/mainLayout';
import { useParams, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { searchProduct } from '../../redux/productSearch/slice';
import useSelector from '../../redux/hooks';
import { useDispatch } from 'react-redux';

interface MatchParams {
  keywords: string;
}

const SearchPage: FC = () => {
  const { keywords } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((s) => s.productSearch.error);
  const pagination = useSelector((s) => s.productSearch.pagination);
  const productList = useSelector((s) => s.productSearch.data);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }));
  };

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
    return <div>網站出錯：{error}</div>;
  }

  if (!productList) {
    return <h1>沒有資料</h1>;
  }

  return (
    <MainLayout>
      {/* 分類過濾器 */}
      <div className={styles['product-list-container']}>
        <FilterArea />
      </div>
      {/* 產品列表  */}
      <div className={styles['product-list-container']}>
        <ProductList data={productList} paging={pagination} onPageChange={onPageChange} />
      </div>
    </MainLayout>
  );
};

export { SearchPage };
