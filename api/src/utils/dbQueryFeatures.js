class DbQueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    if (queryString) {
      this.queryString = queryString;
    } else {
      this.queryString = {};
    }
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }
}

module.exports = DbQueryFeatures;
