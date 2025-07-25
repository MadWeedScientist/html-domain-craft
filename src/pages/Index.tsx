import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { HomePage } from "@/components/HomePage"
import { SubmitPage } from "@/components/SubmitPage"
import { AdminLoginPage } from "@/components/AdminLoginPage"
import { AdminPage } from "@/components/AdminPage"

type Page = 'home' | 'submit' | 'admin' | 'adminLogin'

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => 
    sessionStorage.getItem('adminLoggedIn') === 'true'
  )

  console.log('Current page:', currentPage)
  console.log('Is admin logged in:', isAdminLoggedIn)

  const handleNavigate = (page: Page) => {
    console.log('Navigating to:', page)
    setCurrentPage(page)
  }

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true)
    setCurrentPage('admin')
  }

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false)
    setCurrentPage('home')
  }

  const handleSubmitSuccess = () => {
    setCurrentPage('home')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onGetStarted={() => setCurrentPage('submit')} />
      case 'submit':
        return <SubmitPage onSuccess={handleSubmitSuccess} />
      case 'adminLogin':
        console.log('Rendering AdminLoginPage')
        return <AdminLoginPage onLoginSuccess={handleAdminLogin} />
      case 'admin':
        console.log('Rendering AdminPage')
        return <AdminPage onLogout={handleAdminLogout} />
      default:
        return <HomePage onGetStarted={() => setCurrentPage('submit')} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
      />
      {renderCurrentPage()}
    </div>
  )
};

export default Index;
