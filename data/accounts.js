const db = require("./dbConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};
async function find() {
  let data = await db
    .select()
    .table("accounts")
    .then(res => {
      return res;
    });
  return data;
}
async function findById(id) {
  let data = await db
    .select()
    .table("accounts")
    .where("id", id)
    .then(res => {
      return res;
    })
    .catch(res => {
      return res;
    });
  return data;
}
async function add(account) {
  const [id] = await db.insert(account).table("accounts");
  return await findById(id);
}
async function update(id, account) {
  await db
    .update(account, "*")
    .table("accounts")
    .where({ id });
  return findById(id);
}
async function remove(id) {
  return await db
    .where({ id })
    .del()
    .table("accounts");
}
