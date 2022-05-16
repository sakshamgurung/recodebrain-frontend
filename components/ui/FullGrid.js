function FullGrid({ children, className }) {
	return (
		<div className={`grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 ${className}`}>
			{children}
		</div>
	);
}

export default FullGrid;
