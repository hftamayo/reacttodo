import React, { FC } from 'react';
import { Button as ShadcnButton } from '@shadcn/ui';
import { ButtonProps } from '../../types/shadcn-component.type';

const Button: FC<Readonly<ButtonProps>> = ({ children, ...props }) => {
  return <ShadcnButton {...props}>{children}</ShadcnButton>;
};

export default Button;
