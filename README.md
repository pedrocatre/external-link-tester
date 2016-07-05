# External Link Tester

Testing external links of your application, like documentation and partner website links, is important since if they break or change you'll probably only find out through your users.
You can use external link tester in your CI environment to make sure the external links your application uses are not broken.

![External Link Tester](https://github.com/pedrocatre/external-link-tester/raw/master/screenshots/external-link-tester.gif)

## Install

Run `npm install external-link-tester --save-dev`

## Usage

Pass configuration file as a command line parameter.
Example: `node app.js ./extLinksTester.example.config.js`

The output is a JUnit report. You can specify the path you want the report to go to in `outputFile` configuration property in the configuration file.


## Configuration

Checkout extLinksTester.example.config.js for a configuration example.

## TODO

- [ ] use timeout
- [ ] be able to specify a path and look for external links
- [ ] be able to specify exclude links

## License

The code in this repository can be used under the MIT License.
