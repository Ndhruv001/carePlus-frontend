import SidebarLayout from "@/components/SidebarLayout";
import SidebarItem from "@/components/SidebarItem";
import {
  CalendarDaysIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
  BellIcon,
} from "@heroicons/react/24/solid";

function DoctorSidebar() {
  return (
    <SidebarLayout>
      <SidebarItem path="appointments-management">
        <CalendarDaysIcon width={20} />
        <span>Appointments Management</span>
      </SidebarItem>

      <SidebarItem path="patients-list">
        <UserGroupIcon width={20} />
        <span>Patients List</span>
      </SidebarItem>

      <SidebarItem path="active-prescriptions">
        <ClipboardDocumentCheckIcon width={20} />
        <span>Active Prescriptions</span>
      </SidebarItem>

      <SidebarItem path="medical-records-access">
        <DocumentTextIcon width={20} />
        <span>Medical Records Access</span>
      </SidebarItem>

      <SidebarItem path="notifications">
        <BellIcon width={20} />
        <span>Notifications</span>
      </SidebarItem>

      <SidebarItem path="profile">
        <UserCircleIcon width={20} />
        <span>Profile</span>
      </SidebarItem>
    </SidebarLayout>
  );
}

export default DoctorSidebar;
