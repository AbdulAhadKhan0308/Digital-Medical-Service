const { createHash, randomBytes } = require("crypto");
const MongoClient = require("mongodb").MongoClient;

////////////////////////////////////////////////////
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
const checkUsernameIsUnique = async (inputUsername, type) => {
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

    if (!!doc) return Promise.resolve("0");
    return Promise.resolve("1");
  } catch {
    return Promise.reject();
  }
};

const insertDoc = async (username, salt, passhash, type) => {
  try {
    const mongoConn = await MongoClient.connect(
      "mongodb+srv://user0:1234@cluster0.iwxwkhb.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    if (!mongoConn) return Promise.reject();

    const db = mongoConn.db("medicinedb");
    let doc = {
      username: username,
      salt: salt,
      passhash: passhash,
    };

    if (type === "0") {
      await db.collection("patient").insertOne(doc);
    } else {
      await db.collection("doctor").insertOne(doc);
    }
    return Promise.resolve();
  } catch {
    return Promise.reject();
  }
};
////////////////////////////////////////////////////
const signup = async (inputUsername, inputPass, type) => {
  try {
    //check whether username is unique or not
    //if not unique return
    const value = await checkUsernameIsUnique(inputUsername, type);
    if (value === "0") return Promise.resolve("NON UNIQUE");

    //create salt for password
    //randomBytes is synchronous here
    //to use it asynchronously, use a callback
    //function
    const salt = randomBytes(16).toString("hex");

    //calculate sha256 hash of (password+salt)
    //also called f (password+hash)
    const hexpass = convertUtf8ToHex(inputPass);
    const passhash = createHash("sha256")
      .update(convertHexToUtf8(hexpass + salt), "utf-8")
      .digest("hex");

    //store in patient or doctor col as required
    await insertDoc(inputUsername, salt, passhash, type);
    return Promise.resolve("REGISTERED");
  } catch {
    return Promise.reject();
  }
};

module.exports = { signup };
