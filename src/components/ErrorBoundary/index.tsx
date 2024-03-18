"use client";

import { enqueueSnackbar } from "notistack";
import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
    enqueueSnackbar({ message: error.message ?? "Something went wrong", variant: "error" });
  }

  render() {
    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   return this.props.fallback;
    // }

    return this.props.children;
  }
}

export default ErrorBoundary;
