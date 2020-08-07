export function hello() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let a = true;
      if (a) {
        resolve("hello world");
      } else {
        reject("还可以");
      }
    }, 1000);
  });
}
