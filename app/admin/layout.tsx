import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is admin (you can add admin role to your User model)
  if (!session?.user?.email?.includes("admin")) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Velmora Admin</h2>
        </div>

        <nav className="mt-6">
          <Link
            href="/admin"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Orders
          </Link>
          <Link
            href="/admin/customers"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Customers
          </Link>
          <Link
            href="/admin/analytics"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Analytics
          </Link>
          <Link
            href="/admin/settings"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <div>
              <span className="text-gray-600">{session.user.name}</span>
            </div>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
