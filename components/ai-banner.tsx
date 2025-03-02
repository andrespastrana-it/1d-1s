import { Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AIBanner() {
  return (
    <Alert variant="default" className="bg-primary/10 border-primary/20 mb-6">
      <Info className="h-4 w-4" />
      <AlertTitle>AI-Generated Stories</AlertTitle>
      <AlertDescription>
        The stories on Daily Tales are crafted using artificial intelligence but represent authentic narratives and
        experiences. Each story is curated to provide meaningful and engaging content.
      </AlertDescription>
    </Alert>
  )
}

