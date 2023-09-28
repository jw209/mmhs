let Parser = require('rss-parser');
let parser = new Parser();

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    let feed = await parser.parseURL('https://media.rss.com/matchup-mashup/feed.xml');

    const objects = feed.items.map(item => ({
        title: item.title,
        link: item.link,
        date: item.pubDate,
        content: item.content
    }));

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify(objects),
    };
};
