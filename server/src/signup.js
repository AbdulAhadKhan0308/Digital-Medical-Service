const { randomBytes, createHash, timingSafeEqual } = require("crypto");
const { Buffer } = require("buffer");
//let salt = "586731aefe396ae1466d6d6da9eb828b";

const password = "pass1";
//128 bit or 16 byte salt, randomBytes is being used
//synchronously
const salt = "22d04a5442bf1a4e8acef98133f2f9e8"; //randomBytes(16).toString("hex");

console.log(salt);
let hexpass = "";
for (let i = 0; i < password.length; i++) {
  let hex = password.charCodeAt(i).toString(16);
  hexpass += ("000" + hex).slice(-4);
}

const passAndSaltHex = hexpass + salt;

let hexes = passAndSaltHex.match(/.{1,4}/g) || [];
let passAndSaltUtf8 = "";
for (let i = 0; i < hexes.length; i++) {
  passAndSaltUtf8 += String.fromCharCode(parseInt(hexes[i], 16));
}

console.log("salt: ", salt);
console.log("hexpass: ", hexpass);
console.log("passAndSaltUtf8: ", passAndSaltUtf8);

const passhash = createHash("sha256")
  .update(passAndSaltUtf8, "utf-8")
  .digest("hex");

console.log("salt: ", salt);
console.log("passhash: ", passhash);

//test
const str1 = "60f316223d62d4f06ee08049e4a7ec2e7e80f3219a5ecebad55be3025ccad759";
const str2 = "0f7b7285c11b27d9204dcf51e3aa91d8481856a61b8596e9fa4b7071f734ff8a";

console.log(
  timingSafeEqual(Buffer.from(str1, "hex"), Buffer.from(str2, "hex"))
);
