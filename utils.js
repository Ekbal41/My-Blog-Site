
const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), "data/blog-posts/");

const extractMetadataFromMarkdown = (markdown) => {
    const charactersBetweenGroupedHyphens = /^---([\s\S]*?)---/;
    const metadataMatched = markdown.match(charactersBetweenGroupedHyphens);
    const metadata = metadataMatched[1];
    if (!metadata) {
        return {};
    }
    const metadataLines = metadata.split("\n");
    const metadataObject = metadataLines.reduce((accumulator, line) => {
        const [key, ...value] = line.split(":").map((part) => part.trim());
        if (key)
            accumulator[key] = value[1] ? value.join(":") : value.join("");
        return accumulator;
    }, {});
    return metadataObject;
};
const getFileMetaDatas = (files) => {
    const metadatas = [];

    for (const file of files) {
        let fileContent = fs.readFileSync(path.join(blogDir, file), 'utf8');
        const m = extractMetadataFromMarkdown(fileContent);
        // Add slug to metadata
        m.slug = file.split('.')[0];
        metadatas.push(m);
    }

    // Add next and previous blog to metadata
    for (let index = 0; index < metadatas.length; index++) {
        if (index > 0) {
            metadatas[index].previousSlug = metadatas[index - 1].slug;
            metadatas[index].previousTitle = metadatas[index - 1].title;
        }
        if (index < metadatas.length - 1) {
            metadatas[index].nextSlug = metadatas[index + 1].slug;
            metadatas[index].nextTitle = metadatas[index + 1].title;
        }
    }

    return metadatas;
};

module.exports = {
    getFileMetaDatas,
    extractMetadataFromMarkdown
};