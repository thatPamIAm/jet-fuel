// const assert = require('assert');
//
// describe('helper functions', () => {
//
//   it('should validate a URL that is passed in', (done) => {
//     const myURL = 'www.google.com'
//     const test = validateURL(myURL)
//     console.log(test)
//
//     assert.deepEqual(test, 'www.google.com')
//     done();
//   });
// });

// const validateUrl = (url) => {
//   var res = url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
//   if(res ) {
//     return true;
//   }
//   else {
//     return false
//   }
// }
//
// const addHTTP = (url) => {
//   if(!/^(f|ht)tps?:\/\//i.test(url)) {
//     url = "http://" + url;
//   }
//   return url;
// }
