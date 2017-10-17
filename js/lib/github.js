// TODO: Display loader

var github = new GitHub({ token: 'b61fea02b771757ec6ff6990e8f1738d338ed921' });
client = github.getRepo("InnovMetierEtat", "innovmetieretat.github.io");

// Get all commits
function get_files(callback) {
  client.listCommits()
    .then(function(commits) {
      var last_commit = _.last(commits.data);
      console.log(commits);
      client.getTree(last_commit.sha + "?recursive=1").then(function(response) {
        callback(response.data.tree);
      });
    });
}

get_files(function(files) {
  console.log(files);
});
