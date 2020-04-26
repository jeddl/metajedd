import fs from "fs";
import {GetStaticPaths, GetStaticProps} from "next";
import React from "react";
import Article from "../../interfaces/article";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";

const Post: React.FunctionComponent<Article> = ({contents, metadata}) => {
	return (
		<>
			<Head>
				<title>{metadata.title}</title>
			</Head>
			<ReactMarkdown source={contents} renderers={{code: CodeBlock}} />
		</>
	);
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
	const files = fs.readdirSync(path.join("pages", "articles", "contents"));
	return {
		paths: files.map(filename => ({
			params: {
				slug: filename.replace(".md", ""),
			},
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ctx => {
	if (!ctx.params) {
		return {props: {}};
	}
	const {slug} = ctx.params;
	const filename = slug.toString();
	const markdownMetaData = fs
		.readFileSync(path.join("pages", "articles", "contents", filename + ".md"))
		.toString();
	const parsed = matter(markdownMetaData);
	return {
		props: {
			contents: parsed.content,
			metadata: parsed.data,
		},
	};
};
