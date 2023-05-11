import { useState } from "react";
import classNames from "classnames";
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";

function ScrollButton() {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 600) {
			setVisible(true);
		} else if (scrolled <= 600) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	window.addEventListener("scroll", toggleVisible);

	return (
		<button
			aria-label="Back to top button"
			className={classNames(
				"fixed w-full -right-[80%] bottom-16 z-[5]",
				{ hidden: !visible },
				{ inline: visible }
			)}
			onClick={scrollToTop}
		>
			<BsFillArrowUpCircleFill size={32} />
		</button>
	);
}

export default ScrollButton;
