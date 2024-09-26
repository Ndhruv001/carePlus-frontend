import axiosInstance from "@/lib/config/axiosInstance"; 

async function downloadSynopsis() {
  try {
    const response = await axiosInstance.get("/admin/reports/download-synopsis", {
      responseType: "blob", // This ensures that the response is a file
    });

    // Create a link to download the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf'); // Set the name of the file
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link); // Cleanup after download
  } catch (error) {
    console.error("Error downloading the report:", error);
  }
};

export default downloadSynopsis;
