import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom"; // NavLink for linking and useParams for reading URL parameters
import axiosInstance from "@/lib/config/axiosInstance";
import DataContainer from "@/components/DataContainer";
import Container from "@/components/Container";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import H4 from "@/components/H4";

function DoctorNotifications() {
  const queryClient = useQueryClient();
  const { notificationId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctor-notifications"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor/notifications/list");
      return response.data.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (id) =>
      axiosInstance.post(`/doctor/notifications/mark-as-read`, id),
    onSuccess: () => {
      queryClient.invalidateQueries("doctor-notifications");
    },
  });

  function handleMarkAsRead(data) {
    if (!data.is_read) {
      mutate({ id: data.id });
    }
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorResponse error={error} />;
  }

  if (notificationId) {
    const selectedNotification = data.find(
      (item) => item.id === parseInt(notificationId)
    );

    if (!selectedNotification) {
      return <p>Notification not found.</p>;
    }

    return (
      <Container>
        <button
          onClick={() => window.history.back()}
          className="text-blue-500 hover:underline"
        >
          ← Back to Notifications
        </button>

        <div className="mt-4">
          <H4>{selectedNotification.title}</H4>
          <p className="text-gray-500">{selectedNotification.date}</p>
          <p className="mt-2">{selectedNotification.message}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {data.length > 0 ? (
        data.map((item) => (
          <NavLink
            key={item.id}
            to={`${item.id}`}
            className="block mb-4"
            onClick={() => handleMarkAsRead(item)}
          >
            <DataContainer>
              <div className="flex justify-between items-center">
                <H4>{item.title}</H4>
                <p className="text-gray-500">{item.date}</p>
              </div>
              <p
                className={`line-clamp-1 ${!item.is_read ? "text-blue-500" : "text-gray-500"}`}
              >
                {item.message}
              </p>
            </DataContainer>
          </NavLink>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          There is no data available.
        </p>
      )}
    </Container>
  );
}

export default DoctorNotifications;
