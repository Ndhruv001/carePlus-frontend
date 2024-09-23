import SidebarLayout from "@/components/SidebarLayout";
import SidebarItem from "@/components/SidebarItem";
import {
  CalendarDaysIcon,
  DocumentChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/solid";

function AdminSidebar() {
  return (
    <SidebarLayout>
      <SidebarItem path="appointments-overview">
        <CalendarDaysIcon width={20} />
        <span>Appointments Overview</span>
      </SidebarItem>

      <SidebarItem path="user-management">
        <UsersIcon width={20} />
        <span>User Management</span>
      </SidebarItem>

      <SidebarItem path="reports">
        <DocumentChartBarIcon width={20} />
        <span>Reports</span>
      </SidebarItem>

      <SidebarItem path="notifications">
        <BellIcon width={20} />
        <span>Notifications</span>
      </SidebarItem>

      <SidebarItem path="setting">
        <Cog6ToothIcon width={20} />
        <span>Setting</span>
      </SidebarItem>
    </SidebarLayout>
  );
}

export default AdminSidebar;
