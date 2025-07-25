import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/integrations/supabase/client"
import { Lock, LogIn } from "lucide-react"

interface AdminLoginPageProps {
  onLoginSuccess: () => void
}

export const AdminLoginPage = ({ onLoginSuccess }: AdminLoginPageProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      // Verify admin credentials against database
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single()
      
      if (error || !data) {
        throw new Error('Invalid credentials')
      }
      
      // Simple password verification (in production, use proper hashing)
      console.log('Expected hash:', btoa(password), 'Actual hash:', data.password_hash)
      if (data.password_hash === btoa(password)) {
        sessionStorage.setItem('adminLoggedIn', 'true')
        onLoginSuccess()
        setEmail("")
        setPassword("")
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Invalid credentials. Please try again.')
      setPassword("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 fade-in">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Lock className="text-muted-foreground w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold mb-2">Admin Access</CardTitle>
          <p className="text-muted-foreground">Enter your credentials to access the admin panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="adminEmail">Email Address</Label>
              <Input
                id="adminEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="adminPassword">Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="mt-2"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg font-semibold"
              size="lg"
            >
              {isLoading ? (
                <>Signing In...</>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}