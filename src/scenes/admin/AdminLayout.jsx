import AppLayout from "@/components/AppLayout";
import MainLayout from "@/components/MainLayout";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <AppLayout>
      <AdminSidebar />
      <MainLayout />
    </AppLayout>
  );
}

export default AdminLayout;
