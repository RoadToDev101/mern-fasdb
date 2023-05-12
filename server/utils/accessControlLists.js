const accessControlLists = [
  {
    path: "/get-drawings",
    methods: ["GET"],
    roles: ["Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/get-drawing",
    methods: ["GET"],
    roles: ["Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/create-drawing",
    methods: ["POST"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/delete-drawing/:id",
    methods: ["DELETE"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/get-products",
    methods: ["GET"],
    roles: ["User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/get-product",
    methods: ["GET"],
    roles: ["User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/create-product",
    methods: ["POST"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/update-product",
    methods: ["PATCH"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/delete-product/:id",
    methods: ["DELETE"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/update-username-email",
    methods: ["PATCH"],
    roles: ["User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/update-role",
    methods: ["PATCH"],
    roles: ["Admin", "Super-Admin"],
  },
  {
    path: "/change-password",
    methods: ["PATCH"],
    roles: ["User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/delete-user/:id",
    methods: ["DELETE"],
    roles: ["Admin", "Super-Admin"],
  },
];

module.exports = accessControlLists;
