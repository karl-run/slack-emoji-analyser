const R = require('remeda');

/**
 * Run script/emoji-data-fetcher.js as per its instructions, and put data.json adjecent to this file
 */
const data = require('./data.json');

// Used to go from user_id to real name
const userIdNameLookup = new Map();
data.emoji.forEach(it => {
    userIdNameLookup.set(it.user_id, it.user_display_name)
})

const groupedByUserId = R.groupBy(data.emoji, (it) => it.user_id);
const userEmojiTuple = Object.entries(groupedByUserId);
const onlySingleEmoji = userEmojiTuple
    .filter(([, emojis]) => emojis.length === 1)
    .map(([userId]) => userIdNameLookup.get(userId));
const moreThan10 = userEmojiTuple
    .filter(([, emojis]) => emojis.length >= 10)
    .map(([userId]) => userIdNameLookup.get(userId));
const top10 = R.pipe(
    userEmojiTuple,
    R.sortBy((it) => it[1].length),
    R.chunk(10),
    R.last,
    R.map(it => [userIdNameLookup.get(it[0]), it[1].length]),
);

// Pasteable in slack, use ctrl+shift+f to format markdown after you've pasted
console.log(`
Det er *${data.emoji.length}* emojis lastet opp av *${userIdNameLookup.size}* personer. hvorav *${onlySingleEmoji.length}* personer har lastet opp bare èn. *${moreThan10.length}* personer har lastet opp 10 eller flere.
`);

// Used for https://charts.livegap.com
const csv = `
${top10.map(it => it[0]).join(",")}
${top10.map(it => it[1]).join(",")}
`

console.log(csv)
