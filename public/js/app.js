const app = angular.module('Moviematch', []);

app.controller('MainController',['$http', function($http) {
    this.appName = "Movie Match";

    this.movies = [];

    this.baseURL = 'http://www.omdbapi.com/?';
    this.apikey = 'apikey=' + 'd7e24dcc';
    this.query = 't=';
    this.movieTitle = '';
    this.searchURL = this.baseURL + this.apikey + '&' + this.query;

    console.log(this.movieTitle);

    // Get Movies
    this.getMovies = ()=>{
     $http({
            method: 'GET',
            url : this.searchURL + this.movieTitle
       }).then( response => {
            this.movies = [response.data];
            console.log(response.data);
        }, error => {
            console.log(error);
        }).catch ( err => {
            console.log('Catch:' , err);
        })
    }

    this.createdUser = function(){
        $http({
            method: 'POST',
            url: '/users',
            data: {
                username: this.username,
                password: this.password
            }
        }).then(response => {
            this.users = [response.data];
            console.log(response);
        }, error => {
            console.log('error');
        });
    }

    this.loginUser = function(){
        $http({
            method: 'POST',
            url: '/session',
            data: {
                username: this.username,
                password: this.password
            }
        }).then(response => {
            // this.session = [response.data];
            console.log(response);
        },error => {
            console.log('error');
        });
    }

}]);
