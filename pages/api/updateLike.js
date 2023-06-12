const { MongoClient } = require("mongodb")
const url = process.env.DB_CONN_STRING
const client = new MongoClient(url)

const dbName = process.env.DB_NAME
const colName = process.env.DB_COLLECTION

async function updateLike(req, res) {
  const { id, contractAddress, tokenId, ownerId } = req.body;
  console.log("Updating Likes", id, contractAddress, tokenId, ownerId)
  try {
    await client.connect()
    console.log("Connected correctly to server")
    const db = client.db(dbName)
    const col = db.collection(colName)

    const filter = {
      contractAddress: contractAddress,
      tokenId: tokenId,
      ownerId: ownerId
    };
    const updateDoc = {
      $addToSet: { likes: id }, // add unique userId to likes
      $set: {
        contractAddress: contractAddress,
        tokenId: tokenId,
        ownerId: ownerId
      },
      $currentDate: { lastModified: true },
    }
    const options = { upsert: true }
    const updateResult = await col.updateOne(filter, updateDoc, options)
    console.log(
      `${updateResult.matchedCount} document(s) matched the filter, updated ${updateResult.modifiedCount} document(s)`
    )

    // return updated user
    res.status(200).json({message: "Update successful"});
  } catch (error) {
    console.error("error", error);
    res.status(500).json({message: "An error occurred"});
  }
}

module.exports = updateLike;
