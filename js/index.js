var getEventData = function () {
	
	$.ajax({
		method: "GET",
		url: "https://api.github.com/events",
		dataType: 'json',
		success: function(json) {

			if (json) {

				// Iterate over each item returned from the call
				json.forEach(function(data) {

					// Save each piece of data individually
					var loginName = data.actor.login;
					var eventType = data.type;

					// Use RegEx function to format event type (add spaces)
					var formattedEvent = formatEvent(eventType);

					var repoName = data.repo.name;
					var userAvatar = data.actor.avatar_url;

					// Append the call to the #accordion div
					$("#accordion").append("<h3>" + repoName + "</h3>" +
											"<div class='container'>" +
											"<div class='userName'><span class='fieldTitle'>Username</span><br />" + loginName + "<br /><img src='" + userAvatar + "' /></div>" +
											"<div class='eventType'><span class='fieldTitle'>Event Type</span><br />" + formattedEvent + "</div>" +
											"<div class='repoLocation'><span class='fieldTitle'>Repo Location</span><br />" + "<a href='http://www.github.com/" + repoName + "'>Click For More Info </a>"
											+ "</div>" + "</div>"
											);

				});

			// Set a few options for the accordion
			var accordionOptions = {
				collapsible: true,
				heightStyle: "content",
				active: false
			}
			$("#accordion").accordion(accordionOptions);


			// If no JSON is returned
			} else {
				alert("Nothing returned!");
			}
		}
	});
}

$("#getData").click(getEventData);


// Regex function
function formatEvent(eventType) {

	var regex = /([a-z])([A-Z])/g;
	var str = eventType;
	str = str.replace(/([A-Z])/g, ' $1').trim();

	return str;

}