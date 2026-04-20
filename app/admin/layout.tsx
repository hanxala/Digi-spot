import Link from "next/link";
import { Camera, LayoutDashboard, Package, Settings, Users } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-text overflow-hidden pl-16 md:pl-0">
      {/* Sidebar */}
      <aside className="w-64 border-r border-surface bg-card flex-col flex shrink-0 fixed md:relative h-screen -ml-64 md:ml-0 z-50">
        <div className="h-16 border-b border-surface flex items-center px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Camera className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-lg">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors">
            <ShoppingCartIcon className="w-5 h-5" /> Orders
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors">
            <Users className="w-5 h-5" /> Users
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-surface flex items-center gap-3">
          <UserButton />
          <div className="text-sm">
            <p className="font-medium text-text">Administrator</p>
            <p className="text-xs text-muted">Internal Access</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background/50">
        <header className="h-16 border-b border-surface bg-card flex items-center px-8 z-40 sticky top-0">
          <h2 className="font-heading font-semibold text-lg text-text">Digi Spot Backoffice</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

// Temporary icon to avoid large imports
function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
