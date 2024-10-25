import React, { FC } from 'react';
import { Input as ShadcnInput } from '@shadcn/ui';
import { InputProps } from '../../types/shadcn-component.type';

const Input: FC<Readonly<InputProps>> = ({ ...props }) => {
  return <ShadcnInput {...props} />;
};

export default Input;