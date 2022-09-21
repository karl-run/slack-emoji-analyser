/**
 * Hacky way to pull all data about emojis in a slack workspace.
 *
 * Copy and paste this into the terminal on the emoji list page on your slack workspace
 *
 * 1. Edit the two variables below
 * 2. Get your token from https://<your-workspace>.slack.com/customize/emoji by looking at the request in the
 *    network tab and finding the "token" that starts with xoxc
 * 3. Paste the this entire file into the console and execute it.
 * 4. A file with the name "data.json" should be downloaded.
 */

(async () => {
    const myWorkSpace = 'your-workspace';
    const myTokenFromSlackEmojiListPage =
        'xoxc-REPLACE_ME';

    const fetchPage = async () =>
        fetch(`https://${myWorkSpace}.slack.com/api/emoji.adminList`, {
            credentials: 'include',
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0',
                Accept: '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
            },
            method: 'POST',
            mode: 'cors',
            body: new URLSearchParams({
                page: 1,
                count: 5000,
                sort_by: 'name',
                sort_dir: 'asc',
                token: myTokenFromSlackEmojiListPage,
                _x_reason: 'customize-emoji-next-page',
                _x_mode: 'online',
            }),
        }).then((it) => it.json());

    /**
     * Stolen from https://stackoverflow.com/a/65939108
     */
    const saveTemplateAsFile = (filename, dataObjToWrite) => {
        const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: 'text/json' });
        const link = document.createElement('a');

        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

        const evt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        link.dispatchEvent(evt);
        link.remove();
    };

    const emojiData = await fetchPage();

    if (emojiData.ok) {
        saveTemplateAsFile('data.json', emojiData);
        console.info(`Everything went fine! Exported ${emojiData.emoji.length} emojis to data.json`);
    } else {
        console.error('Uh oh, script failed');
        console.error(emojiData.error);
    }
})();
