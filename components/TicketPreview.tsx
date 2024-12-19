export default function TicketPreview() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 border-4 border-primary rounded-2xl p-8 mb-8 shadow-xl max-w-md mx-auto">
      <h2 className="text-3xl font-extrabold text-primary text-center mb-6">
        GEM Fest 2024
      </h2>
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Date:</span> August 30, 2024
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Time:</span> 3:30 PM
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Venue:</span> Dental Parking
          </p>
        </div>
        <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center shadow-inner">
          <span className="text-gray-500 text-sm">QR Code</span>
        </div>
      </div>
    </div>
  );
}
