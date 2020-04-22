import Nav from "react-bootstrap/Nav";
import Link from "next/Link";

function Navigationbar() {
	return (
		<div>
			<Nav.Item>
				<Link href="/index">
					<a>Home</a>
				</Link>
			</Nav.Item>
			<Nav.Item>
				<Link href="/articles">
					<a>Ariticles</a>
				</Link>
			</Nav.Item>
			<Nav.Item>
				<Link href="/contact">
					<a>Contact</a>
				</Link>
			</Nav.Item>
		</div>
	);
}

export default Navigationbar;
