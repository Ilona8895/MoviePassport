type ErrorMessageTypes = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageTypes) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
