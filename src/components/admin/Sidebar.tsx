import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: '📊' },
  { label: 'Menu Items', path: '/admin/menu-items', icon: '🍕' },
  { label: 'Categories', path: '/admin/categories', icon: '📁' },
  { label: 'Promotions', path: '/admin/promotions', icon: '🏷️' },
  { label: 'Testimonials', path: '/admin/testimonials', icon: '⭐' },
  { label: 'Shop Info', path: '/admin/shop-info', icon: '🏪' },
  { label: 'Home Content', path: '/admin/home-content', icon: '🏠' },
  { label: 'About Content', path: '/admin/about-content', icon: '📄' },
  { label: 'Contact Messages', path: '/admin/contact-messages', icon: '✉️' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-4 border-b border-gray-800">
        <Link to="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">BN</span>
          </div>
          <span className="font-bold">Admin Panel</span>
        </Link>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800 mt-auto">
        <Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm">Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}