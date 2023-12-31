// components
import Iconify from '@yourapp/src/components/iconify';
import Label from '@yourapp/src/components/label';
import SvgColor from '@yourapp/src/components/svg-color';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@yourapp/src/routes/paths';
import path from 'path';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Home Page',
        path: PATH_DASHBOARD.general.app,
        icon: <Iconify icon="ant-design:home-twotone" width={1} />,
      },
      {
        title: 'About me',
        path: PATH_DASHBOARD.profile,
        icon: <Iconify icon="mdi:administrator" width={1} />,
      },
    ],
  },
  {
    subheader: 'Daily life',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,

        children: [
          // { title: 'profile', path: PATH_DASHBOARD.user.profile },
          // { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'profile', path: PATH_DASHBOARD.user.account },
          { title: 'list', roles: ['admin'], path: PATH_DASHBOARD.user.list },
          { title: 'create', roles: ['admin'], path: PATH_DASHBOARD.user.new },
          { title: 'edit', roles: ['admin'], path: PATH_DASHBOARD.user.demoEdit },
        ],
      },
      {
        title: 'Todo list',
        path: PATH_DASHBOARD.dailylife.todo.root,
        icon: <Iconify icon="ant-design:book-outlined" width={1} />,
        children: [
          { title: 'List', path: PATH_DASHBOARD.dailylife.todo.list },
          { title: 'Create', path: PATH_DASHBOARD.dailylife.todo.create },
        ],
      },
      {
        title: 'Note',
        path: PATH_DASHBOARD.dailylife.note.root,
        icon: <Iconify icon="ant-design:file-filled" width={1} />,
      },
      {
        title: 'Library',
        path: PATH_DASHBOARD.dailylife.todo.root,
        icon: <Iconify icon="mdi:bookshelf" width={1} />,
        children: [
          { title: 'explore', path: PATH_DASHBOARD.library.list },
          { title: 'create', path: PATH_DASHBOARD.library.new },
          { title: 'edit', path: PATH_DASHBOARD.library.edit('123') },
          { title: 'detail', path: PATH_DASHBOARD.library.view('123') },
        ],
      },
      {
        title: 'Email',
        path: PATH_DASHBOARD.mail.all,
        icon: <Iconify icon="ri:mail-line" width={1} />,
      },
      {
        title: 'analytics',
        path: PATH_DASHBOARD.general.analytics,
        icon: <Iconify icon="ant-design:pie-chart-twotone" width={1} />,
      },
      {
        title: 'News',
        path: PATH_DASHBOARD.general.booking,
        icon: <Iconify icon="ant-design:global-outlined" width={1} />,
      },
      {
        title: 'budget',
        path: PATH_DASHBOARD.dailylife.budget,
        icon: <Iconify icon="ant-design:sketch-outlined" width={1} />,
      },
      {
        title: 'health',
        path: PATH_DASHBOARD.dailylife.health,
        icon: <Iconify icon="ri:mental-health-line" width={1} />,
      },
      {
        title: 'project',
        path: PATH_DASHBOARD.permissionDenied,
        icon: <Iconify icon="ri:projector-line" width={1} />,
      },
    ],
  },
  {
    subheader: 'Development',
    items: [
      {
        title: 'Components',
        path: PATH_PAGE.components,
        icon: <Iconify icon="uiw:component" width={1} />,
      },
    ],
  },
];

export default navConfig;
