const posts = [
  {
    title: "Post #1",
    description: "Win more gifts",
    thumbnail:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
    url: "https://app.imigames.io/home",
  },
];
module.exports.getPostById = (id) => posts[id - 1];
