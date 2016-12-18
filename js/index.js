var getEventData = function () {

	$(".eventContainer").remove();
	$("#errorBlock").animate({ "opacity": "hide"}, 300);

	$.ajax({
		method: "GET",
		url: "https://api.github.com/events",
		dataType: 'json',
		success: function(json) {

			// Iterate over each item returned from the call
			json.forEach(function(data) {

				// Save each piece of data individually
				var loginName = data.actor.login;
				var eventType = data.type;
				var repoName = data.repo.name;
				var userAvatar = data.actor.avatar_url;

				// Use RegEx function to format event type (add spaces)
				var formattedEvent = formatEvent(eventType);

				// Slice string to obtain simple project title
				var projectName = sliceRepo(repoName);
					

				// Build string and append to table
				var dataString = buildString(loginName, formattedEvent, projectName, repoName, userAvatar);
				$(dataString).appendTo("#userTable");

				// Create accordion
				var accordion = document.getElementsByClassName("accordion");
				createAccordion(accordion);

			});
		},
		error: function(textStatus, errorThrown) {
			error(textStatus, errorThrown);
		}
	});
}

$("#getData").click(getEventData);

// Build string function
function buildString(user_name, event, project_name, repo_url, avatar_url) {
	
	var string = "<div class='eventContainer'>" +
						"<div class='accordion'>" + 
							"Project: " + "<span class='projectName'>" + project_name + "</span>" +
						"</div>" +
						"<div class='panel'>" +
							"<div class='userInfo'>" + 
								"<div class='caption'>" +
									"User Info:" +
								"</div>" +
								"<div class='image'>" +
									"<img src='" + avatar_url + "'>" +
								"</div>" +
								"<div class='userName'>" + 
									user_name + 
								"</div>" +
							"</div>" +
							"<div class='userEvent'>" +
								"<div class='caption'>" +
									"Event Type:" +
								"</div>" + 
								"<div class='event'>" + 
									event + 
								"</div>" +
							"</div>" +
							"<div class='userRepo'>" +
								"<div class='caption'>" +
									"Link To Repo:" +
								"</div>" +
								"<div class='repoLink'>" +
									"<a target='_blank' href='https://github.com/" + repo_url + "'>Click</a>" +
								"</div>" +
							"</div>" +
	 					"</div>" +
					"</div>"

	return string;
}

// Slice function for project name
function sliceRepo(repo) {

	var project = repo.substring(repo.indexOf("/") + 1);
	return project;
}

// Regex function for formatting event
function formatEvent(eventType) {

	var str = eventType;
	str = str.replace(/([A-Z])/g, ' $1').trim();

	return str;
}

// Create accordion function
function createAccordion(accordion) {

	for (var i = 0, len = accordion.length; i < len; i++) {
		accordion[i].onclick = function(){
	        this.classList.toggle("active");
	        this.nextElementSibling.classList.toggle("show");
		}
	}	
}

// Error handler 
function error(textStatus, errorThrown) {
	
	var message = textStatus + ": " + errorThrown;

	$("#errorBlock").text(message);
	$("#errorBlock").animate({ "opacity": "show"}, 300);
}