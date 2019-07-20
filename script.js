var articles = [];
var dates = [];
var titles = [];

var current_post = 0;

function ReadDate(date) {
	var i;
	for (i = 0; i < dates.length; i++) {
		if (dates[i] == date) {
			current_post = i;
		}
	}
}

function GetPosts() {
	var frame = document.getElementById("rawtext");
	var raw_string = frame.innerHTML;
	var raw_articles = raw_string.split("&gt;&gt;");
	
	var i;
	for (i = 0; i < raw_articles.length; i++) {
		var article, date, title;

		raw_date = raw_articles[i].split("\n")[0];
		title = raw_articles[i].split("\n")[1];
		article = raw_articles[i].substring(raw_date.length + title.length + 1);
		date = raw_date.substring(0, 2)
			+ raw_date.substring(2, 4)
			+ raw_date.substring(4)

		articles[i] = article;
		dates[i] = date;
		titles[i] = title;
	}
}

function RenderPost() {
	GetPosts();

	if (window.location.toString().split("#").length > 0) {
		ReadDate(window.location.toString().split("#")[1]);
	}

	var date = document.getElementsByClassName("h-date")[0];
	var article = document.getElementsByClassName("article")[0];
	title = document.getElementsByClassName("title")[0];

	title.style = "display: default;";

	var link = "<p class=\"permalink\">Share: <span class=\"permalink\">https://finghin.com/#" + dates[current_post] + "</span></p>";

	date.innerHTML = dates[current_post];
	article.innerHTML = "<br/>" + articles[current_post] + "<br/>" + link;
	title.innerHTML = titles[current_post];
}

function LastPost() {
	if (current_post < articles.length - 1) {
		current_post++;
		RenderPost();
	}
}

function RenderPostsList() {
	GetPosts();
	var article = document.getElementsByClassName("article")[0];

	var list = "";

	var i;
	for (i=0; i < dates.length; i++) {
		list += "<a href=\"#\" onClick=\"current_post =" + i + "; RenderPost();\">" + dates[i] + "</a>: ";
		list += titles[i] + "<br/>";
	}

	title.style = "display: none;";
	article.innerHTML = list;
}
