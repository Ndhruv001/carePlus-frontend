import Container from "./Container";

function LoadingPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-fit max-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
        <p className="text-black text-lg dark:text-white">
          Loading, please wait...
        </p>
      </div>
    </Container>
  );
}

export default LoadingPage;
