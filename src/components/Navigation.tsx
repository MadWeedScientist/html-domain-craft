import { Button } from "@/components/ui/button"
import { Home, Plus, Settings } from "lucide-react"

interface NavigationProps {
  currentPage: 'home' | 'submit' | 'admin' | 'adminLogin'
  onNavigate: (page: 'home' | 'submit' | 'admin' | 'adminLogin') => void
  isAdminLoggedIn: boolean
}

export const Navigation = ({ currentPage, onNavigate, isAdminLoggedIn }: NavigationProps) => {
  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      onNavigate('admin')
    } else {
      onNavigate('adminLogin')
    }
  }

  return (
    <nav className="bg-card shadow-sm border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SF</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Shake Finder</h1>
          </div>
          <div className="flex space-x-4">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => onNavigate('home')}
              className="font-medium"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant={currentPage === 'submit' ? 'default' : 'secondary'}
              onClick={() => onNavigate('submit')}
              className="font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Profile
            </Button>
            <Button
              variant={currentPage === 'admin' || currentPage === 'adminLogin' ? 'default' : 'ghost'}
              onClick={handleAdminClick}
              className="font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}