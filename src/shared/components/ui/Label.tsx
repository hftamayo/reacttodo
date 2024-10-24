import React, { FC, LabelHTMLAttributes } from 'react';
import { Label as ShadcnLabel } from '@shadcn/ui';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label: FC<LabelProps> = ({ children, ...props }) => {
  return <ShadcnLabel {...props}>{children}</ShadcnLabel>;
};

export default Label;
