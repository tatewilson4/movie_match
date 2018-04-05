const app = angular.module('Moviematch', []);

app.controller('MainController',['$http', function($http) {
    this.appName = "Movie Match";
    this.indexOfLogFormToShow = null;
    this.indexOfCreateFormToShow = null;

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

    this.createUser = function(){
        $http({
            method:'POST',
            url: '/users',
            data: {
                username: this.username,
                password: this.password
            }
        }).then(function(response){
            console.log(response);
        }, function(){
            console.log('error');
        });
    }

    this.logIn = function(){
        $http({
            method:'POST',
            url: '/sessions',
            data: {
                username: this.username,
                password: this.password
            }
        }).then(function(response){
            console.log(response);
        }, function(){
            console.log('error');
        });
    }

    this.getSignedInUser = function(){
        const controller = this;
        $http({
            method:'GET',
            url: '/sessions'
        }).then(function(response){
            controller.loggedInUsername =response.data.username;
            console.log(response);;
        }, function(){
            console.log('error');
        });
    }

}]);
