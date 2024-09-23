import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axiosInstance";
import DataContainer from "@/components/DataContainer";
import Container from "@/components/Container";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import H4 from "@/components/H4";
import { useParams } from "react-router-dom";

function DoctorOnePatientRecordsAccess() {
  const { patientId } = useParams();
  console.log("🚀 ~ DoctorOnePatientRecordsAccess ~ patientId:", patientId);
  const [expandedRecords, setExpandedRecords] = useState({});
  const [showButtons, setShowButtons] = useState({});
  const detailsRefs = useRef({});

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctor-one-patient-records-access"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/doctor/medical-records/list/${patientId}`
      );
      return response.data.data;
    },
  });

  useEffect(() => {
    data?.forEach((item) => {
      const element = detailsRefs.current[item.id];
      if (element && element.scrollHeight > element.clientHeight) {
        setShowButtons((prev) => ({ ...prev, [item.id]: true }));
      }
    });
  }, [data]);

  const toggleDetails = (id) => {
    setExpandedRecords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorResponse error={error} />;
  }

  return (
    <Container>
      <button
        onClick={() => window.history.back()}
        className="text-blue-500 hover:underline"
      >
        ← Back
      </button>
      {data &&
        data.map((item) => {
          const isExpanded = expandedRecords[item.id];

          return (
            <DataContainer key={item.id}>
              <H4>{item.title}</H4>
              <p className="font-semibold">
                Date: <span className="font-normal">{item.date}</span>
              </p>
              <p className="font-semibold">
                Details:{" "}
                <span
                  className={`font-normal ${!isExpanded ? "line-clamp-1" : ""}`}
                  ref={(el) => (detailsRefs.current[item.id] = el)}
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    transition: "height 0.3s ease",
                    height: isExpanded
                      ? `${detailsRefs.current[item.id]?.scrollHeight}px`
                      : "25px",
                  }}
                >
                  {item.details}
                </span>
              </p>
              {showButtons[item.id] && (
                <button
                  onClick={() => toggleDetails(item.id)}
                  className="text-blue-500 hover:underline ml-2"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </DataContainer>
          );
        })}
    </Container>
  );
}

export default DoctorOnePatientRecordsAccess;
