// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(event){
	// Get values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;
	
	if(!validateForm(siteName, siteURL)){
		return false;
	}
	
	var bookmark = {
		name: siteName,
		url: siteURL
	}

	// Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// Create array & add to it
		var bookmarks = [];
		bookmarks.push(bookmark);
		
		// Set to LocalStorage
		// This turns the item into a string before it's save to the local storage!! It will be a string formatted JSON array
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from LS
		// You want to parse it as JSON. JSON parse will turn into JSON, vice versa (string)
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to array
		bookmarks.push(bookmark);
		// re-set back to LS
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	
	// clear 
	document.getElementById('myForm').reset();
	
	//re-fetch bookmarks
	fetchBookmarks();
	
	//Prevent submission
	event.preventDefault();
}

// Delete Bookmark 
function deleteSite(url){
	// get bookmakrs from LS
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i, 1);	
		}
	}
	// re-set back to LS
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	//re-fetch bookmarks
	fetchBookmarks();
}



// that's so Fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	// Get output id
	var results = document.getElementById('results');
	
	// build output
	results.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		
		results.innerHTML += '<div class="item">'+
							 '<h3>' + name + '</h3>' +
							 '<a class="btn blue" target="_blank" href="'+url+'">Visit</a> ' +
							 '<a onclick="deleteSite(\''+url+'\')" class="btn red" href="#">Delete</a> ' +
							 '</div>';
	}
}

function validateForm(siteName, siteURL){
	if(!siteName || !siteURL){
		alert('Please fill in the form');
		return false;
	}
	
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	
	if(!siteURL.match(regex)){
		alert('Please use a valid URL');
		return false;
	}
	
	return true;
}

// Notes
/*// Local Storage
	localStorage.setItem('test', 'Sup world');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
*/