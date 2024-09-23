function Error({ message }) {
  return message ? (
    <p className="text-red-500 text-sm mt-2">{message}</p>
  ) : null;
}

export default Error;
