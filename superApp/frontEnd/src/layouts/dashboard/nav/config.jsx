// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Aplikasi A',
    path: 'http://localhost:3004',
    icon: <img src="../../../logo-telkom.png" style={{ width: '30px', height: '30px' }}/>,
    newTab:true
  },
  {
    title: 'Aplikasi B',
    path: 'http://localhost:3003',
    icon: <img src="../../../kemenkeu.png" style={{ width: '30px', height: '30px' }}/>,
    newTab:true
  },
  {
    title: 'Aplikasi C',
    path: '/',
    icon: <img src="../../../tokopedia.png" style={{ width: '30px', height: '30px' }}/>,
    newTab:false
  },
  {
    title: 'Aplikasi D',
    path: '/',
    icon: <img src="../../../pln.png" style={{ width: '30px', height: '30px' }}/>,
    newTab:false
  },
];


const navConfig5 = [
  {
    title: 'User Management',
    path: '/app',
    icon: icon('solar-user-check'),
    newTab:false
  },
  {
    title: 'Role Management',
    path: '/role',
    icon: icon('ic_lock'),
    newTab:false
  },

];

const navConfig4 = [
  {
    title: 'Panduan',
    path: '/dashboard/user',
    icon: icon('help-outline'),
    newTab:false
  },
];

const navConfig3 = [
  {
    title: 'API Super APP',
    path: '/api',
    icon: icon('home-bold-duotone'),
    newTab:false
  },
];

export default navConfig;
export { navConfig3, navConfig4, navConfig5};
