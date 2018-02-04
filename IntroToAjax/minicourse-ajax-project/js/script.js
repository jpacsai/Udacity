
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street').val();
    var $city = $('#city').val();

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    $("#form-container").append("<img class='bgimg' src='https://maps.googleapis.com/maps/api/streetview?size=600x400&location='/>");
    var $bgimg = $(".bgimg");
    $bgimg.attr("src", $bgimg.attr("src") + $street + ", " + $city);

    // YOUR CODE GOES HERE!

    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&q=" + $city + "&sort=newest&apikey=04783637e8264c5eabd5e5a7b5b3a533"
    $.getJSON(nytimesUrl, function(data) {
        $nytHeaderElem.text('New York Times articles about ' + $city);
        articles = data.response.docs;
        for (let i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + 
                '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + 
                '<p>' + article.snippet + '</p>' + '</li>');
        };
    }).error(function(e) {
        $nytHeaderElem.text('New York Times articles could not be loaded');
  });

    return false;
};

$('#form-container').submit(loadData);
