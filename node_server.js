// var https = require("https");
var url = require('url');
var https = require('https');
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
var responseObject = {};
var starIndex = 0;
var repoObject = [];
var starIndexRepos = [];

function computeStarIndex(stars) {
    var n = stars.length, tot = 0;
    var arr = Array(n + 1).fill(0);
    for (var i = 0; i < n; i++) {
        if (stars[i] >= n) arr[n]++;
        else arr[stars[i]]++;
    }
    for (var i = n; i >= 0; i--) {
        tot += arr[i];
        if (tot >= i) return i;
    }
    return 0;
}

function saveStarIndexRepos() {
    repoObject.forEach(element => {
        if (element.repo_stars >= starIndex) {
            starIndexRepos.push({
                repo_name: element.repo_name,
                repo_stars: element.repo_stars,
            });
        }
    });
}

app.get('/zzz/', function (req, res) {
    
    var url_parts = url.parse(req.url, true);
    
    // populate data for git hub api
    var GitServerOptions = {
        hostname: 'api.github.com',
        path: '/users/' + req.query.id + '/repos',
        method: 'GET',
        headers: {
            'user-agent': 'harshakanamanapalli'
        }
    };
    //https://api.github.com/users/harshakanamanapalli/repos
    var gitResponse = '';
    try {
        var git_req = https.request(GitServerOptions, function (git_res) {
            git_res.setEncoding('utf-8');
            responseObject = {};
            repoObject = [];
            starIndexRepos = [];
            output = {};
            git_res.on("data", function (a) {
                gitResponse += a;
            });
            git_res.on("end", function () {
                responseObject = JSON.parse(gitResponse);
                var stars = [];

                responseObject.forEach(element => {
                    repoObject.push({
                        repo_name: element.name,
                        repo_stars: element.watchers,
                    });
                    //console.log(element.name);
                    stars.push(parseInt(element.watchers));
                });
                //console.log(stars[0] + repoObject[0]);
                //console.log(stars.length);
                starIndex = computeStarIndex(stars);    // computes star index of obtained repositories
                saveStarIndexRepos();                   // saves repositories which contributed for star Index

                res.writeHead(200, { "Content-Type": "application/json" });
                var output = JSON.stringify({
                    starIndex: starIndex,
                    starIndexRepos: starIndexRepos
                });
                res.end(output);
                //res.json(starIndexRepos);
                console.log ("sent StarIndex to ",req.query.id);
            });
            git_res.on('error', function (e) {
                res.sendStatus(420);
            });
        }).on('error', function () {
            console.log("error");
            res.sendStatus(405);
        }).end();
    }
    catch (e) {
        console.log("error with  git code");
        res.sendStatus(450);
    }
});


app.listen(8080, function () {
    console.log('listening');
});
