const fs = require('fs');
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
    files.map((file) => {
        let fileContent = fs.readFileSync('data/blogs/' + file, 'utf8');
        const m = extractMetadataFromMarkdown(fileContent)
        //add slug to metadata
        m.slug = file.split('.')[0];
        metadatas.push(m);
    });
    return metadatas;

}
module.exports = {
    getFileMetaDatas,
    extractMetadataFromMarkdown
};