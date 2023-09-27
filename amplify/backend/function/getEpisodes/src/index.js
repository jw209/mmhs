const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async (event) => {
    try {
        // Replace 'RSS_FEED_URL' with the URL of your RSS feed.
        const feed = await parser.parseURL('https://media.rss.com/matchup-mashup/feed.xml');

        // Process the feed data as needed.
        const podcasts = feed.items.map(item => {
            return {
                title: item.title,
                description: item.description,
                link: item.link,
                pubDate: item.pubDate,
                // Add more properties as needed.
            };
        });

        // Return the podcasts as a response.
        const response = {
            statusCode: 200,
            body: JSON.stringify(podcasts),
        };
        return response;
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
