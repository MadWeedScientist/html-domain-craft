import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase, type BusinessProfile } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { LogOut, Trash2, Trash, Inbox } from "lucide-react"

interface AdminPageProps {
  onLogout: () => void
}

export const AdminPage = ({ onLogout }: AdminPageProps) => {
  const [submissions, setSubmissions] = useState<BusinessProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const loadSubmissions = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error('Error loading submissions:', error)
      toast({
        title: "Error",
        description: "Error loading submissions. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return
    
    try {
      const { error } = await supabase
        .from('business_profiles')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      await loadSubmissions()
      toast({
        title: "Deleted",
        description: "Submission deleted successfully."
      })
    } catch (error) {
      console.error('Error deleting submission:', error)
      toast({
        title: "Error",
        description: "Error deleting submission. Please try again.",
        variant: "destructive"
      })
    }
  }

  const clearAllSubmissions = async () => {
    if (!confirm('Are you sure you want to delete ALL submissions? This cannot be undone.')) return
    
    try {
      const { error } = await supabase
        .from('business_profiles')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
      
      if (error) throw error
      
      await loadSubmissions()
      toast({
        title: "Cleared",
        description: "All submissions have been deleted."
      })
    } catch (error) {
      console.error('Error clearing submissions:', error)
      toast({
        title: "Error",
        description: "Error clearing submissions. Please try again.",
        variant: "destructive"
      })
    }
  }

  const openImageModal = (src: string) => {
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
    modal.innerHTML = `
      <div class="max-w-4xl max-h-screen p-4 relative">
        <img src="${src}" alt="Full size image" class="max-w-full max-h-full object-contain rounded">
        <button class="absolute top-4 right-4 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-xl font-bold">
          ×
        </button>
      </div>
    `
    
    const closeBtn = modal.querySelector('button')
    closeBtn?.addEventListener('click', () => modal.remove())
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove()
    })
    
    document.body.appendChild(modal)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn')
    onLogout()
  }

  useEffect(() => {
    loadSubmissions()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <Card>
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Business Profile Submissions</h2>
              <p className="text-muted-foreground mt-2">Manage and review submitted business profiles</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-3 py-1">
                {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="font-medium"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button
                onClick={clearAllSubmissions}
                variant="destructive"
                className="font-medium"
              >
                <Trash className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="text-muted-foreground w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl text-muted-foreground mb-2">No submissions yet</h3>
              <p className="text-muted-foreground">Business profile submissions will appear here</p>
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => {
                const dateFormatted = new Date(submission.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })

                return (
                  <Card key={submission.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{submission.business_name}</h3>
                          <p className="text-muted-foreground">{submission.email}</p>
                          <p className="text-sm text-muted-foreground mt-1">Submitted: {dateFormatted}</p>
                        </div>
                        <Button
                          onClick={() => deleteSubmission(submission.id)}
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-foreground mb-2">Description:</h4>
                        <p className="text-muted-foreground leading-relaxed">{submission.description}</p>
                      </div>
                      
                      {submission.images && submission.images.length > 0 && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Images ({submission.images.length}):</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {submission.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Business image ${index + 1}`}
                                className="w-full h-24 object-cover rounded border border-border cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => openImageModal(img)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}