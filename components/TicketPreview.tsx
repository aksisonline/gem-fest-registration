export default function TicketPreview() {
  return (
    <div className="bg-white border-4 border-primary rounded-lg p-6 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">GEM Fest 2024</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">Date: August 30, 2024</p>
          <p className="text-sm">Time: 3:30 PM</p>
          <p className="text-sm">Venue: Dental Parking</p>
        </div>
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500">QR Code</span>
        </div>
      </div>
    </div>
  )
}

