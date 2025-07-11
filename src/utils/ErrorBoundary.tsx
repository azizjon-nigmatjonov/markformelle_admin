import React, { Component, ReactNode } from "react";
import WarningIcon from "@mui/icons-material/Warning";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true, error });
    console.error(error, info);
  }

  componentDidUpdate(_: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    // Set up auto-reload timer when error occurs
    if (this.state.hasError && !prevState.hasError) {
      setTimeout(() => {
        window.location.reload();
      }, 60000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center flex-col text-center text-[var(--black)] mt-20">
          <h1 className="text-3xl flex space-x-2 font-medium">
            <WarningIcon />
            <span>Произошла ошибка!</span>
          </h1>
          {/* <p className="text-[var(--gray)] mt-5 mb-10">
            Error: {this.state.error && this.state.error.toString()}
          </p> */}
          <div className="mt-5">
            <button onClick={() => location.reload()} className="custom-btn">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
