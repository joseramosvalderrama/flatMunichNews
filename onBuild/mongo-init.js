db.createUser({
  user: "flatUser",
  pwd: "flatMunich",
  roles: [
    {
      role: "readWrite",
      db: "flatsDB",
    },
  ],
});
