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

    this.toggleInfo = () => {
        this.showInfo = !this.showInfo;
    }



    // Get Movies
    this.getMovies = ()=>{
        $http({
            method: 'GET',
            url : this.searchURL + this.movieTitle
        }).then( response => {
            // this.movies = [response.data]
            this.movies.push(response.data);
            console.log(response.data);
            console.log(this.movies);
        }, error => {
            console.log(error);
        }).catch ( err => {
            console.log('Catch:' , err);
        })
    }

    //function to create user
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
    //function to log in
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
    //function to get the signed in user and display welcome
    this.getSignedInUser = function(){
        const controller = this;
        $http({
            method:'GET',
            url: '/sessions'
        }).then(function(response){
            controller.loggedInUsername = response.data.username;
            console.log(response);
        }, function(){
            console.log('error');
        });
    }
    // this.getMovies();
    // this.createMovies();
}]);
