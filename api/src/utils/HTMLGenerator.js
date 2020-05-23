const path = require('path');
const ejs = require('ejs-promise');
const fs = require('fs');

module.exports = async ({ template, params, images }) => {
  // Get the EJS file that will be used to generate the HTML
  const file = path.join(
    __dirname,
    `../views/email/${template}/${template}.ejs`
  );

  // Throw an error if the file path can't be found
  if (!file) {
    throw new Error(`Could not find the ${template} in path ${file}`);
  }

  const html = await ejs.renderFile(file, params, {}, (error, result) => {
    if (error) {
      return error;
    }
    return result
      .then(function (data) {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  });
  const attachments = images.map((image) => {
    return {
      filename: image,
      path: path.join(__dirname, `../views/email/${template}/images/${image}`),
      cid: `${image}@cid`,
    };
  });
  return { html, attachments };
};
