// 📋 A Slug is a URL friendly string used in cases such as https://yourwebsite.com/slug-string eg. https://www.yourwebsite.com/hussein-kizz

// Making The Slug With Javacript!
// 1. make the all string (@param string) lower-cased
// 2. split that into an array of separate strings, via the space between them!
// 3. Make a URL friendly string value by concating altogether with a hyphen
// 4. Finally return a slug object with key-value pair pattern, done!

export function makeSlug(string) {
  let formattedName = string.toLowerCase();
  let arr = formattedName.split(' ');
  let slugValue = arr.reduce(
    (initialValue, nextValue) => initialValue + '-' + nextValue
  );
  return { slug: slugValue };
}

// Quick Test,
// const myName = 'Hussein Kizz';
// console.log(makeSlug(myName));
// Todo, Make this an npm package!
