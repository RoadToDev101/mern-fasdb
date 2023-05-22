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
    path: "/create-product",
    methods: ["POST"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/create-model",
    methods: ["POST"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/create-sku",
    methods: ["POST"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/get-all-products",
    methods: ["GET"],
    roles: ["Unverified", "User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/get-product",
    methods: ["GET"],
    roles: ["User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/compare-models",
    methods: ["GET"],
    roles: ["User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/update-product/:id",
    methods: ["PATCH"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/update-model/:id",
    methods: ["PATCH"],
    roles: ["Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/update-sku/:id",
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
    roles: ["Unverified", "User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/update-role",
    methods: ["PATCH"],
    roles: ["Admin", "Super-Admin"],
  },
  {
    path: "/change-password",
    methods: ["PATCH"],
    roles: ["Unverified", "User", "Pro-User", "Editor", "Admin", "Super-Admin"],
  },
  {
    path: "/delete-user",
    methods: ["DELETE"],
    roles: ["Admin", "Super-Admin"],
  },
];

module.exports = accessControlLists;
