//Cluster0
//username: user0
//password: 1234
const MongoClient = require("mongodb").MongoClient;

//regex can work without indices, but with index on db it will be faster

function medicineSearch(query) {
  return new Promise(function (resolve, reject) {
    query = `(.*)${query}(.*)`;
    let ansArray = [];

    const agg = [
      {
        $search: {
          index: "medicine",
          regex: {
            path: "Medicine Name",
            allowAnalyzedField: true,
            query: query,
          },
        },
      },
      {
        $limit: 5,
      },
    ];

    MongoClient.connect(
      "mongodb+srv://user0:1234@cluster0.iwxwkhb.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (connectErr, client) {
        if (!!connectErr) {
          console.log("ERR CONNECTING TO DB in SEARCH");
          resolve({});
        } else {
          const coll = client.db("medicinedb").collection("medicineCol2");
          coll.aggregate(agg).then((cursor) => {
            cursor.then((readyCursor) => {
              readyCursor.forEach((doc) => {
                ansArray.push(doc);
                console.log(doc);
              });
            });
            client.close();
            resolve(ansArray);
          });
        }
      }
    );
  });
}

module.exports = { medicineSearch };
