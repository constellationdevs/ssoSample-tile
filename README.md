# Getting Started: SSO Sample Test Tile

This tile is an example starting point for a member  - utilizing single sign on to access a third-party site

- Contains a function that calls a connector, gets the return, then calls openWebLink all in one

## SSO Requirements

- tile
- connector
- access to a third party web api
- url of the third party site to open

## How to deploy

Ensure that the script and link tags in the index.html file between `<!-- LOCAL DEVELOPMENT ONLY -->` are removed or commented out before deploying the tile
Upload the following files to the tile project in the portal:
- tile.js
- index.html
- tilestrings-en.json
- tileicon.png