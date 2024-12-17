import RegistrationForm from '@/components/RegistrationForm'
import TicketPreview from '@/components/TicketPreview'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">GEM Fest Registration</h1>
      <div className="max-w-2xl mx-auto">
        <TicketPreview />
        <RegistrationForm />
      </div>
    </main>
  )
}

