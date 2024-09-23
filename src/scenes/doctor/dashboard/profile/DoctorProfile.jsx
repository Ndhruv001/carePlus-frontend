import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axiosInstance";
import Container from "@/components/Container";
import ErrorResponse from "@/components/ErrorResponse";
import LoadingPage from "@/components/LoadingPage";

function DoctorProfile() {
  const {
    data: doctorProfile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["doctor-profile"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/doctor/profile/get`);
      return response.data.data;
    },
  });

  if (isLoading) <LoadingPage />;

  if (isError) <ErrorResponse error={error} />;

  return (
    <Container>
      <div className=" pl-10 flex flex-col md:flex-row">
        {/* Profile Picture */}
        <div className="md:w-1/3 flex flex-col items-center">
          <img
            src={doctorProfile?.profile_picture}
            alt="Doctor Profile"
            className="w-48 h-48 rounded-full object-cover"
          />
        </div>

        {/* Doctor Basic Information */}
        <div className="md:w-2/3 p-4">
          <h2 className="text-2xl font-semibold mb-2">{doctorProfile?.name}</h2>
          <p>
            <span className="font-medium">Gender:</span> {doctorProfile?.gender}
          </p>
          <p>
            <span className="font-medium">Age:</span> {doctorProfile?.age}
          </p>
          <p>
            <span className="font-medium">Experience:</span>{" "}
            {doctorProfile?.experience}
          </p>
          <p>
            <span className="font-medium">Education:</span>{" "}
            {doctorProfile?.education_detail}
          </p>
        </div>
      </div>

      {/* Editable Bio Section */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Bio</h3>
        <p>{doctorProfile?.bio}</p>
      </div>
    </Container>
  );
}

export default DoctorProfile;
