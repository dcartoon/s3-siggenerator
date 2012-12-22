/* We can easily make some test cases from the Developer Guide at: 
 * http://s3.amazonaws.com/doc/s3-developer-guide/RESTAuthentication.html */

var exampleExpires = '1141889120';
var exampleUrl = '/quotes/nelson';
var exampleAccessKey = '44CF9590006BF252F707';
var exampleSecretKey = 'OtxrzxIsfpFjA7SwPzILwy8Bw21TLhquhboDYROV';
var exampleSignature = 'vjbyPxybdZaNmGa%2ByT272YEAiv4%3D';
var exampleSignedUrl = 'http://s3.amazonaws.com/quotes/nelson?AWSAccessKeyId=44CF9590006BF252F707&Expires=1141889120&Signature=vjbyPxybdZaNmGa%2ByT272YEAiv4%3D';

test( "canonical string generation test", function () {

    var canonicalString = generateCanonicalString(exampleUrl, exampleExpires);
    equal('GET\n\n\n1141889120\n/quotes/nelson', canonicalString);
});

test( "signature generation test", function () {
    var canonicalString = generateCanonicalString(exampleUrl,
        exampleExpires);
    var signature = generateSignature(exampleUrl, exampleExpires,
        exampleSecretKey);
    equal(exampleSignature, signature);
});

test( "signed url generation test", function () {
    var signature = generateSignature(exampleUrl, exampleExpires,
        exampleSecretKey);
    var signedUrl = generateSignedUrl(exampleUrl, exampleExpires,
        exampleAccessKey, signature);
    equal(exampleSignedUrl, signedUrl);
});
