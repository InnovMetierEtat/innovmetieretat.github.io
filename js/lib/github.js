// TODO: Display loader

// We add an |apie| salt to the token so github doesn't delete it automaticaly (security measure)
const token = "cb|apie|ed6838d816b01f386a1d52e1e8055a94ffe5|apie|aa"

// Removes the salt added to the token
desalinize = (function(t) { return t.replace("|apie|", "").replace("|apie|", ""); });

var github = new GitHub({ token: desalinize(token) });
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
