export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Organizer Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500">Total Events</div>
          <div className="text-2xl font-bold">--</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-bold">--</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Tickets Sold</div>
          <div className="text-2xl font-bold">--</div>
        </div>
      </div>
    </div>
  )
}


