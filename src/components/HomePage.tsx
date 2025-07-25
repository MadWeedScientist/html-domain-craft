import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CannabisLeafPattern } from "./CannabisLeafPattern"
import { ArrowRight, Upload, Edit, Check, Shield, Rocket, Smartphone, Heart } from "lucide-react"

interface HomePageProps {
  onGetStarted: () => void
}

export const HomePage = ({ onGetStarted }: HomePageProps) => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        <CannabisLeafPattern />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Shake Finder</h2>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            A simple platform where licensed cannabis businesses in New Mexico & Oklahoma can showcase their shake to processors
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            variant="secondary"
            className="text-lg font-semibold"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">How It Works</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to get your business profile submitted and reviewed
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="text-blue-600 dark:text-blue-400 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">1. Upload Photos</h4>
              <p className="text-muted-foreground leading-relaxed">
                Share high-quality images that showcase your shake!
              </p>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit className="text-primary w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">2. Tell Your Story</h4>
              <p className="text-muted-foreground leading-relaxed">
                Provide a detailed description of your business, contact, and inventory amounts.
              </p>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-purple-600 dark:text-purple-400 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">3. Private Review</h4>
              <p className="text-muted-foreground leading-relaxed">
                Your profile is submitted securely and reviewed privately by our team
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose Us</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy for businesses to share their story with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                <Shield className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Private & Secure</h4>
                <p className="text-muted-foreground">All submissions are kept private and only accessible by authorized buyers</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Rocket className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Quick & Easy</h4>
                <p className="text-muted-foreground">Simple form with intuitive design makes submission fast and straightforward</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                <Smartphone className="text-purple-600 dark:text-purple-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Mobile Friendly</h4>
                <p className="text-muted-foreground">Works perfectly on all devices - desktop, tablet, and mobile</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <Heart className="text-orange-600 dark:text-orange-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">No Cost</h4>
                <p className="text-muted-foreground">Completely free service for businesses to showcase their profiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}