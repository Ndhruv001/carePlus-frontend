import { NavLink } from "react-router-dom";

const COLUMNS = [
  {
    Header: "Patient Id",
    accessor: "patient_id",
  },
  {
    Header: "Name",
    accessor: "patient_name",
  },
  {
    Header: "Age",
    accessor: "patient_age",
  },
  {
    Header: "Contact",
    accessor: "patient_phone_number",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => (
      <div className="flex justify-center">
        <NavLink
          to={`/doctor/medical-records-access/${row.original.patient_id}`}
          className="text-white px-4 py-1 rounded mr-1 bg-green-500 hover:bg-green-600"
        >
          View
        </NavLink>
      </div>
    ),
  },
];

export { COLUMNS };
