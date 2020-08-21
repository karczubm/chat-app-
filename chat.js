
function Chat() {
    this.update = updateChat;
    this.send = sendChat;
    this.login = login;
    this.isLoggedIn = isLoggedIn;
}

function login(userName, password) {
    $.ajax({
        type: "GET",
        url: "requestHandler.php",
        data: { 'action': 'login', 'userName': userName, 'password': password },
        dataType: "json",
        success: function (response) {
            //if login successful get back a username
            if (!response.username) {
                alert("Wrong username or password!");
            } else {
                //swap loginform to userdata
                $('#login-wrap').html("<p id='name'>" + response.username + "</p>");
            }
        }, error: function (response) {
            console.log(JSON.stringify(response));
        }
    })
}

//for page reaload
function isLoggedIn() {
    $.ajax({
        type: "GET",
        url: "requestHandler.php",
        data: { 'action': 'isLoggedIn' },
        dataType: "json",
        success: function (response) {
            //swap loginform to userdata if logged in
            if (response.isLoggedIn) {
                $('#login-wrap').html("<p id='name'>" + response.userName + "</p>")
            }
        }, error: function (response) {
            console.log(JSON.stringify(response));
        }
    })
}

function updateChat() {
    //get the id of last massege or set it for first load
    let lastId = $('#chat-area').children('span').last().attr('id');
    if (!lastId) {
        lastId = 0;
    }

    $.ajax({
        type: "GET",
        url: "requestHandler.php",
        data: { 'action': 'updateChat', 'last_id': lastId },
        dataType: "json",
        success: function (response) {
            //compare the server n client side last message ids.
            let post_html = "";
            let arLength = response.postsArr.length;
            if (Array.isArray(response.postsArr) && arLength) {
                if (response.postsArr[arLength - 1].id !== lastId) {
                    // displays news.
                    for (let i = 0; i < arLength; i++) {
                        let post = response.postsArr[i];
                        //response contains only new messages, doublecheck
                        if (post.id > lastId) {
                            post_html = "<span class='post' id=" + post.id + ">" + post.userName + ": " + post.post_text + "</span><br>";
                            $('#chat-area').append(post_html);

                        }
                    }
                    //scroll down after new message(s) displayed
                    $("#chat-wrap").animate({ scrollTop: $("#chat-wrap")[0].scrollHeight }, 1000);
                }
            }

        }, error: function (response) {
            console.log(JSON.stringify(response));
        }
    });
}

function sendChat(message) {
    $.ajax({
        type: "POST",
        url: "requestHandler.php",
        data: { 'action': 'newPost', 'message': message },
        dataType: "json",
        success: function (response) {
            //server side check for login. if successful, next update displays the message
            if (!response.isLoggedIn) {
                alert("Messaging is allowed only for logged in users!");
            }
        }, error: function (response) {
            console.log(JSON.stringify(response));
        }
    });
}