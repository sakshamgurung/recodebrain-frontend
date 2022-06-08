import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });
	}

	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="mt-8 m-auto max-w-[1200px] text-center">
					<h2 className="text-xl font-medium">Oops, there is an error!</h2>
					<button
						className="px-20 py-3 mt-4 text-lg font-semibold bg-green-600 rounded-md text-slate-100"
						type="button"
						onClick={() => {
							this.setState({ hasError: false });
							this.props.router.reload();
						}}
					>
						Reload
					</button>
				</div>
			);
		}

		// Return children components in case of no error
		return this.props.children;
	}
}

export default ErrorBoundary;
