
import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useCurrentUserPermissions } from '@/hooks/useAdminPermissions';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, Book, Package, Video, BarChart3, ArrowLeft, Settings } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const { data: permissions, isLoading: permissionsLoading } = useCurrentUserPermissions();
  const location = useLocation();

  console.log('AdminLayout - currentUser:', currentUser?.id);
  console.log('AdminLayout - permissions:', permissions);
  console.log('AdminLayout - authLoading:', authLoading, 'permissionsLoading:', permissionsLoading);

  if (authLoading || permissionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    console.log('AdminLayout - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!permissions) {
    console.log('AdminLayout - User has no admin permissions, redirecting to home');
    return <Navigate to="/" replace />;
  }

  const hasAnyPermission = permissions.is_super_admin || 
    permissions.can_manage_users || 
    permissions.can_manage_products || 
    permissions.can_manage_recipes || 
    permissions.can_manage_videos || 
    permissions.can_manage_categories || 
    permissions.can_manage_orders;

  if (!hasAnyPermission) {
    console.log('AdminLayout - User has no valid permissions, redirecting to home');
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { 
      path: '/admin', 
      icon: BarChart3, 
      label: 'Tableau de bord',
      show: true
    },
    { 
      path: '/admin/users', 
      icon: Users, 
      label: 'Utilisateurs',
      show: permissions.can_manage_users || permissions.is_super_admin
    },
    { 
      path: '/admin/recipes', 
      icon: Book, 
      label: 'Recettes',
      show: permissions.can_manage_recipes || permissions.is_super_admin
    },
    { 
      path: '/admin/products', 
      icon: Package, 
      label: 'Produits',
      show: permissions.can_manage_products || permissions.is_super_admin
    },
    { 
      path: '/admin/videos', 
      icon: Video, 
      label: 'Vidéos',
      show: permissions.can_manage_videos || permissions.is_super_admin
    },
    { 
      path: '/admin/categories', 
      icon: Settings, 
      label: 'Catégories',
      show: permissions.can_manage_categories || permissions.is_super_admin
    },
  ].filter(item => item.show);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar - Responsive */}
      <div className="w-full lg:w-80 bg-white shadow-lg min-h-screen lg:min-h-screen">
        <div className="p-4 lg:p-6">
          <div className="flex items-center mb-6 lg:mb-8">
            <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-orange-500 mr-2 lg:mr-3" />
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">Administration</h1>
              {permissions.is_super_admin && (
                <span className="text-xs text-orange-600 font-medium">Super Admin</span>
              )}
            </div>
          </div>
          
          <nav className="space-y-1 lg:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors text-sm lg:text-base ${
                    isActive 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-6 lg:mt-8 pt-4 border-t">
            <Link to="/">
              <Button variant="outline" className="w-full text-sm lg:text-base">
                <ArrowLeft className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                Retour au site
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive */}
      <div className="flex-1 p-4 lg:p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
