import Container from "./Container";

function ProfileLayout({ profileImage, children }) {
  return (
    <Container>
      <div className="mb-3 border-b-2 border-gray-300 pb-5">
        <img
          src={profileImage}
          alt=""
          height={100}
          width={100}
          className="rounded-full"
        />
      </div>
      {children}
    </Container>
  );
}

export default ProfileLayout;
