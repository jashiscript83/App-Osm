var app = new Vue({
    el: '#app',
    data: {
        data: [],
        orquesta: [],
        orquestaEvents: [],
        camara: [],
        camaraEvents: [],
        otros: [],
        otrosEvents: [],
        salas: [],
        salasEvents: [],
        dataEvents: []





    },
    created: function () {
        this.getData();
        this.getPosts();
        this.block();

    },

    methods: {

        getData: function () {
            fetch("https://api.myjson.com/bins/1cr9oy", {
                method: "GET"

            }).then(function (response) {
                if (response.ok) {
                    console.log(2);

                    return response.json();
                }

            }).then(function (json) {
                app.data = json;
                console.log(app.data)
                app.orquesta = app.data.orchestra
                app.camara = app.data.camara
                app.otros = app.data.otros
                app.salas = app.data.salas




            }).catch(function (error) {
                console.log("Request failed:" + error.message);
            });


        },


        buttonCamara: function () {
            var camara = document.getElementById("camara")
            var osm = document.getElementById("osm")
            camara.style.display = "block"
            osm.style.display = "none";
            camara.style.backgroundImage = "url('styles/buena.jpg')";
            var link = event.target.getAttribute("data-index");
            this.camaraEvents = this.camara[link].events

        },
        buttonOtros: function () {
            var otros = document.getElementById("otros")
            var osm = document.getElementById("osm")
            otros.style.display = "block"
            osm.style.display = "none";
            otros.style.backgroundImage = "url('styles/metro.jpg')";
            var link = event.target.getAttribute("data-index");

            this.otrosEvents = this.otros[link].events

        },


        buttonsFive: function () {
            //            var contacto = document.getElementById("contacto")
            //            var osm = document.getElementById("osm")
            //            contacto.style.display = "block";
            //            osm.style.display = "none";

        },
        //        buttonsEntradas: function () {
        //            var entradas = document.getElementById("entradas")
        //            var osm = document.getElementById("osm")
        //            entradas.style.display = "block";
        //            osm.style.display = "none";
        //            var link = event.target.getAttribute("data-index");
        //
        //            this.camaraEvents = this.camara[link].events
        //
        //            this.otrosEvents = this.otros[link].events
        //            this.orquestaEvents = this.orquesta[link].events
        //            
        //            
        //
        //
        //        },

        buttonsLogin: function () {


            var contacto = document.getElementById("contacto")
            var osm = document.getElementById("osm")
            contacto.style.display = "block";
            osm.style.display = "none";

            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)

                .then(function () {

                    console.log(firebase.auth());



                })


                .catch(function () {

                    alert("Something went wrong");

                });

            var container = document.querySelector(".chatStyle");
            var scrollHeight = container.scrollHeight;
            container.scrollTop = scrollHeight;


        },
        buttonsOut: function () {
            firebase.auth().signOut().then(function () {

            }).catch(function (error) {

            });



        },


        dataBaseReal: function () {
            var osm = document.getElementById("osm")
            var salas = document.getElementById("salas")
            salas.style.display = "block";
            osm.style.display = "none";
            salas.style.backgroundImage = "url('styles/leones.jpg')";
            var link = event.target.getAttribute("data-index");
            this.salasEvents = this.salas[link].events


        },

        testFunction: function () {
            var Opera = document.getElementById("Opera")
            var osm = document.getElementById("osm")
            Opera.style.display = "block";
            osm.style.display = "none";
            Opera.style.backgroundImage = "url('styles/stage.jpg')";
            var link = event.target.getAttribute("data-index");
            this.orquestaEvents = this.orquesta[link].events

        },

        chatroom: function () {

            var container = document.querySelector(".chatStyle");
            var scrollHeight = container.scrollHeight;
            container.scrollTop = scrollHeight;
            var userName = firebase.auth().currentUser.displayName;
            var input = document.getElementById('message');
            var message = input.value;
            var photo = firebase.auth().currentUser.photoURL;
            var currentdate = new Date();
                    var datetime = +currentdate.getHours() + ":" +
                        currentdate.getMinutes();

            var post = {
                 datetime: datetime,
                photos: photo,
                name: userName,
                body: message

            };
            //            var text = document.getElementById('chatText');
            //            this.post = userName + ":" + " " + input.value + "<br>";
            //            text.innerHTML += this.post;
            var newPostKey = firebase.database().ref().child("Opera").push().key;

            input.value = "";

            var updates = {};

            updates[newPostKey] = post;



            return firebase.database().ref('Opera').update(updates);


        },

        getPosts: function () {




            firebase.database().ref('Opera').on('value', function (data) {
                var userName1 = firebase.auth().currentUser.displayName;
                var userName2 = "K.DARIO SOHRABI ROBLES"
                //                var image = firebase.auth().currentUser.photoURL;
                var posts = document.getElementById("chatText");




                posts.innerHTML = "";



                var messages = data.val();

                for (var key in messages) {

                    var div = document.createElement("div");
                    var text = document.createElement("p");
                    var element = messages[key];
//                    var currentdate = new Date();
//                    var datetime = +currentdate.getHours() + ":" +
//                        currentdate.getMinutes();



                    var images = document.createElement("img");
                    images.src = element.photos;


                    text.append(element.body );
                    div.append(images, text, element.datetime);

                    posts.append(div);
                    if (userName1 != element.name) {
                        div.style.border = "2px solid #795548";
                        div.style.backgroundColor = "#dea03b";
                        div.style.borderRadius = "47px";
                        div.style.fontWeight = "bolder";
                        div.style.fontSize = "25px";
                        text.style.fontSize = "30px";
                        div.style.fontFamily = "cursive";
                        div.style.margin = "1%";
                        div.style.width = "62%";
                        div.style.marginLeft = "auto";
                        images.style.width = "16%";
                       div.style.height = "17vh";
                        images.style.opacity = "inherit";
                     
                        


                    } else if (userName1 == element.name) {
                        div.style.border = "2px solid #795548";
                        div.style.backgroundColor = "#4CAF50";
                        div.style.borderRadius = "47px";
                        div.style.fontSize = "25px";
                        div.style.fontFamily = "cursive";
                        div.style.fontWeight = "bolder";
                        div.style.margin = "1%";
                         div.style.height = "17vh";
                        div.style.width = "62%";
                      
                        images.style.width = "16%";
                        images.style.opacity = "inherit";
                         text.style.fontSize = "30px";
                        
                    }




                    var container = document.querySelector(".chatStyle");
                    var scrollHeight = container.scrollHeight;
                    container.scrollTop = scrollHeight;




                }



            })


        }
        
//        block: function(){
//         var contact = document.getElementById("contacto")
//         
//         contact.screen.orientation.lock('landscape')
//        }

        //        scrollEnd: function (){
        //            var container = document.querySelector(".chatStyle");
        //            var scrollHeight = container.scrollHeight;
        //            container.scrollTop = scrollHeight;
        //            
        //            
        //        }
        //        scrollgo: function (){
        //            
        //            this.scrollEnd();
        //            
        //        },
        //        scrollgo: function(){
        //            this.scrollEnd();
        //        
        //    }
        //        



    }

})
