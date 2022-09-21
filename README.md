# Emoji Slack Stats Analyser

## How to use

First you will need to pull all the metadata from your slack workspaces "customize emoji"-page in your browser.

First run [script/emoji-data-analyser](./script/emoji-data-fetcher.js) according to its instructions in the top of the file. Please look through the code before you blindly copy-paste it into the console in the web browser. :)

Move the `data.json` file from your Downloads-folder into the `anylyse` folder in this project, make sure the file is named `data.json`.

Run `node analyse/analyse.js`.
