import Navbar from "../components/Navbar";
import { GetStaticProps } from "next";
import Link from "next/link";
import TopLevelContainer from "../components/TopLevelContainer";
import ContentDiv from "../components/styles/ContentDiv";
import getFilenames, { getFileContentWithMeta } from "../usecases/getFileInfo";

const Articles = ({ titleWithFilenames }) => (
	<>
		<TopLevelContainer title="Articles">
			<Navbar title="Articles"></Navbar>
			<ContentDiv>
				<h1> Articles </h1>
				<div>
					{titleWithFilenames.map((titleWithFilename) => {
						return (
							<li key={titleWithFilename["filename"]}>
								<Link
									href="/articles/[slug]"
									as={"/articles/" + titleWithFilename["filename"]}
								>
									<a>{titleWithFilename["title"]}</a>
								</Link>
							</li>
						);
					})}
				</div>
			</ContentDiv>
		</TopLevelContainer>
	</>
);

export default Articles;

export const getStaticProps: GetStaticProps = async () => {
	const files = getFilenames();

	const metadatas = getFileContentWithMeta(files).map(
		(allData) => allData.data
	);
	const titles = metadatas.map((metadata) => metadata.title);
	let titleWithFilenames: {}[] = [];
	for (let i = 0; i < titles.length; i++) {
		titleWithFilenames.push({
			title: titles[i],
			filename: files[i].replace(".md", ""),
		});
	}
	return {
		props: {
			titleWithFilenames: titleWithFilenames,
		},
	};
};