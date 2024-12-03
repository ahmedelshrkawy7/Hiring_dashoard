import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import SkipToMain from './skip-to-main'
import BottomNavBar from './BottomNavBar'
import { useLoading } from '@/context/LoadingContext'
import TopLoadingBar from './TopLoadingBar'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const AppShell = () => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const { isLoading } = useLoading()
  const [currentLang, setCurrentLang] = useState()
  const { i18n } = useTranslation()

  useEffect(() => {
    const currentLang = i18n.language || window.localStorage.i18nextLng || 'en'
    document.documentElement.lang = currentLang
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
    setCurrentLang(currentLang)
  console.log("currentLang", currentLang)

  }, [i18n.language])

  return (
    <>
      <TopLoadingBar isLoading={isLoading} />
      <div className='relative h-full overflow-hidden bg-background   '>
        <SkipToMain />
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
      id='content'
      className={`overflow-x-hidden pt-16 md:overflow-y-hidden md:pt-0 ${isCollapsed ? (currentLang === 'ar' ? 'mr-14' : 'ml-14') : (currentLang === 'ar' ? 'mr-64' : 'ml-64')} h-[90vh] md:h-full`}
    >
          <Outlet />
        </main>
        <div className='flex md:hidden '>
          <BottomNavBar />
        </div>
      </div>
    </>
  )
}
export default AppShell
