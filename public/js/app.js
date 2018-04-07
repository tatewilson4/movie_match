const app = angular.module('Moviematch', []);

app.controller('MainController',['$http', function($http) {
    this.appName = "Movie Match";
    this.indexOfLogFormToShow = null;
    this.indexOfCreateFormToShow = null;
    this.indexOfLogoutFormToShow = null;
    this.showInfo = false;

    const controller = this;
    this.movies = [];
    this.watchList = [];
    this.getUserWatchlists = [];
    this.logout = ''

    this.baseURL = 'http://www.omdbapi.com/?';
    this.apikey = 'apikey=' + 'd7e24dcc';
    this.query = 't=';
    this.movieTitle = '';
    this.searchURL = this.baseURL + this.apikey + '&' + this.query;

    this.toggleInfo = () => {
        this.showInfo = !this.showInfo;
        console.log(this.showInfo);
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

    // console.log(this.movieTitle);


    //Create User Watchlist
    this.createUserWatchlist = (user) => {
        $http({
            method: 'POST',
            url:'/movies',
            data: this.movies
        }).then(response => {
            this.watchList.push(response.data);
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

    //shows logged in users watchlist
    this.showUserWatchlist = () => {
        $http({
            method: 'GET',
            url: '/users/' + controller.savedData.username
        }).then(response => {
            controller.getUserWatchlist = response.data;
            controller.getUserWatchlists = this.getUserWatchlist[0];
            console.log(response.data);
        }, error => {
            console.log(error);
        });
    };


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
            controller.savedData = response.config.data;
            this.loggedInUsername = this.username;
            console.log(controller.savedData);
            console.log(response);
        }, function(){
            console.log('error');
        });
    }


    this.logOut = function(){
        $http({
            method: 'DELETE',
            url: '/sessions',
        }).then(function(response){
            this.logout = response.data
            console.log(response);
        }, function(){
            console.log('error');
        });
    }

    // this.showUserWatchlist();
    // this.getWatchlist();

}]);
