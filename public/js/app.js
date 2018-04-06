const app = angular.module('Moviematch', []);

app.controller('MainController',['$http', function($http) {
    this.appName = "Movie Match";
    this.indexOfLogFormToShow = null;
    this.indexOfCreateFormToShow = null;
    const controller = this;
    this.movies = [];
    this.watchList = [];
    this.getUserWatchlist = [];

    this.baseURL = 'http://www.omdbapi.com/?';
    this.apikey = 'apikey=' + 'd7e24dcc';
    this.query = 't=';
    this.movieTitle = '';
    this.searchURL = this.baseURL + this.apikey + '&' + this.query;

    this.toggleInfo = () => {
        this.showWatchList = !this.showWatchList;
    }

    // console.log(this.movieTitle);


    //Create User Watchlist
    this.createUserWatchlist = (user) => {
        $http({
            method: 'POST',
            url:'/movies',
            data: this.movies
        }).then(response => {
            this.watchList = response.data;
            // this.watchList.push(response.data);
            // this.getWatchlist();
            $http({
                method: 'PUT',
                url: '/users/' + controller.savedData.username,
                data: this.watchList
            }).then(response => {
                this.user_list = response.data;
                console.log(response);
            }, error => {
                console.log(error);
            })
        }, error => {
            console.log(error);
        }).catch (err => {
            console.log('Catch: ', err);
        })
    }


    this.showUserWatchlist = () => {
        $http({
            method: 'GET',
            url: '/users/' + controller.savedData.username
        }).then(response => {
            this.getUserWatchlist = response.data;
            console.log(response.data);
        }, error => {
            console.log(error);
        });
    };


    // Get Movies
    this.getMovies = ()=>{
        $http({
            method: 'GET',
            url : this.searchURL + this.movieTitle
        }).then( response => {
            // this.movies = response.data;
            this.movies.push(response.data);
            console.log(response.data);
            // console.log(this.movies);

        }, error => {
            console.log(error);
        }).catch ( err => {
            console.log('Catch:' , err);
        })
    }




    // Create User
    this.createUser = function(){
        $http({
            method:'POST',
            url: '/users',
            data: {
                username: controller.username,
                password: controller.password
            }
        }).then(function(response){
            console.log(response);
        }, function(){
            console.log('error');
        });
    }

    // Login
    this.logIn = function(){
        $http({
            method:'POST',
            url: '/sessions',
            data: {
                username: controller.username,
                password: controller.password
            }
        }).then(function(response){
            // this.getSignedInUser();
            controller.savedData = response.config.data
            console.log(controller.savedData);
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
            controller.loggedInUser = response.data;
            console.log(response);
        }, function(){
            console.log('error');
        });
    }
    // this.showUserWatchlist();
    // this.getWatchlist();

}]);
