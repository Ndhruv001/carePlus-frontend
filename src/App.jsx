import { Route, Routes } from "react-router-dom";

// SCENES
import {
  AboutUs,
  ContactUs,
  LandingPage,
  Login,
  NotFound,
  PatientRegistration,
  DoctorRegistration,
} from "@/scenes";

// PATIENT
import {
  PatientLayout,
  PatientDoctorProfile,
  PatientNotifications,
  PatientMedicalRecords,
  PatientBookAppointments,
  PatientPrescriptions,
  PatientAppointments,
} from "@/scenes/patient";

// DOCTOR
import {
  DoctorLayout,
  DoctorPatientsList,
  DoctorNotifications,
  DoctorProfile,
  DoctorAddPrescription,
  DoctorActivePrescriptions,
  DoctorMedicalRocordsAccess,
  DoctorTodaysAppointments,
  DoctorAppointmentsManagement,
  DoctorOnePatientRecordsAccess,
} from "@/scenes/doctor";

// ADMIN
import {
  AdminLayout,
  AdminNotifications,
  AdminReports,
  AdminSetting,
  AdminUserManagement,
  AdminAnalytics,
  AdminDoctorProfile,
  AdminAppointmentsOverview,
} from "@/scenes/admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route path="/doctor-registration" element={<DoctorRegistration />} />

      {/* PATIENT ROUTES */}
      <Route path="/patient" element={<PatientLayout />}>
        <Route path="" element={<PatientBookAppointments />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route
          path="doctor-profile/:doctorId"
          element={<PatientDoctorProfile />}
        />
        <Route path="notifications" element={<PatientNotifications />} />
        <Route
          path="notifications/:notificationId"
          element={<PatientNotifications />}
        />
        <Route path="medical-records" element={<PatientMedicalRecords />} />
        <Route path="prescriptions" element={<PatientPrescriptions />} />
      </Route>

      {/* DOCTOR ROUTES */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route path="" element={<DoctorTodaysAppointments />} />
        <Route
          path="appointments-management"
          element={<DoctorAppointmentsManagement />}
        />
        <Route path="patients-list" element={<DoctorPatientsList />} />
        <Route
          path="medical-records-access"
          element={<DoctorMedicalRocordsAccess />}
        />
        <Route
          path="medical-records-access/:patientId"
          element={<DoctorOnePatientRecordsAccess />}
        />
        <Route
          path="active-prescriptions"
          element={<DoctorActivePrescriptions />}
        />
        <Route path="add-prescriptions" element={<DoctorAddPrescription />} />
        <Route path="notifications" element={<DoctorNotifications />} />
        <Route
          path="notifications/:notificationId"
          element={<DoctorNotifications />}
        />
        <Route path="profile" element={<DoctorProfile />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<AdminAnalytics />} />
        <Route
          path="appointments-overview"
          element={<AdminAppointmentsOverview />}
        />
        <Route path="user-management" element={<AdminUserManagement />} />
        <Route
          path="user-management/doctor-profile/:doctorId"
          element={<AdminDoctorProfile />}
        />
        <Route path="reports" element={<AdminReports />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route
          path="notifications/:notificationId"
          element={<AdminNotifications />}
        />
        <Route path="setting" element={<AdminSetting />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
