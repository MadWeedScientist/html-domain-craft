import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { CloudUpload, Send, X } from "lucide-react"

interface SubmitPageProps {
  onSuccess: () => void
}

export const SubmitPage = ({ onSuccess }: SubmitPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const limitedFiles = files.slice(0, 5)
    
    setImages(limitedFiles)
    
    // Create previews
    const previews: string[] = []
    limitedFiles.forEach((file) => {
      if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
        const reader = new FileReader()
        reader.onload = (e) => {
          previews.push(e.target?.result as string)
          if (previews.length === limitedFiles.length) {
            setImagePreviews([...previews])
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImages(newImages)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (description.length < 50) {
      toast({
        title: "Description too short",
        description: "Please provide a more detailed description (minimum 50 characters)",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Convert images to base64
      const imagePromises = images.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
      })
      
      const imageResults = await Promise.all(imagePromises)
      
      // Save to Supabase
      const { error } = await supabase
        .from('business_profiles')
        .insert([
          {
            business_name: businessName,
            email: email,
            description: description,
            images: imageResults
          }
        ])
      
      if (error) throw error
      
      // Reset form
      setBusinessName("")
      setEmail("")
      setDescription("")
      setImages([])
      setImagePreviews([])
      if (fileInputRef.current) fileInputRef.current.value = ""
      
      toast({
        title: "Profile Submitted!",
        description: "Thank you for submitting your business profile. We'll review it shortly."
      })
      
      onSuccess()
      
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: "Submission Error",
        description: "There was an error submitting your profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-4">Submit Your Business Profile</CardTitle>
          <p className="text-muted-foreground">Share your business story and showcase what makes you unique</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="Enter your business name"
                className="mt-2"
              />
            </div>

            {/* Contact Email */}
            <div>
              <Label htmlFor="email">Contact Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="mt-2"
              />
            </div>

            {/* Business Description */}
            <div>
              <Label htmlFor="description">Business Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="Tell us about your business, services, and what makes you unique..."
                className="mt-2 resize-vertical"
              />
              <p className="text-sm text-muted-foreground mt-1">Minimum 50 characters</p>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="images">Business Images</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label htmlFor="images" className="cursor-pointer">
                  <CloudUpload className="text-muted-foreground w-12 h-12 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Click to upload images or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 5MB each (max 5 images)</p>
                </label>
              </div>
              
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="image-preview border border-border rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 p-0 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-lg font-semibold"
                size="lg"
              >
                {isSubmitting ? (
                  <>Loading...</>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}