import DataContainer from "@/components/DataContainer";
import Container from "@/components/Container";
import Button from "@/components/Button";
import H4 from "@/components/H4";
import downloadSynopsis from "./downloadSynopsis";

function AdminReports() {
  return (
    <Container>
      <DataContainer>
        <H4>Synopsis</H4>
        <Button color="green" onClick={downloadSynopsis}>Download Synopsis</Button>
      </DataContainer>

      <DataContainer>
        <H4>Monthly Usage Report - August 2024</H4>
        <p>Total Appointments: 120</p>
        <p>Total Users: 250</p>
        <Button>View Details</Button>
      </DataContainer>
    </Container>
  );
}

export default AdminReports;
