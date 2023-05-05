const { createHash, timingSafeEqual } = require("crypto");
const { Buffer } = require("buffer");
const MongoClient = require("mongodb").MongoClient;
/////////////////////////////////////////////////////////////

const convertUtf8ToHex = (utf8String) => {
  let hexString = "";
  for (let i = 0; i < utf8String.length; i++) {
    let hex = utf8String.charCodeAt(i).toString(16);
    hexString += ("000" + hex).slice(-4);
  }
  return hexString;
};

const convertHexToUtf8 = (hexString) => {
  let hexes = hexString.match(/.{1,4}/g) || [];
  let utf8String = "";
  for (let i = 0; i < hexes.length; i++) {
    utf8String += String.fromCharCode(parseInt(hexes[i], 16));
  }
  return utf8String;
};
////////////////////////////////////////////////////
const fetchLoginDoc = async (inputUsername, type) => {
  try {
    const mongoConn = await MongoClient.connect(
      "mongodb+srv://user0:1234@cluster0.iwxwkhb.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    if (!mongoConn) return Promise.reject();

    const query = { username: inputUsername };
    const db = mongoConn.db("medicinedb");
    let doc = "";

    if (type === "0") {
      doc = await db.collection("patient").findOne(query);
    } else {
      doc = await db.collection("doctor").findOne(query);
    }

    return doc;
  } catch {
    return Promise.reject();
  }
};

////////////////////////////////////////////////////////////
login = async function (inputUsername, inputPass, type) {
  try {
    //fetch doc of specific type
    //take out username, salt, hash
    const { username, salt, passhash } = await fetchLoginDoc(
      inputUsername,
      type
    );

    const hexpass = convertUtf8ToHex(inputPass);

    //build the new hash, f (salt+pass) , f is sha-256
    //synchronous
    const newpasshash = createHash("sha256")
      .update(convertHexToUtf8(hexpass + salt), "utf-8")
      .digest("hex");

    //compare usernames, compare fetched hash and new hash
    //timingSafeEqual returns true/false, not a promise, must be synchronous
    if (
      username !== inputUsername ||
      !timingSafeEqual(
        Buffer.from(passhash, "hex"),
        Buffer.from(newpasshash, "hex")
      )
    ) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  } catch {
    return Promise.reject();
  }
};

module.exports = { login };
