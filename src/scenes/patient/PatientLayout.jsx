import AppLayout from "@/components/AppLayout";
import MainLayout from "@/components/MainLayout";
import PatientSidebar from "./PatientSidebar";

function PatientLayout() {
  return (
    <AppLayout>
      <PatientSidebar />
      <MainLayout />
    </AppLayout>
  );
}

export default PatientLayout;
