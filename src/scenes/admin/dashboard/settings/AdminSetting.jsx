import { useState } from "react";
import DataContainer from "@/components/DataContainer";
import Container from "@/components/Container";
import Button from "@/components/Button";
import AddNewAdmin from "./AddNewAdmin";

function AdminSetting() {
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);

  function handleAddNewAdmin() {
    setShowAddAdminForm(true);
  }

  function handleCloseForm() {
    setShowAddAdminForm(false);
  }

  return (
    <Container>
      <DataContainer>
        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm mb-2 text-black dark:text-white">
          <span className="font-semibold ">Enable Notifications</span>
          <input
            type="checkbox"
            defaultChecked={true}
            className="form-checkbox h-5 w-5 text-green-600"
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm mb-2 text-black dark:text-white">
          <span className="font-semibold">Add New Admin</span>
          <Button color="green" onClick={handleAddNewAdmin}>
            Add New Admin
          </Button>
        </div>
      </DataContainer>

      {/* Add New Admin form */}
      <div className="flex justify-center items-center">
        <AddNewAdmin isOpen={showAddAdminForm} onClose={handleCloseForm} />
      </div>
    </Container>
  );
}

export default AdminSetting;
