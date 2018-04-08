const app = angular.module('Moviematch', []);

app.controller('MainController',['$http', function($http) {
    this.appName = "Movie Match";
    this.indexOfLogFormToShow = null;
    this.indexOfCreateFormToShow = null;
    this.indexOfLogoutFormToShow = null;
    this.indexOfEditFormToShow = null;
    this.showInfo = false;

    const controller = this;
    this.guests = [];
    this.movies = [];
    this.watchList = [];
    this.user_list = [];
    this.getUserWatchlists = [];
    this.logout = '';

    this.baseURL = 'https://www.omdbapi.com/?';
    this.apikey = 'apikey=' + 'd7e24dcc';
    this.query = 't=';
    this.movieTitle = '';
    this.searchURL = this.baseURL + this.apikey + '&' + this.query;

    this.toggleInfo = () => {
        this.showInfo = !this.showInfo;
        console.log(this.showInfo);
    }



        //function to get the signed in user and display welcome
        this.checkLoggedIn = function(){
            $http({
                method: 'GET',
                url: '/app'
            }).then( response => {
                this.loggedInUsername = response.data.username;
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
                username: this.username,
                password: this.password
            }
        }).then(function(response){
            console.log(response);
        }, function(){
            console.log('error');
        });
    }

    //create movie for community board
    this.createComMovie = function(){
        $http({
            method: 'POST',
            url: '/guests',
            data: {
                title: this.title,
                year: this.year,
                poster: this.poster,
                actors: this.actors,
                genre: this.genre,
                metascore: this.metascore,
                comments: this.comments
            }
        }).then( response => {
            this.getComMovies();
            console.log(response.data);
        }, error => {
            console.log(error);
        });
    }

    //get movies for community board
    this.getComMovies = function(){
        $http({
            method: 'GET',
            url: '/guests'
        }).then( response => {
            this.guests = response.data
            console.log(response.data);
        }, error => {
            console.log(error);
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
            this.getUserWatchlist = response.data;
            this.getUserWatchlists = this.getUserWatchlist[0];
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
                username: this.username,
                password: this.password
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
    //edit community guest board post
    this.editMovie = function(guest){
        $http({
            method: 'PUT',
            url: 'guests/' + guest._id,
            data: {
                title: this.updatedTitle,
                year: this.updatedYear,
                poster: this.updatedPoster,
                actors: this.updatedActors,
                genre: this.updatedGenre,
                metascore: this.updatedMetascore,
                comments: this.updatedComments
            }
        }).then( response => {
            this.getComMovies();
        }, error => {
            console.log(error);
        });
    }

    //delete community board movie
    this.deleteComMovie = function(guest){
        $http({
            method: 'DELETE',
            url: '/guests/' + guest._id
        }).then( response => {
            this.getComMovies();
        }, error => {
            console.log(error);
        });
    }

    //logout function
    this.logOut = function(){
        $http({
            method: 'DELETE',
            url: '/sessions',
        }).then( response => {
            this.logOut = response.data
            console.log(response);
        }, error => {
            console.log(error);
        });
    }
    this.getComMovies();
    // this.showUserWatchlist();
    // this.getWatchlist();

}]);
