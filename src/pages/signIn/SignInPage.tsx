import React from 'react';
import { UserLayout } from '../../layouts/userLayout';
import { SignInForm } from './SignInForm';

const SignInPage: React.FC = () => {
  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  );
};

export { SignInPage };
