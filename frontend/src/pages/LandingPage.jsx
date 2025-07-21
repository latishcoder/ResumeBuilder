import React, { useContext, useState } from 'react'
import { LayoutTemplate, Menu, X } from 'lucide-react';
import { landingPageStyles } from '../assets/dummystyle'
import { UserContext } from '../context/UserContext';
import { UserProvider } from '../provider/UserProvider';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from '../components/Cards';

const LandingPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <div className={landingPageStyles.container}>
      {/* Header */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
          </div>
          <span className={landingPageStyles.logoText}>Resume Builder</span>
        </div>
        {/* Mobile menu btn*/}
        <button className={landingPageStyles.mobileMenuButton}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} >
          {mobileMenuOpen ?
          <X size={24}  className={landingPageStyles.mobileMenuIcon} /> :
          <Menu size={24} className={landingPageStyles.mobileMenuIcon} />}

        </button>

        {/* DESKTOP NAVIGATION */}
        <div className='hidden md:flex items-center'>
          {user ? (

            <ProfileCard />

          ) : (
            <button className={landingPageStyles.desktopAuthButton} 
            onClick={() => setOpenAuthModal(true)}></button>
          )}
        </div>
      </header>
    </div>
  )
}

export default LandingPage