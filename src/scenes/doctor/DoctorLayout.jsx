import AppLayout from "@/components/AppLayout";
import MainLayout from "@/components/MainLayout";
import DoctorSidebar from "./DoctorSidebar";

function DoctorLayout() {
  return (
    <AppLayout>
      <DoctorSidebar />
      <MainLayout />
    </AppLayout>
  );
}

export default DoctorLayout;
