const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// _____Sexy?Sex
// ____?Sexy?Sexy
// ___y?Sexy?Sexy?
// ___?Sexy?Sexy?S
// ___?Sexy?Sexy?S
// __?Sexy?Sexy?Se
// _?Sexy?Sexy?Se
// _?Sexy?Sexy?Se
// _?Sexy?Sexy?Sexy?
// ?Sexy?Sexy?Sexy?Sexy
// ?Sexy?Sexy?Sexy?Sexy?Se
// ?Sexy?Sexy?Sexy?Sexy?Sex
// _?Sexy?__?Sexy?Sexy?Sex
// ___?Sex____?Sexy?Sexy?
// ___?Sex_____?Sexy?Sexy
// ___?Sex_____?Sexy?Sexy
// ____?Sex____?Sexy?Sexy
// _____?Se____?Sexy?Sex
// ______?Se__?Sexy?Sexy
// _______?Sexy?Sexy?Sex
// ________?Sexy?Sexy?sex
// _______?Sexy?Sexy?Sexy?Se
// _______?Sexy?Sexy?Sexy?Sexy?
// _______?Sexy?Sexy?Sexy?Sexy?Sexy
// _______?Sexy?Sexy?Sexy?Sexy?Sexy?S
// ________?Sexy?Sexy____?Sexy?Sexy?se
// _________?Sexy?Se_______?Sexy?Sexy?
// _________?Sexy?Se_____?Sexy?Sexy?
// _________?Sexy?S____?Sexy?Sexy
// _________?Sexy?S_?Sexy?Sexy
// ________?Sexy?Sexy?Sexy
// ________?Sexy?Sexy?S
// ________?Sexy?Sexy
// _______?Sexy?Se
// _______?Sexy?
// ______?Sexy?
// ______?Sexy?
// ______?Sexy?
// ______?Sexy
// ______?Sexy
// _______?Sex
// _______?Sex
// _______?Sex
// ______?Sexy
// ______?Sexy
// _______Sexy
// _______ Sexy?
// ________Sexy

//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
