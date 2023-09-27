let Parser = require('rss-parser');
let parser = new Parser();

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    let feed = await parser.parseURL('https://media.rss.com/matchup-mashup/feed.xml');
    console.log(feed.title);

    let objects;

    feed.items.forEach(item => {
        objects = {
            title: item.title,
            link: item.link
        }
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify(objects),
    };
};
