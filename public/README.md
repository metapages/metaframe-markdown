## Markdown viewer [metaframe](https://metapages.org/)

Source: [https://github.com/metapages/metaframe-markdown](https://github.com/metapages/metaframe-markdown)

Displays formatted markdown.

You can send the raw markdown:

### via input pipes

Send any markdown text on any input pipe and this page will display the formatted markdown.

Some named pipes are special however:

`*base64*`: any pipe *ending with* base64 is assumed base64 encoded and will be decoded

### via URL parameter to an external location:

[https://metapages.github.io/metaframe-markdown/#?url=https://raw.githubusercontent.com/metapages/metaframe-markdown/main/public/test.md](https://metapages.github.io/metaframe-markdown/#?url=https://raw.githubusercontent.com/metapages/metaframe-markdown/main/public/test.md)

This downloads the content at [https://github.com/metapages/metaframe-markdown/blob/main/public/test.md](https://github.com/metapages/metaframe-markdown/blob/main/public/test.md) and shows the content as markdown.

### via URL parameter with markdown content embedded:

Add the base64 encoded markdown text string to the URL parameter `md`:

	https://metapages.github.io/metaframe-markdown/?md=<base64 encoded markdown>

For example:

[embedded markdown link]: https://metapages.github.io/metaframe-markdown/#?md=IyBFeGFtcGxlIG1hcmtkb3duIGVtYmVkZGVkIGluIHRoZSBVUkwKClRoaXMgZXhhbXBsZSBtZXRhZnJhbWUgaGFzIG1hcmtkb3duIGVtYmVkZGVkIGluIHRoZSBVUkwgb2YgdGhlIG1hcmtkb3duLWRpc3BsYXkgbWV0YWZyYW1lLiBUaGlzIHRleHQgaXMgZW1iZWRkZWQgaW4gdGhlIFVSTCBhbmQgc2hvd24gaGVyZS4KCiMjIEFuZCBhbm90aGVyIHN1YmhlYWRpbmcKSXQganVzdCBrZWVwcyBnb2luZw==

[https://metapages.github.io/metaframe-markdown/#?md=IyBFeGFtcGxlIG1hcmtkb3duIGVtYmVkZGVkIGluIHRoZSBVUkwKClRoaXMgZXhhbXBsZSBtZXRhZnJhbWUgaGFzIG1hcmtkb3duIGVtYmVkZGVkIGluIHRoZSBVUkwgb2YgdGhlIG1hcmtkb3duLWRpc3BsYXkgbWV0YWZyYW1lLiBUaGlzIHRleHQgaXMgZW1iZWRkZWQgaW4gdGhlIFVSTCBhbmQgc2hvd24gaGVyZS4KCiMjIEFuZCBhbm90aGVyIHN1YmhlYWRpbmcKSXQganVzdCBrZWVwcyBnb2luZw==][embedded markdown link]

This gives you a simple way to create static notes or help pages.
