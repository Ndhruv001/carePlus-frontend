function convertPathToHeaderName(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "";

  const lastSegment = segments[segments.length - 1];

  const header = lastSegment
    .split("-")
    .filter(Boolean)
    .map((subHeader) => subHeader.charAt(0).toUpperCase() + subHeader.slice(1))
    .join(" ");

  return header;
}

export default convertPathToHeaderName;
