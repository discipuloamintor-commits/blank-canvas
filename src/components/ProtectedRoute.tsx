import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isLoading: loading, isAdmin, isEditor } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/entrar" state={{ from: location }} replace />;
  }

  // Check if user has required permissions
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Allow admins and editors to access the admin panel
  if (!isAdmin && !isEditor) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
