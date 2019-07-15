const express = require("express");

const db = require("./data/accounts.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  await db.find().then(data => {
    res.status(200).json(data);
  });
});
server.get("/:id", async (req, res) => {
  await db
    .findById(req.params.id)
    .then(data => {
      if (data.length) {
        return res.status(200).json(data);
      }
      return res.status(404).json("Could not locate account");
    })
    .catch(data => res.status(500).json(data));
});
server.post("/", async (req, res) => {
  await db
    .add(req.body)
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(data => res.status(500).json(data));
});
server.put("/:id", async (req, res) => {
  await db
    .update(req.params.id, req.body)
    .then(data => {
      if (data.length) {
        return res.status(200).json(data);
      }
      return res.status(404).json("Could not locate account");
    })
    .catch(data => res.status(500).json(data));
});
server.delete("/:id", async (req, res) => {
  await db
    .remove(req.params.id)
    .then(data => {
      return res.status(200).json("Deleted successfully");
    })
    .catch(data => res.status(404).json("This Account doesnt exist"));
});
module.exports = server;
