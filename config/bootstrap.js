/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  Video.count().exec(function(err, numVideos) {
    if (err) {
      return cb(err);
    }

    if (numVideos > 0) {
      console.log('Existing video records: ', numVideos)
      return cb();
    }
    const Youtube = require('machinepack-youtube');

    // List Youtube videos which match the specified search query.
    Youtube.searchVideos({
      query: 'grumpy cat',
      apiKey: sails.config.google.apiKey,
      limit: 15,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        console.log('an error: ', err);
        return cb(err);

      },
      // OK.
      success: function(foundVideos) {

        // Transform the incoming foundVideos to match the front end expected format
        _.each(foundVideos, function(video) {
          video.src = 'https://www.youtube.com/embed/' + video.id;
          delete video.description;
          delete video.publishedAt;
          delete video.id;
          delete video.url;
        });

        // Add the transformed video records to the video model
        Video.createEach(foundVideos).exec(function(err, videoRecordsCreated) {
          if (err) {
            return cb(err);
          }

          console.log(videoRecordsCreated);
          return cb();
        });
      },
    });
  });
};
