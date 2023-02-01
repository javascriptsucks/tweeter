/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const getDaysBefore = function(timeStamp) {
  const timeNow = new Date().getTime();
  return Math.round((timeNow - timeStamp) / 1000 / 3600 / 24);
};


const createTweetElement = function(tweet) {
  const tweetTemplate = `
      <article class="tweet-container none">
        <header class="tweet-header">
          <div class="tweet-avatar">
            <span><img src=${tweet['user']['avatars']} alt=${tweet.user.name}></span>
            <span>${tweet.user.name}</span>
          </div>
          <div class="tweet-acountName">${tweet.user.handle}</div>
        </header>
        <div class="tweet-body">
          <div>
            ${tweet.content.text}
          </div>
        </div>
        <footer class="tweet-footer">
          <span>${timeago.format(tweet.created_at)} days ago</span>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>

        </footer>
      </article>
    `;
  return tweetTemplate;
};

const renderTweets = function(tweets) {

  //Grab the data by looping all data by JQuery
  //return all array-like objects
  $.each(tweets, function($i, $eachTweet) {
    //
    const $tweet = createTweetElement($eachTweet);
    $('.main-container').append($tweet);
    $('.tweet-container').fadeIn(800);
  });
};

const sendTweetAJAX = function() {
  $('.newTweet-form').on('submit', function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $.post("/tweets", data,
      function(data) {
        console.log(`Text Data sent`);
      },
    );
    $(this).children('textarea').val('');
  });
};


$(document).ready(function() {

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      console.log(`Get request from tweet: ${data}`);
      renderTweets(data);
    });
  };

  loadTweets();


  //Render data files into real HTML elements
  //renderTweets(data);


  //Setting event listener on textarea form
  //Send posting request on /tweets with input value
  sendTweetAJAX();

});
