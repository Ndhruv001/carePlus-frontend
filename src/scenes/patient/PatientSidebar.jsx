import SidebarLayout from "@/components/SidebarLayout";
import SidebarItem from "@/components/SidebarItem";
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  BellIcon,
} from "@heroicons/react/24/solid";

function PatientSidebar() {
  return (
    <SidebarLayout>
      <SidebarItem path="appointments">
        <CalendarDaysIcon width={20} />
        <span>Appointments</span>
      </SidebarItem>

      <SidebarItem path="prescriptions">
        <ClipboardDocumentCheckIcon width={20} />
        <span>Prescriptions</span>
      </SidebarItem>

      <SidebarItem path="medical-records">
        <DocumentTextIcon width={20} />
        <span>Medical Records</span>
      </SidebarItem>

      <SidebarItem path="notifications">
        <BellIcon width={20} />
        <span>Notifications</span>
      </SidebarItem>
    </SidebarLayout>
  );
}

export default PatientSidebar;
