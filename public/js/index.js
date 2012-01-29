var id;
var token;



$(document).ready(function(){
  $('#like').click(function(){
    now.vote(id, token);
    $('#like').prop('disabled', true);
  });
  
  now.change = function(title, i) {
    $('#like').prop('disabled', false);
    $('#cur').text(title);
    id = i;
  }

  now.finish = function(scores){
    $('#body').empty();
    scores.sort(function sortNumber(a,b)  {
      return a.score - b.score;
    });
    for(var i in scores) {
      $("<h1></h1>").text(scores[i].title + ": " + scores[i].score + " likes").appendTo('#body');
    }
  }
});

window.fbAsyncInit = function() {
    FB.init({      
      appId      : '302829396430988', // App ID
      channelUrl : '//www.petermcottle.com/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true,  // parse XFBML 
      oatuh      : true,
    });            // Additional initialization code here 
      fbLogin();
  };
  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     d.getElementsByTagName('head')[0].appendChild(js);
   }(document));

var fbLoginResponse;

function fbLogin() {
    FB.login(function(response)
    {
        if(response.authResponse) {
            token = response.authResponse.accessToken;
            $.getJSON('/token/'+token);
            fbLoginResponse = response;

            startFacebookStuff();

         } else { 
             alert('login failed, try again');
         }
    },{scope:'user_about_me'});
}

function startFacebookStuff() {
    $('#login').fadeOut();
    $('#body').css({opacity: 1});
}