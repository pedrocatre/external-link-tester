# External Link Tester

Testing external links of your application, like documentation and partner website links, is important since if they break or change you'll probably only find out through your users.
You can use **External Link Tester** in your CI system to make sure the external links your application uses are not broken.

Just add the links you which to test to the configuration file, have your CI system run the package and point it to the resulting JUnit report.

![External Link Tester](https://github.com/pedrocatre/external-link-tester/raw/master/screenshots/external-link-tester.gif)

## Install

Run `npm install external-link-tester --save-dev`

## Usage

Pass configuration file as a command line parameter.
Example: `node app.js ./extLinksTester.example.config.js`

The output is a JUnit report. You can specify the path you want the report to go to in `outputFile` configuration property in the configuration file.

When you install it in your project assuming, for example, you created a config file called *extLinksTester.config.js* in the root you then run the command:

`node node_modules/external-link-tester/app.js ../../extLinksTester.config.js`


## Configuration

Checkout extLinksTester.example.config.js for a configuration example.
The properties you should defined in this file are:

* The path to the **outputFile**
* And an array of **externalLinks** with the timeout value when after which the application considers the link is down.

Like so:

```javascript
module.exports = {
    outputFile: 'results/links-test-result.xml',
    externalLinks: [
        {
            url: 'http://www.google.com111',
            timeout: 3000
        },
        {
            url: 'https://en.wikipedia.org/wiki/List_of_HTTP_status_codes',
            timeout: 3000
        }
    ]
};
```

## Run tests

`ava test.js`

## TODO

- [ ] use timeout
- [ ] be able to specify a path and look for external links
- [ ] be able to specify exclude links

## License

The code in this repository can be used under the MIT License.
