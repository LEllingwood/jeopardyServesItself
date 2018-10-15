module.exports = async function (uri) { //exporting something. 
    const axios = require("axios");
    const response = await axios.get(uri);

    return response.data;
}

// async on line 1 and await on ln 3 go together.  aixos sends out a call and move on to line 5, but no response has been received -so answer would have been null. line 3 tells it to wait until the information is returned.  await must be inside an async function.   ln 2-we've done npm install axios previously.  assuming that's done, line 2 just makes axios available inside this document.  line 3 tells aixos to go get the uri/url/whatever.  F/U w/ DMG


// line 3 returning a promise? overview is that this function is returning a promise and that promise is going to be populated with the results of the network request (once it gets a response)
// .data is specific to axios