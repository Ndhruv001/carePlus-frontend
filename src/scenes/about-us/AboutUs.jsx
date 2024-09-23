function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-6">
        Welcome to CarePlus! We are dedicated to providing quality healthcare
        services to our community. Our platform connects patients with
        experienced doctors and healthcare professionals to ensure you receive
        the best care possible. Our mission is to simplify healthcare management
        through innovative solutions, making it easy for you to schedule
        appointments, manage your health records, and more.
      </p>
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        At CarePlus, we believe in patient-centered care, innovation, and
        excellence. Our team is committed to creating a platform that is
        reliable, secure, and user-friendly. Thank you for choosing us as your
        trusted healthcare partner.
      </p>

      {/* Aligned to the right, immediately after the main content */}
      <div className=" text-center mt-4 ">
        <p className="text-gray-700">- Dhruv Shukla</p>
        <p className="text-gray-600">Director & CEO of CarePlus</p>
      </div>
    </div>
  );
}

export default AboutUs;
