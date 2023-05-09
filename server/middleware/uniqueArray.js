const uniqueArray = (path) => {
  return function (next) {
    const values = this.get(path);
    if (values && Array.isArray(values)) {
      const uniqueValues = [...new Set(values)];
      this.set(path, uniqueValues);
    }
    next();
  };
};

module.exports = uniqueArray;
