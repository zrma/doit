/**
 * LifeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Meaning = require('the-ultimate-question');

module.exports = {

  purpose: (req, res) => {
    return res.json({
      answer: Meaning.answer(),
      question: Meaning.question(),
    });
  },
};

