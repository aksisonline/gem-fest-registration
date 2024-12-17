import RegistrationForm from '@/components/RegistrationForm'
import TicketPreview from '@/components/TicketPreview'
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="container relative min-h-screen py-12 px-4 md:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            GEM Fest Registration
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Register for the most exciting festival of the year
          </p>
        </div>
        
        <Card className="p-6">
          <TicketPreview />
          <div className="mt-8">
            <RegistrationForm />
          </div>
        </Card>
      </div>
    </main>
  )
}

