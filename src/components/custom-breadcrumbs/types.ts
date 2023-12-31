// @mui
import { BreadcrumbsProps } from '@mui/material';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string | React.ReactElement<any>;
  href?: string;
  icon?: React.ReactElement;
};

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  heading?: string | React.ReactElement<any>;
  moreLink?: string[];
  activeLast?: boolean;
  action?: React.ReactNode;
  links: BreadcrumbsLinkProps[];
}
