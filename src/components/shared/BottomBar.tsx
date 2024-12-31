import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { INITIAL_USER, useUserContext } from '@/context/AuthContext';
import { Loader } from 'lucide-react';
import { INavLink } from '@/types';
import { bottombarLinks, sidebarLinks } from '../../constants';

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link)=>{
        const isActive=pathname===link.route;
        return(
          <Link
          key={`bottombar-${link.label}`}
          to={link.route}
          className={
            `${isActive && 'rounded-[10px] bg-primary-500'} flex-center flex-col gap-1 p-2 transition`}>
              <img
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className={`${isActive && 'invert-white'}`}
              />
              <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        )
      })}
    </section>
  );
};

export default BottomBar;