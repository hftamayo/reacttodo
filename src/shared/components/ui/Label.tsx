import React, { FC } from 'react';
import { Label as ShadcnLabel } from '@shadcn/ui';
import { LabelProps } from '../../types/shadcn-component.type';

const Label: FC<Readonly<LabelProps>> = ({ children, ...props }) => {
  return <ShadcnLabel {...props}>{children}</ShadcnLabel>;
};

export default Label;
