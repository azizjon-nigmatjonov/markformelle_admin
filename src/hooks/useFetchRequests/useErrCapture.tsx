export const useErrCapture = () => {
  const errorCaptureFn = (err: { status: number }) => {
    switch (err.status) {
      case 404:
        return "not_found";
      default:
        return "error";
    }
  };

  return { errorCaptureFn };
};
