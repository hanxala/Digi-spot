import { Package, LineChart, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-2xl border border-surface shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted text-sm font-medium mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold font-heading text-text">₹37,54,231</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-sm text-green-500 font-medium">+12.5% from last month</p>
        </div>
        
        <div className="bg-card p-6 rounded-2xl border border-surface shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted text-sm font-medium mb-1">Active Listings</p>
              <h3 className="text-2xl font-bold font-heading text-text">142</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-primary font-medium">+4 new this week</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-surface shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted text-sm font-medium mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold font-heading text-text">892</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <LineChart className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-sm text-blue-500 font-medium">+8.1% from last month</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-surface shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted text-sm font-medium mb-1">Total Users</p>
              <h3 className="text-2xl font-bold font-heading text-text">2,401</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-sm text-purple-500 font-medium">+24 new this week</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-surface shadow-sm p-6 min-h-[400px]">
        <h3 className="text-lg font-heading font-bold mb-4">Recent Sales</h3>
        <p className="text-muted text-sm text-center py-20">Your recent transactions will appear here.</p>
      </div>
    </div>
  );
}
