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

  const handleNavigate = (page: Page) => {
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
        return <AdminLoginPage onLoginSuccess={handleAdminLogin} />
      case 'admin':
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
