import User from "./user.js";

function getUsers(name, job) {
  if (!name && !job) {
    return User.find();
  }
  if (name && !job) {
    return findUserByName(name);
  }
  if (job && !name) {
    return findUserByJob(job);
  }
}

function findUserById(id) {
  return User.findById(id);
}

function addUser(user) {
  const u = new User(user);
  return u.save();
}

function findUserByName(name) {
  return User.find({ name });
}

function findUserByJob(job) {
  return User.find({ job });
}

function findUsersByNameAndJob(name, job) {
  return User.find({ name, job });
}

function deleteUserById(id) {
  return User.findByIdAndDelete(id).then(deletedDoc => !!deletedDoc);
}

export default {
  getUsers,
  findUserById,
  addUser,
  findUserByName,
  findUserByJob,
  findUsersByNameAndJob,
  deleteUserById,
};