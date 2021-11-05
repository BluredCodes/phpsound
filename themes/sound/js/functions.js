'use strict';

function autosize() {
	// auto adjust the height of
	jQuery('body').on('keyup', '.message-comment-box-form > textarea', function (){
		jQuery(this).height(0);
		jQuery(this).height((this.scrollHeight-15));
	});
	// jQuery('body').find('textarea.comment-reply-textarea').keyup();
}
function showButton(id) {
	jQuery('#comment_btn_'+id).fadeIn('slow');
}
function loadChat(uid, username, block, cid, start) {
	if(!cid) {
		jQuery('.header-loader').show();
	} else {
		jQuery('.load-more-chat').html('<div class="preloader-retina preloader-center"></div>');
	}
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_chat.php",
		data: "uid="+uid+"&cid="+cid+"&start="+start+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			// Remove the loader animation
			if(!cid) {
				jQuery('.chat-container').empty();
				jQuery('.header-loader').hide();
				jQuery('#chat').attr('class', 'chat-user'+uid);
			} else {
				jQuery('.load-more-chat').remove();
			}

			if(block) {
				doBlock(uid, 0);
			}

			// Append the new comment to the div id
			jQuery('.chat-container').prepend(html);

			if(username) {
				jQuery('.chat-username').html(username);
				jQuery(".chat-container").scrollTop(jQuery(".chat-container")[0].scrollHeight);
			}

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();
		}
	});
}
function loadComments(id, cid, start) {
	jQuery('#comments'+id).html('<div class="preloader-retina preloader-center"></div>');
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_comments.php",
		data: "id="+id+"&start="+start+"&cid="+cid+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			// Remove the loader animation
			jQuery('#comments'+id).remove();

			// Append the new comment to the div id
			jQuery('#comments-list'+id).append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();
		}
	});
}
function exploreTracks(start, filter) {
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	if(filter == '') {
		window.q = '';
	} else {
		window.q = '&filter='+filter;
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_explore.php",
		data: "start="+start+q+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();

			// Update the Track Information
			updateTrackInfo(nowPlaying);
		}
	});
}
function searchTracks(start, value, filter) {
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	if(filter == '') {
		window.q = '';
	} else {
		window.q = '&filter='+filter;
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_search.php",
		data: "start="+start+'&q='+encodeURIComponent(value)+q+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();

			// Update the Track Information
			updateTrackInfo(nowPlaying);
		}
	});
}
function loadStream(start, filter) {
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	if(filter == '') {
		window.q = '';
	} else {
		window.q = '&filter='+filter;
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_stream.php",
		data: "start="+start+q+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();

			// Update the Track Information
			updateTrackInfo(nowPlaying);
		}
	});
}
function loadHistory(start, filter) {
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	if(filter == '') {
		window.q = '';
	} else {
		window.q = '&filter='+filter;
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_history.php",
		data: "start="+start+q+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();

			// Update the Track Information
			updateTrackInfo(nowPlaying);
		}
	});
}
function loadPeople(start, value, filter) {
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	if(filter == '') {
		window.q = '';
	} else {
		window.q = '&filter='+filter;
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_people.php",
		data: "start="+start+'&q='+encodeURIComponent(value)+q+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();
		}
	});
}
function loadProfile(start, filter, profile) {
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	if(filter == '') {
		window.q = '';
	} else {
		window.q = '&filter='+filter;
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_profile.php",
		data: "profile="+profile+"&start="+start+q+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();

			// Update the Track Information
			updateTrackInfo(nowPlaying);
		}
	});
}
function loadPlaylists(start, type, query) {
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_playlists.php",
		data: "query="+query+"&start="+start+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();
		}
	});
}
function loadLikes(start, profile, type) {
	// Type 1: Returns the likes from a user
	// Type 2: Returns the likes from a track
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');
	if(type == 2) {
		var query = "start="+start+'&query='+profile+'&type=2';
	} else {
		var query = "start="+start+'&profile='+profile+'&type=1';
	}
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_likes.php",
		data: query+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();

			// Update the Track Information
			updateTrackInfo(nowPlaying);
		}
	});
}
function loadSubs(start, type, profile) {
	jQuery('#load-more').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_subs.php",
		data: "id="+profile+"&start="+start+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#load-more').remove();

			// Append the new comment to the div id
			jQuery('#main-content').append(html);
		}
	});
}
function postComment(id) {
	var comment = jQuery('#comment-form'+id).val();

	jQuery('#post_comment_'+id).html('<div class="preloader-retina-large preloader-center"></div>');

	// Remove the post button
	jQuery('#comment_btn_'+id).fadeOut('slow');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/post_comment.php",
		data: "id="+id+"&comment="+encodeURIComponent(comment)+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			// Remove the loader animation
			jQuery('#post_comment_'+id).html('');

			// Append the new comment to the div id
			jQuery('#comments-list'+id).prepend(html);

			// Fade In the style="display: none" class
			jQuery('.message-reply-container').fadeIn(500);

			// Reload the timeago plugin
			jQuery("div.timeago").timeago();

			// Empty the text area
			jQuery('#comment-form'+id).val('');
		}
	});
}
function addInPlaylist(track, id) {
	// Track: The track ID
	// ID: The playlist ID
	jQuery('#playlist-entry'+id).attr('class', 'playlist-entry-loading');
	jQuery('#playlist-entry'+id).removeAttr('onclick');
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/manage_playlists.php",
		data: "id="+track+"&playlist="+id+"&type=3&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#playlist-entry'+id).replaceWith(html);
			if(window.location.search.indexOf('playlist') > -1 && window.location.search.indexOf(id) > -1) {
				if(html.indexOf('added') == -1) {
					jQuery('#track'+track).fadeOut(400, function() { jQuery('#track'+track).remove(); });
					playlist('0', '0');
				}
			}
		}
	});
}
function playlist(id, type) {
	// ID: Track ID
	// Type 0: Close the Playlist modal
	// Type 1: Playlist [Load Playlists]
	// Type 2: Add new playlist

	if(type == 0) {
		// Hiden Modal, Background, Tab contents
		jQuery('#playlist').fadeOut();
		jQuery('.modal-background').fadeOut();
		jQuery('.tab-share,.tab-embed').fadeOut();
	} else if(type == 1) {
		// Store the track id to be used when creating new playlist
		window.track_id = id;
		// Show Modal, Background, Share Tab
		jQuery('#playlist').fadeIn();
		jQuery('#playlists').html('');
		jQuery('.modal-background').fadeIn();
		jQuery('.tab-playlist, .modal-loading').show();

		// Set dynamic size for playlist name input
		jQuery('#playlist-name').width((jQuery('.tab-playlist').width()-70)-jQuery('#playlist-save').width());

		// Rounds the width for IE [keeps the button inline]
		jQuery('#playlist-save').width(jQuery('#playlist-save').width());

		// Add active class on tab
		jQuery('#tab-playlist').addClass('modal-menu-item-active').siblings().removeClass('modal-menu-item-active');

		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/manage_playlists.php",
			data: "id="+id+"&type="+type+"&token_id="+token_id,
			cache: false,
			success: function(html) {
				jQuery('#playlists').html(html);
				jQuery('.modal-loading').hide();
			}
		});
	} else if(type == 2) {
		var name = jQuery('#playlist-name').val();
		jQuery('.modal-loading').show();
		jQuery('#playlist-name').val('');
		jQuery('#add-category').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/manage_playlists.php",
			data: "id="+track_id+"&name="+encodeURIComponent(name)+"&type="+type+"&token_id="+token_id,
			cache: false,
			success: function(html) {
				jQuery('#playlists').prepend(html);
				jQuery('.modal-loading').hide();
			}
		});
	}
}
function connect(type) {
	// Type 0: Register
	// Type 1: Login

	jQuery('.modal-loading').show();

	if(type == 1) {
		jQuery('#login-button').removeAttr('onclick');

		var username = jQuery('.tab-login input[name="username"]').val();
		var password = jQuery('.tab-login input[name="password"]').val();
		var remember = jQuery('.tab-login #remember-me').is(':checked') ? 1 : 0;

		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/connect.php",
			data: "username="+username+"&password="+password+"&remember="+remember+"&login=1",
			cache: false,
			success: function(html) {
				if(html == 1) {
					location.reload();
				} else {
					jQuery('.modal-loading').hide();
					jQuery('#login-message').html(html);
					jQuery('#login-button').attr('onclick', 'connect(1)');
				}
			}
		});
	} else {
		jQuery('#register-button').removeAttr('onclick');
		var username = jQuery('.tab-register input[name="username"]').val();
		var password = jQuery('.tab-register input[name="password"]').val();
		var agreement = jQuery('.tab-register input[name="agreement"]').is(":checked") ? 1 : 0;
		var email = jQuery('.tab-register input[name="email"]').val();
		var captcha = jQuery('.tab-register input[name="captcha"]').val();

		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/connect.php",
			data: "username="+username+"&password="+password+"&email="+email+"&agreement="+agreement+"&captcha="+captcha+"&register=1",
			cache: false,
			success: function(html) {
				if(html == 1) {
					location.reload();
				} else {
					jQuery('.modal-loading').hide();
					jQuery('#captcha-register').html('<img src="'+baseUrl+'/includes/captcha.php?cache='+(+new Date)+'">');
					jQuery('#register-message').html(html);
					jQuery('#register-button').attr('onclick', 'connect(0)');
				}
			}
		});
	}
}
function connect_modal() {
	if(jQuery('#connect').is(':hidden')) {
		jQuery('#connect').fadeIn();
		jQuery('.modal-background').fadeIn();
		jQuery('.tab-login').show();

		// Add active class on tab
		jQuery('#tab-login').addClass('modal-menu-item-active').siblings().removeClass('modal-menu-item-active');
	}
}
function delete_modal(id, type) {
	// Type 1: Delete Track
	// Type 3: Delete Playlist
	if(type == 1) {
		jQuery('#delete').fadeIn();
		jQuery('.modal-background').fadeIn();
		jQuery('.tab-delete, #delete-track').show();
		jQuery('#delete-playlist').hide();
	} else if(type == 3) {
		jQuery('#delete').fadeIn();
		jQuery('.modal-background').fadeIn();
		jQuery('.tab-delete, #delete-playlist').show();
		jQuery('#delete-track').hide();
	} else if(type == 'cancel') {
		jQuery('#delete').fadeOut();
		jQuery('.modal-background').fadeOut();
	}
	jQuery('#delete-button').attr('onclick', 'delete_the('+id+', '+type+')');
}
function share(id, type) {
	// ID: Track ID
	// Type 0: Close the Share modal
	// Type 1: Share Track
	// Type 2: Share Playlist

	if(type == 0) {
		// Hiden Modal, Background, Tab contents
		jQuery('#share').fadeOut();
		jQuery('.modal-background').fadeOut();
		jQuery('.tab-share,.tab-embed').fadeOut();
		jQuery('#autoplay').prop('checked', false);
	} else {
		// Show Modal, Background, Share Tab
		jQuery('#share').fadeIn();
		jQuery('.modal-background').fadeIn();
		jQuery('.tab-share').show();
		jQuery('#tab-embed').show(); // Prevent it from being left hidden on Playlist Page

		// Add active class on tab
		jQuery('#tab-share').addClass('modal-menu-item-active').siblings().removeClass('modal-menu-item-active');

		var url = jQuery("#song-url"+id).attr('href');
		// Set the URL to share
		if(type == 1) {
			jQuery('#share-url').val(url);
			if(url.indexOf(baseUrl+'/track/') > -1) {
				var url = url.substring(0, url.lastIndexOf("/") + 1).replace(baseUrl+'/track/', baseUrl+'/embed.php?id=');
				var url = url.substr(0, url.length-1);
			} else {
				var url = url.replace('index.php?a=track&', 'embed.php?');
			}
			jQuery('#embed-url').val('<iframe width="100%" height="140" frameborder="no" scrolling="no" src="'+url+'"></iframe>');
			jQuery('.dummy-artwork').html('<img src="'+jQuery("#song-art"+id).attr('src')+'">');
		} else if(type == 2) {
			jQuery('#share-url').val(jQuery("#playlist-url"+id).attr('href'));
			// Hide the Embed tab for Playlists
			jQuery('#tab-embed').hide();
		}
		// Auto-Select the URL to share
		jQuery('#share-url').select();

		// Show Modal Button
		jQuery('.modal-btn').show();

		// Add attributes to social icons
		jQuery('#fb-share').attr('onclick', 'doShare(1, '+type+', '+id+')');
		jQuery('#tw-share').attr('onclick', 'doShare(2, '+type+', '+id+')');
		jQuery('#pn-share').attr('onclick', 'doShare(4, '+type+', '+id+')');
		jQuery('#em-share').attr('onclick', 'doShare(5, '+type+', '+id+')');
		jQuery('#rd-share').attr('onclick', 'doShare(6, '+type+', '+id+')');
		jQuery('#tb-share').attr('onclick', 'doShare(8, '+type+', '+id+')');
		jQuery('#li-share').attr('onclick', 'doShare(7, '+type+', '+id+')');
	}
}
function doShare(social, type, id) {
	// Social 1: Facebook
	// Social 2: Twitter
	// Social 4: Pinterest
	// Social 5: Mail

	// Type 1: Song
	// Type 2: Playlist

	if(type == 1) {
		var url = encodeURIComponent(jQuery("#song-url"+id).attr('href'));
		var title = encodeURIComponent(jQuery("#song-name"+id).text());
		var art = encodeURIComponent(jQuery("#song-art"+id).attr('src'));
	} else {
		var url = encodeURIComponent(jQuery("#playlist-url"+id).attr('href'));
		var title = encodeURIComponent(jQuery("#playlist-name"+id).text());
		var art = encodeURIComponent(jQuery("#playlist-art"+id).attr('src'));
	}

	if(social == 1) {
		popupCenter("https://www.facebook.com/sharer/sharer.php?u="+url, title, 550, 300);
	} else if(social == 2) {
		popupCenter("https://twitter.com/intent/tweet?text="+title+"&url="+url, title, 550, 250);
	} else if(social == 4) {
		popupCenter("https://pinterest.com/pin/create/button/?url="+url+"&description="+title+"&media="+art, title, 500, 300);
	} else if(social == 5) {
		window.open("mailto:?Subject="+title+"&body="+title+" - "+url, "_self");
	} else if(social == 6) {
		popupCenter("http://www.reddit.com/submit?url="+url, title, 550, 530);
	} else if(social == 7) {
		popupCenter("https://www.linkedin.com/sharing/share-offsite/?url="+url, title, 550, 300);
	} else if(social == 8) {
		popupCenter("https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url="+url+"&posttype=link&title="+title+"&caption=&content="+url, title, 550, 300);
	}
}
/**
 * Center the pop-up window
 *
 * @param url
 * @param title
 * @param w
 * @param h
 */
function popupCenter(url, title, w, h) {
	// Fixes dual-screen position                         Most browsers      Firefox
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

	var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	var systemZoom = width / window.screen.availWidth;
	var left = (width - w) / 2 / systemZoom + dualScreenLeft
	var top = (height - h) / 2 / systemZoom + dualScreenTop
	var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

	// Puts focus on the newWindow
	if (window.focus) newWindow.focus();
}
function delete_the(id, type) {
	// id = unique id of the message/comment/chat/playlist
	// type = type of post: message/comment/chat/playlist
	if(type == 0) {
		jQuery('#del_comment_'+id).html('<div class="preloader-retina"></div>');
	} else if(type == 1) {
		jQuery('.modal-loading').show();
		jQuery('#delete-button').removeAttr('onclick');
	} else if(type == 2) {
		jQuery('#del_chat_'+id).html('<div class="preloader-retina"></div>');
	} else if(type == 3) {
		jQuery('.modal-loading').show();
		jQuery('#delete-button').removeAttr('onclick');
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/delete.php",
		data: "id="+id+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			if(type == 0) {
				jQuery('#comment'+id).fadeOut(500, function() { jQuery('#comment'+id).remove(); });
			} else if(type == 1) {
				jQuery('#track'+id).fadeOut(400, function() { jQuery('#track'+id).remove(); });
				jQuery('#delete, .modal-background, .modal-loading').fadeOut();

				// If the deletion happened on the track page, reload the page
				if(window.location.pathname.indexOf('track') > -1) {
					location.reload();
				}
			} else if(type == 2) {
				jQuery('#chat'+id).fadeOut(500, function() { jQuery('#chat'+id).remove(); });
			} else if(type == 3) {
				jQuery('#playlist'+id).fadeOut(400, function() { jQuery('#playlist'+id).remove(); });
				jQuery('#delete, .modal-background, .modal-loading').fadeOut();

				// If the deletion happens on the playlist page, reload the page
				if(window.location.pathname.indexOf('playlists') < 0) {
					location.reload();
				}
			}
		}
	});
}
function report_the(id, type) {
	// id = unique id of the message/comment
	// type = type of post: message/comment

	if(type == 0) {
		jQuery('#comment'+id).html('<div class="message-reported"><div class="preloader-retina"></div></div>');
	} if(type == 1) {
		jQuery('#message'+id).html('<div class="message-reported"><div class="preloader-retina-large preloader-center"></div></div>');
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/report.php",
		data: "id="+id+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			if(type == 0) {
				jQuery('#comment'+id).html('<div class="message-reported">'+html+'</div>');
			} if(type == 1) {
				jQuery('#message'+id).html('<div class="message-content"><div class="message-inner">'+html+'</div></div>');
			}
		}
	});
}
function subscribe(id, type, z) {
	// id = unique id of the viewed profile
	// type = if is set, is an insert/delete type
	// z if on, activate the sublist class which sets another margin (friends dedicated profile page)

	if(z == 1) {
		jQuery('#subscribe'+id).html('<div class="sub-loading subslist"></div>');
	} else {
		jQuery('#subscribe'+id).html('<div class="sub-loading"></div>');
	}
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/subscribe.php",
		data: "id="+id+"&type="+type+"&z="+z+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#subscribe'+id).html(html);
		}
	});
}
function deleteNotification(type, id) {
	if(type == 0) {
		jQuery('#notification'+id).fadeOut(500, function() { jQuery('#notification'+id).remove(); });
	} else if(type == 1) {
		jQuery('#post_comment_'+id).fadeOut(500, function() { jQuery('#post_comment_'+id).remove(); });
	}
}
function privacy(id, value, type) {
	// id = unique id of the message/comment
	// value = value to set on the post
	// type 0 = tracks, 1 = playlists
	if(type == 1) {
		var id_type = '-pl';
	} else {
		var id_type = '';
	}
	jQuery('#privacy'+id_type+id).empty();
	jQuery('#privacy'+id_type+id).html('<div class="loading-button"></div>');
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/privacy.php",
		data: "track="+id+"&value="+value+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#privacy'+id_type+id).empty();
			if(html == 1) {
				if(value == 1) {
					var newVal = 0;
					var newClass = 'public';
					jQuery('#comment_box_'+id).show('slow');
				} else if(value == 0) {
					var newVal = 1;
					var newClass = 'private';
					jQuery('#comment_box_'+id).hide('slow');
				}
			jQuery('#privacy'+id_type+id).html('<div class="'+newClass+'-button" onclick="privacy('+id+', '+newVal+', '+type+')" title="This '+((type) ? 'playlist' : 'track')+' is '+newClass+'"></div>');
			}
		}
	});
}
function manage_the(start, type) {
	if(type == 2) {
		type = 'payments';
	} else if(type == 1) {
		type = 'reports';
	} else {
		type = 'users';
	}
	jQuery('#more_'+type).html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/manage_"+type+".php",
		data: "start="+start+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#more_'+type).remove();

			// Append the new comment to the div id
			jQuery('#'+type).append(html);
		}
	});
}
function manage_report(id, type, post, kind) {
	jQuery('#report'+id).html('<div class="preloader-retina"></div>');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/manage_reports.php",
		data: "id="+id+"&type="+type+"&post="+post+"&kind="+kind+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			if(html == '1') {
				jQuery('#report'+id).fadeOut(500, function() { jQuery('#message'+id).remove(); });
			} else {
				jQuery('#report'+id).html('Sorry, but something went wrong, please refresh the page and try again.');
			}
		}
	});
}
function manage_categories(id, type) {
	// type 1 insert category, 0 delete category
	if(type == '0') {
		jQuery('#category'+id).html('<div class="preloader-retina"></div>');
	} else {
		var id = jQuery('#category').val();
		jQuery('#category').val('');
		jQuery('#add-category').html('<div class="load_more"><div class="preloader-retina-large preloader-center"></div></div>');
	}

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/manage_categories.php",
		data: "id="+id+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			if(type == '0') {
				if(html == '1') {
					jQuery('#category'+id).fadeOut(500, function() { jQuery('#category'+id).remove(); });
				} else {
					jQuery('#category'+id).html('Sorry, but something went wrong, please refresh the page and try again.');
				}
			} else {
				jQuery('#categories').prepend(html);
				jQuery('#add-category').html('');
			}
		}
	});
}
function addDownload(id) {
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/download.php",
		data: "id="+id+"&token_id="+token_id,
		cache: false,
		success: function(html) {

		}
	});
}
function doLike(id, type) {
	// id = unique id of the message
	// type = 1 do the like, 2 do the dislike
	jQuery('#like_btn'+id).html('<div class="small-loader"></div>');
	jQuery('#doLike'+id).removeAttr('onclick');
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/like.php",
		data: "id="+id+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('#track-action'+id).empty();
			jQuery('#track-action'+id).html(html);
		}
	});
}
function doBlock(id, type) {
	// id = unique id of the message
	// type 0: do nothing, just display the block, type 1: do/undo block
	jQuery('.blocked-button').html('<div class="small-loader"></div>');
	jQuery('#blocked'+id).remove();
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/block.php",
		data: "id="+id+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			jQuery('.blocked-button').html(html);
		}
	});
}
function showNotification(x, y) {
	// Y1: Show the global notifications
	// Y2: Show the messages notifications
	if(x == 'close') {
		jQuery('.notification-container').hide();
		jQuery('#messages_btn').removeClass('menu_hover_messages');
		jQuery('#notifications_btn').removeClass('menu_hover_notifications');
		// Check the notification state
		// Prevent from double instance when loadpage
		if(notificationState == false) {
			checkNewNotifications();
		}
	} else {
		// Stop checking for new notifications while reading them
		clearTimeout(stopNotifications);
		window.notificationState = false;

		jQuery('.notification-container').show();
		if(y == 1) {
			jQuery('#notifications_btn').addClass('menu_hover_notifications');
			jQuery('#notifications_btn').html(getNotificationImage());

			// Remove the other hovered class if exist
			jQuery('#messages_btn').removeClass('menu_hover_messages');

			// Show-Hide the top urls for global and chat messages drop-downs
			jQuery('#global_page_url').show();
			jQuery('#chat_page_url').hide();
		} else {
			jQuery('#messages_btn').addClass('menu_hover_messages');
			jQuery('#messages_btn').html(getMessagesImageUrl(1));

			// Remove the other hovered class if exist
			jQuery('#notifications_btn').removeClass('menu_hover_notifications');

			// Show-Hide the top urls for global and chat messages drop-downs
			jQuery('#global_page_url').hide();
			jQuery('#chat_page_url').show();

			var extra = '&for=1';
		}
		jQuery('#notifications-content').html('<div class="menu-divider"></div><div class="notification-inner"><div class="preloader-normal preloader-dark"></div></div>');

		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/check_notifications.php",
			data: "type=1"+extra+"&token_id="+token_id,
			cache: false,
			success: function(html) {
				if(html) {
					jQuery('#notifications-content').html(html);
					jQuery("span.timeago").timeago();
				}
				if(extra) {
					jQuery('#messages_url').removeAttr('onclick');
					jQuery('#messages_url').attr('href', getMessagesImageUrl());
					jQuery("#messages_url").attr("rel", "loadpage");
				}
				// If the output is empty, close the notification
				if(y == 2 && html == "") {
					showNotification('close');
				}
			}
		});
	}
}
function progressHandler(event) {
	// Get the current progress
	var percent = ((event.loaded / event.total) * 100).toFixed(0);
	// Set the progress values
	jQuery('#upload-pbv').css('width', percent+'%');
	jQuery('#upload-pvt').text(percent);

	// Display the processing text
	if(percent == 100) {
		jQuery('#upload-processing').show();
		jQuery('#upload-text').hide();
	}
}
function completeHandler(event) {
	// Parse the response
	try {
		var response = JSON.parse(event.target.responseText);
	} catch(error) {
		var response = false;
	}

	// jQuery('#track-upload').remove();

	// Reset the form and the select file buttons
	if(upload_form_reset == 1) {
		jQuery('#track-upload')[0].reset();

		jQuery('#cover-art').show();
		jQuery('#cover-art-sel').hide();
		jQuery('#upload-art-btn').removeClass('upload-btn-selected');

		jQuery('#track-file').show();
		jQuery('#track-file-sel').hide();
		jQuery('#upload-track-btn').removeClass('upload-btn-selected');

		// Empty any extra files
		jQuery('#extra-files').empty();

        jQuery('#license-container').hide();
	}
	// Display the upload button
	jQuery('#upload-button').show();

	// Return the response
	jQuery('#upload-message').html(response.message);
	jQuery('#upload-pb').hide();
	return true;
}
function errorHandler(event) {
	console.log(event);
}
function abortHandler(event) {
	console.log(event);
}
function startUpload(event) {
	// Prepare the request
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.addEventListener("error", errorHandler, false);
	ajax.addEventListener("abort", abortHandler, false);
	ajax.open("POST", baseUrl+"/requests/post_track.php");

	// Client side form validation check

	// Validate the tags input
	var tag_min = 0;
	var tag_max = 0;
	var upload_tags = jQuery('input[name="category"]').val() + jQuery('input[name="tag"]').val();
	if(upload_tags == 0) {
		tag_min = 1;
	}
	if(upload_tags.split(',').length > 30) {
		tag_max = 1;
	}

	// Validate the title inputs
	var ttl_min = 0;
	var ttl_max = 0;
	var upload_titles = jQuery('input[name="title[]"]');
	for(var i = 0; i < upload_titles.length; i++) {
		if(upload_titles[i].value.length < 1) {
			var ttl_min = 1;
		}
		if(upload_titles[i].value.length > 99) {
			var ttl_max = 1;
		}
	}

	// Validate the description input
	var desc_err = 0;
	if(jQuery('textarea[name="description"]').val().length > 5000) {
		var desc_err = 1;
	}

	// Validate the URL input
	var buy_err = 0;
	var buy_input = jQuery('input[name="buy"]').val();
	if(buy_input.length > 0 ) {
		if(/^(http|https):\/\/[^ "]+$/.test(buy_input) == false) {
			var buy_err = 1;
		}
	}

	if(tag_min || tag_max || ttl_min || ttl_max || desc_err || buy_err) {
		// Do not reset the form
		window.upload_form_reset = 0;

		// Send out the request
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send("error=1&tag_min="+tag_min+"&tag_max="+tag_max+"&ttl_min="+ttl_min+"&ttl_max="+ttl_max+"&desc="+desc_err+"&buy="+buy_err+"&token_id="+token_id);
	} else {
		// Reset the form
		window.upload_form_reset = 1;

		// Get the upload form
		var upload_form = jQuery("#track-upload")[0];

		// Create a new form data object
		var formdata = new FormData(upload_form);

		// Send out the request
		ajax.send(formdata);
	}
	// Show the progress bar
	jQuery('#upload-pb').show();
	jQuery('#upload-processing').hide();
	jQuery('#upload-text').show();

	// Hide the upload button
	jQuery('#upload-button').hide();
}
function focus_form(id) {
	document.getElementById('comment-form'+id).focus();
	showButton(id);
}
function manageResults(x) {
	if(x == 0) {
		hideSearch();
	} else if(x == 1) {
		var q = jQuery("#search").val();
		liveLoad(search_filter+q.replace(' ','+'));
	} else if(x == 2) {
		var q = jQuery("#search").val();
		liveLoad(explore_filter+q.replace('#',''));
	}
}
function chatLiveSearch() {
	var q = jQuery('#search-list').val();
	jQuery('.sidebar-chat-list').empty();

	// If the text input is 0, remove everything instantly by setting the MS to 1

	jQuery('.search-list-container').show();
	jQuery('.search-list-container').html('<div class="search-content"><div class="message-inner"><div class="preloader-retina-large preloader-center"></div></div></div>');
	var ms = 200;

	// Start the delay (to prevent some useless queries)
	setTimeout(function() {
		if(q == jQuery('#search-list').val()) {

			$.ajax({
				type: "POST",
				url: baseUrl+"/requests/load_people.php",
				data: 'q='+q+'&start=1&live=1&list=1&token_id='+token_id, // start is not used in this particular case, only needs to be set
				cache: false,
				success: function(html) {
					jQuery('.search-list-container').html('');
					jQuery('.sidebar-chat-list').html(html);
				}
			});

		}
	}, ms);
}
function profileCard(id, post, type, delay) {
	// ID: Unique user ID
	// Post: Unique Sound/Post ID
	// Type: 0 - Sound; 1 - Comment; 2 - Playlist; 3 - User
	// Delay: 0 - on mouse IN; 1 - on mouse OUT;
	if(delay == 1) {
		clearInterval(pcTimer);
	} else {
		window.pcTimer = setInterval(function() {
			if(type == 1) {
				var classType = 'comment';
				// The position to be increased
				var height = 45;
				var left = 0;
				var right = 20;
			} else if(type == 2) {
				var classType = 'playlist';
				var height = 60;
				var left = 120;
				var right = 120;
			} else if(type == 3) {
				var classType = 'user';
				var height = 25;
				var left = 70;
				var right = 90;
			} else {
				var classType = 'track';
				var height = 58;
				var left = 150;
				var right = 152;
			}

			// Start displaying the profile card with the preloader
			jQuery('#profile-card').show();
			jQuery('#profile-card').html('<div class="profile-card-padding"><div class="preloader-retina preloader-center"></div></div>');

			// Get the position of the parent element
			var position = jQuery("#"+classType+post).position();

			// Store the position into an array
			if(lng_dir == "rtl") {
				var pos = {
					top: (position.top + height) + 'px',
					right: right + 'px'
				};
			} else {
				var pos = {
					top: (position.top + height) + 'px',
					left: (position.left + left) + 'px'
				};
			}

			// Set the position of the profile card
			jQuery('#profile-card').css(pos);
			$.ajax({
				type: "POST",
				url: baseUrl+"/requests/load_profilecard.php",
				data: 'id='+id+"&token_id="+token_id,
				cache: false,
				success: function(html) {
					jQuery('#profile-card').html(html);
				},
				error: function() {
					jQuery('#profile-card').hide();
				}
			});
			clearInterval(pcTimer);
		}, 500);
	}
}
function notificationTitle(type) {
	// Type 1: Play the New Chat Message notification
	if(!document.hasFocus()) {
		// If the current document title doesn't have an alert, add one
		if(document.title.indexOf('(!)') == -1) {
			document.title = '(!) ' + document.title;
		}
	}
}
function checkNewChat(x) {
	var uid = jQuery('#chat').attr('class');
	if(uid === 'chat-user') {
		setTimeout(checkNewChat, chatr);
	} else {
		// Check whether uid is defined or not [prevent from making requests when leaving the chat page]
		if(uid) {
			$.ajax({
				type: "POST",
				url: baseUrl+"/requests/load_chat.php",
				data: "uid="+uid.replace('chat-user', '')+"&type=1&token_id="+token_id,
				success: function(html) {
					 // html is a string of all output of the server script.
					if(html) {
						jQuery('.chat-container').append(html);
						jQuery("div.timeago").timeago();

						// Scroll at the bottom of the div (focus new content)
						jQuery(".chat-container").scrollTop(jQuery(".chat-container")[0].scrollHeight);
					}
					if(!x) {
						setTimeout(checkNewChat, chatr);
					}
			   }
			});
		}
	}
}
function playerVolume() {
	// Delay the function for a second to get the latest style value
	setTimeout(function() {
		// Get the style attribute value
		var new_volume = jQuery(".jp-volume-bar-value").attr("style");

		// Strip off the width text
		var new_volume = new_volume.replace("width: ", "");

		if(new_volume != "100%;") {
			// Remove everything after the first two characters 00
			var new_volume = new_volume.substring(0, 2).replace(".", "").replace("%", "");
		}

		if(new_volume.length == 1) {
			var new_volume = "0.0"+new_volume;
		} else if(new_volume.length == 2) {
			var new_volume = "0."+new_volume;
		} else {
			var new_volume = 1;
		}

		// Save the new volume value
		localStorage.setItem("volume", new_volume);
	}, 1);
}
function getUrlParameter(id) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == id) {
            return sParameterName[1];
        }
    }
}
function dropdownMenu(type) {
	// 1: Reset the menu
	if(type) {
		jQuery('.menu-image').removeClass('menu-image-active');
		jQuery('#menu-dd-container').hide();
	} else {
		// Dropdown Menu Icon
		jQuery('.menu-image').on("click", function() {
			jQuery('.menu-image').toggleClass('menu-image-active');
			jQuery('#menu-dd-container').toggle();
		});

		jQuery(document).on("click", function(){
			// Hide the image drop-down menu
			dropdownMenu(1);

			// Hide the search results
			manageResults(0);
		});

		jQuery(".menu-image, .search-results").on("click", function(e) {
			e.stopPropagation();
		});
	}
}
jQuery(document).ready(function() {
	// Start loading
	dropdownMenu();

	jQuery(document).on('change', 'select[name="reason"]', function() {
		if(jQuery(this).val() == 1) {
			jQuery('.other-reason').hide();
		} else {
            jQuery('.other-reason').show();
		}
	});

	jQuery(document).on('keydown', 'input#chat', function(e) {
		if(e.keyCode==13) {
			// Store the message into var
			var message = jQuery('input#chat').val();
			var id = jQuery('#chat').attr('class');
			if(message) {
				// Remove chat errors if any
				jQuery('.chat-error').remove();

				// Show the progress animation
				jQuery('.header-loader').show();

				// Reset the chat input area
				document.getElementById("chat").style.height = "25px";
				jQuery('input#chat').val('');

				$.ajax({
					type: "POST",
					url: baseUrl+"/requests/post_chat.php",
					data: 'message='+encodeURIComponent(message)+'&id='+id.replace('chat-user', '')+"&token_id="+token_id,
					cache: false,
					success: function(html) {
						// Check if in the mean time any message was sent
						checkNewChat(1);

						// Append the new chat to the div chat container
						jQuery('.chat-container').append(html);
						jQuery('.header-loader').hide();

						jQuery("div.timeago").timeago();

						// Scroll at the bottom of the div (focus new content)
						jQuery(".chat-container").scrollTop(jQuery(".chat-container")[0].scrollHeight);
					}
				});
			}
		}
	});

	jQuery("#search").on('keyup', function(e) {
		var q = jQuery('#search').val();

		if(typeof last_search != 'undefined') {
			if(q == last_search && e.which != 13) {
				return false;
			}
		}

		window.last_search = q;

		// If the query is empty, don't do anything
		if(q.length < 1) {
			hideSearch();
			return false;
		}

		// If the query starts with #, do not execute anything
		if(q == '#') {
			hideSearch();
			return false;
		}

		// Check the notification state
		if(typeof notificationState != 'undefined') {
			showNotification('close');
		}

		// Search if the hashtag is typed
		if(q.substring(0, 1) == '#') {
			var y = 'filter';
			var url = 'tags';
			var full_url = explore_filter+q.replace('#','');
		} else {
			var y = 'q';
			var url = 'people';
			var full_url = search_filter+q.replace(' ','+');
		}
		var data = 'q='+q+'&start=1&live=1';

		// If the text input is 0, remove everything instantly by setting the MS to 1
		if(q == 0) {
			var ms = 0;
		} else {
			jQuery('.search-container').show();
			jQuery('.search-container').html('<div class="search-content"><div class="search-results"><div class="message-inner"><div class="retrieving-results"></div> <div class="preloader-left preloader-dark"></div></div></div></div>');
			var ms = 200;
		}

		if(e.which == 13) {
			liveLoad(full_url);
			hideSearch();
			return false;
		}

		// Start the delay (to prevent some useless queries)
		setTimeout(function() {
			if(q == jQuery('#search').val()) {
				if(q == 0) {
					hideSearch();
				} else {
					$.ajax({
					type: "POST",
					url: baseUrl+"/requests/load_"+url+".php",
					data: data+'&token_id='+token_id, // start is not used in this particular case, only needs to be set
					cache: false,
					success: function(html) {
						jQuery(".search-container").html(html).show();
					}
					});
				}
			}
		}, ms);
	});

	jQuery(document).on('keyup', "#search-list", chatLiveSearch);

	jQuery('#values input:radio').addClass('input_hidden');
	jQuery('#values label').click(function() {
		jQuery(this).addClass('selected').siblings().removeClass('selected');
		jQuery('#form-value').attr("Placeholder", jQuery(this).attr('title'));
		jQuery('#form-value').val('');
		jQuery('#my_file').val('');
		jQuery('.message-form-input').show('slow');
		jQuery('.selected-files').hide('slow');
	});

	jQuery('#my_file').click(function() {
		jQuery('#form-value').val('');
		jQuery('.message-form-input').hide('slow');
		jQuery('.selected-files').show('slow');
		jQuery('#values label').removeClass('selected');
	});

	jQuery(document).on('change', '#upload-art:file', function() {
		if(this.files.length == 0) {
			jQuery('#cover-art').show();
			jQuery('#cover-art-sel').hide();
			jQuery('#upload-art-btn').removeClass('upload-btn-selected');
		} else {
			jQuery('#cover-art').hide();
			jQuery('#cover-art-sel').show();
			jQuery('#upload-art-btn').addClass('upload-btn-selected');
		}
	});

	jQuery(document).on('change', '#upload-track:file', function() {
		jQuery('#extra-files').empty();
		if(this.files.length > 1) {
			jQuery('#playlist-upload').show();
		}
		for(var i = 0; i < this.files.length; ++i) {
			var track_name = this.files.item(i).name.replace(/C:\\fakepath\\/i, '').replace(/.mp3/i, '').replace(/.m4a/i, '').replace(/.wav/i, '');
			var track_original = this.files.item(i).name;
			if(i > 0) {
				jQuery('#extra-files').append('<div class="track-info-container"><div class="track-info-inputs"><div class="track-info-input track-info-input-extra"><!--<div class="track-info-title">'+track_original+'</div>--><input type="text" name="title[]" value="'+track_name+'"></div></div></div><div class="divider"></div>');
			} else {
				jQuery('#track-title').val(track_name);
			}
		}

		if(this.files.length == 0) {
			jQuery('#track-file').show();
			jQuery('#track-file-sel').hide();
			jQuery('#upload-track-btn').removeClass('upload-btn-selected');
			jQuery('#extra-files').empty();
		} else {
			jQuery('#track-file').hide();
			jQuery('#track-file-sel').show();
			jQuery('#upload-track-btn').addClass('upload-btn-selected');
		}
	});

	jQuery(document).on('click', '#license-nc', function() {
		if(jQuery('input[name='+this.id+']').val() == 1) {
			jQuery('#'+this.id).removeClass('license-box-active');
			jQuery('.'+this.id+', .'+this.id+'-icon', '#license-container').hide();
			jQuery('input[name='+this.id+']').val(0);
		} else {
			jQuery('#'+this.id).addClass('license-box-active');
			jQuery('.'+this.id+', .'+this.id+'-icon', '#license-container').show();
			jQuery('input[name='+this.id+']').val(1);
		}
	});

	jQuery(document).on('click', '#license-nd', function() {
		if(jQuery('input[name=license-nd-sa]').val() == 1) {
			jQuery('#'+this.id).removeClass('license-box-active');
			jQuery('.'+this.id+', .'+this.id+'-icon', '#license-container').hide();
			jQuery('input[name=license-nd-sa]').val(0);
		} else {
			jQuery('#'+this.id).addClass('license-box-active');
			jQuery('.'+this.id+', .'+this.id+'-icon').show();
			jQuery('#license-sa').removeClass('license-box-active');
			jQuery('.license-sa, .license-sa-icon', '#license-container').hide();
			jQuery('input[name=license-nd-sa]').val(1);
		}
	});

	jQuery(document).on('click', '#license-sa', function() {
		if(jQuery('input[name=license-nd-sa]').val() == 2) {
			jQuery('#'+this.id).removeClass('license-box-active');
			jQuery('.'+this.id+', .'+this.id+'-icon', '#license-container').hide();
			jQuery('input[name=license-nd-sa]').val(0);
		} else {
			jQuery('#'+this.id).addClass('license-box-active');
			jQuery('.'+this.id+', .'+this.id+'-icon').show();
			jQuery('#license-nd').removeClass('license-box-active');
			jQuery('.license-nd, .license-nd-icon', '#license-container').hide();
			jQuery('input[name=license-nd-sa]').val(2);
		}
	});

	// Allow volume bar dragging
	jQuery(document).on('mousedown', '.jp-volume-bar', function() {
		var parentOffset = jQuery(this).offset(),
			width = jQuery(this).width();
			jQuery(window).mousemove(function(e) {
				var x = e.pageX - parentOffset.left,
				volume = x/width
				if (volume > 1) {
					jQuery("#sound-player").jPlayer("volume", 1);
				} else if (volume <= 0) {
					jQuery("#sound-player").jPlayer("mute");
				} else {
					jQuery("#sound-player").jPlayer("volume", volume);
					jQuery("#sound-player").jPlayer("unmute");
				}
				playerVolume();
			});
		return false;
	});
	jQuery(document).on('mouseup', function() {
		jQuery(window).unbind("mousemove");
	});

	jQuery(document).on('click', '.scroll_to', function(event) {
		event.preventDefault();
		jQuery('#'+jQuery(this).data("section")).scrollIntoView(55);
	});

	// Disable the enter key on login/register forms
	jQuery('#register-form').submit(function() {
		connect(0);
		return false;
	});
	jQuery('#login-form').submit(function() {
		connect(1);
		return false;
	});
	jQuery('.facebook-button').on('click', function() {
		jQuery('.modal-loading').show();
	});

	jQuery(document).on('click', '.notification-close-error, .notification-close-warning, .notification-close-success, .notification-close-info', function() {
		jQuery(this).parent().fadeOut("slow"); return false;
	});

	jQuery(document).on('click touchend', '.track', function(e) {
		var track = jQuery(this).data('track-url');
		var id = jQuery(this).data('track-id');
		var format = jQuery(this).data('track-format');

		playSong(track, id, format);
		e.preventDefault();
	});

	jQuery('#privacy-btn').on('click', function() {
		if(jQuery('#message-privacy').val() == 1) {
			jQuery('#message-privacy').val('0');
			jQuery('#privacy-btn').addClass('message-private-active');
			jQuery('#privacy-btn').attr('title', 'Private message');
		} else {
			jQuery('#message-privacy').val('1');
			jQuery('#privacy-btn').removeClass('message-private-active');
			jQuery('#privacy-btn').attr('title', 'Public message');
		}
	});

	// When the window is focused
	jQuery(window).focus(function() {
		// If the currentTitle has the (!) notification, then remove it
		if(document.title.indexOf('(!)') >= 0) {
			document.title = document.title.replace("(!) ", "");
		}
	});

	// When the window is fully loaded
	jQuery(window).on('load', function() {
		updateCssBoxes();
	});

	// When the window is resized
	jQuery(window).resize(function () {
		updateCssBoxes();
	});

	// Start the player keyboard controls
	jQuery(document).on("keydown", function(key) {
		if(key.keyCode == 32) {
			if(jQuery('input:focus, textarea:focus').length == 0) {
				// Prevent the key action
				key.preventDefault();
				if(jQuery("#sound-player").data('jPlayer').status.paused) {
					jQuery("#sound-player").jPlayer('play');
				} else {
					jQuery("#sound-player").jPlayer('pause');
				}
			}
		}
		if(key.keyCode == 39) {
			if(jQuery('input:focus, textarea:focus').length == 0) {
				// Prevent the key action
				key.preventDefault();
				jQuery('#next-button').click();
			}
		}
		if(key.keyCode == 37) {
			if(jQuery('input:focus, textarea:focus').length == 0) {
				// Prevent the key action
				key.preventDefault();
				jQuery('#prev-button').click();
			}
		}
		if(key.keyCode == 77) {
			if(jQuery('input:focus, textarea:focus').length == 0) {
				// Prevent the key action
				key.preventDefault();
				if(jQuery('.jp-unmute').is(':hidden')) {
					jQuery('.jp-mute').click();
				} else {
					jQuery('.jp-unmute').click();
				}
			}
		}
		if(key.keyCode == 77) {
			if(jQuery('input:focus, textarea:focus').length == 0) {
				// Prevent the key action
				key.preventDefault();
				if(jQuery('.jp-unmute').is(':hidden')) {
					jQuery('.jp-mute').click();
				} else {
					jQuery('.jp-unmute').click();
				}
			}
		}
		if(key.keyCode == 82) {
			if(jQuery('input:focus, textarea:focus').length == 0) {
				// Prevent the key action
				key.preventDefault();
				if(jQuery('.jp-repeat-off').is(':hidden')) {
					jQuery('.jp-repeat').click();
				} else {
					jQuery('.jp-repeat-off').click();
				}
			}
		}
	});

	// Enable infinite scrolling when on desktop
	if(/Mobi/.test(navigator.userAgent) == false) {
		jQuery(window).scroll(function() {
			if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
				jQuery('#infinite-load').click();
			}
		});
	}

	// Set the player volume
	if(localStorage.getItem("volume") === null) {
		localStorage.setItem("volume", player_volume);
	} else {
		window.player_volume = localStorage.getItem("volume");
	}

	reload();
});
function sendForm() {
	jQuery('form#general').submit();
}
function hideModal() {
	jQuery('#share, #playlist, #delete, #connect').fadeOut();
	jQuery('.modal-background').fadeOut();
	jQuery('.tab-share,.tab-embed,.tab-delete,.tab-login,.tab-register').fadeOut();
	jQuery('#autoplay').prop('checked', false);
}
function hideSearch() {
	jQuery(".search-container").hide();
	jQuery(".search-content").remove();
}
function reload() {
	jQuery(".timeago").timeago();
	autosize();
	prevnext();
	// Reset menu, search
	dropdownMenu(1);
	manageResults(0);
	hideModal();

	jQuery('#share, #playlist, #delete, #connect').fadeOut();
	jQuery('.modal-background').fadeOut();

	// Add active class on Explore, Stream buttons
	jQuery('#explore-button').attr('class', 'menu-button');
	jQuery('#stream-button').attr('class', 'menu-button');
	if(getUrlParameter('a') == 'explore' || window.location.href.indexOf(baseUrl+'/explore') > -1) {
		jQuery('#explore-button').addClass('menu-button-active');
	} else if(getUrlParameter('a') == 'stream' || window.location.href.indexOf(baseUrl+'/stream') > -1) {
		jQuery('#stream-button').addClass('menu-button-active');
	}

	// Check the notification state
	if(typeof notificationState != 'undefined') {
		showNotification('close');
	}

	// Reset the search value
	if(window.location.search.indexOf('a=search') == -1 && window.location.search.indexOf('a=explore&filter=') == -1 && window.location.href.indexOf(baseUrl+'/explore/filter/') == -1 && window.location.href.indexOf(baseUrl+'/search') == -1) {
		jQuery("#search").val('');
	}

	// Scroll down the chat window when on the messages page
	if(window.location.search.indexOf('a=messages') > -1 || window.location.pathname.indexOf('/messages/') > -1) {
		jQuery(".chat-container").scrollTop(jQuery(".chat-container")[0].scrollHeight);
	}

	// Update the dynamic boxes
	updateCssBoxes();

	// Reload the profile card event
	jQuery('#profile-card').on("mouseleave", function() {
		jQuery('#profile-card').hide();
	});

	// Reload the Auto-Select share-url input
	jQuery("#share-url, #embed-url").on("click", function () {
		jQuery(this).select();
	});

	// On modal background click, hide it
	jQuery('.modal-background').on("click", function() {
		hideModal();
	});

	// Modal menu items
	jQuery('.modal-menu-item').click(function() {
		jQuery(this).addClass('modal-menu-item-active').siblings().removeClass('modal-menu-item-active');
		jQuery('.tab-share,.tab-embed,.tab-playlist,.edit-general,.edit-metadata,.edit-permissions,.edit-reports,.edit-payments,.edit-delete,.tab-delete,.tab-login,.tab-register').hide();
		jQuery('.'+jQuery(this).attr('id')).show();
	});

	// Edit menu items
	jQuery('.edit-menu-item').click(function() {
		jQuery(this).addClass('edit-menu-item-active').siblings().removeClass('edit-menu-item-active');
		jQuery('.edit-general,.edit-registration,.edit-limits,.edit-emails,.edit-storage,.edit-metadata,.edit-permissions,.edit-payments,.edit-reports,.edit-delete,.stats-tracks,.stats-users,.stats-geographic').hide();
		jQuery('.'+jQuery(this).attr('id')).show();
	});

	// Embed Autoplay check
	jQuery('#autoplay').on('click', function() {
		// Set the embed url value into a jquery selector in order to parse the src attr
		var embed = jQuery(jQuery('#embed-url').val());

		// Set embed url input content
		var iframe = jQuery('#embed-url').val();

		if(jQuery('#autoplay').is(':checked')) {
			jQuery('#embed-url').val(iframe.replace(embed.attr('src'), embed.attr('src')+'&autoplay=true'));
		} else {
			jQuery('#embed-url').val(iframe.replace('&autoplay=true', ''));
		}
	});

	if(jQuery('#selection-cc').is(':checked')) {
		jQuery('#license-container').show();
	} else {
		jQuery('#license-container').hide();
	}

	jQuery('#selection-cc, #selection-ar').on('click', function() {
		if(jQuery('#selection-cc').is(':checked')) {
			jQuery('#license-container').show();
		} else {
			jQuery('#license-container').hide();
		}
	});

	if(jQuery('input[name=license-nc]').val() == 1) {
		jQuery('#license-nc').addClass('license-box-active');
		jQuery('.license-nc, license-nc-icon').show();
	} else {
		jQuery('#license-nc').removeClass('license-box-active');
		jQuery('.license-nc, #license-container .license-nc-icon').hide();
	}

	if(jQuery('input[name=license-nd-sa]').val() == 1) {
		jQuery('#license-nd').addClass('license-box-active');
		jQuery('.license-nd, .license-nd-icon').show();
		jQuery('.license-sa, #license-container .license-sa-icon').hide();
	} else if(jQuery('input[name=license-nd-sa]').val() == 2) {
		jQuery('#license-sa').addClass('license-box-active');
		jQuery('.license-sa, .license-sa-icon').show();
		jQuery('.license-nd, #license-container .license-nd-icon').hide();
	} else {
		jQuery('#license-nd, #license-sa').removeClass('license-box-active');
		jQuery('.license-nd, .license-sa, #license-container .license-nd-icon, #license-container .license-sa-icon').hide();
	}

	// If there's a comment #highlighted
	if(window.location.hash) {
		var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		// If the hashtag is a comment
		if(hash.indexOf("comment") > -1) {
			jQuery('#'+hash).addClass('comment-active');
		}
	}
}
function updateCssBoxes() {
	// Set the +sign height and line-height
	 jQuery('#online-plus .plus-button').height(jQuery('.sidebar-online-users-padding').height()-7);
	 jQuery('#online-plus .plus-sign').css("line-height", jQuery('.sidebar-online-users-padding').height()-9+'px');

	// Set the height of the social icons containers
	jQuery('.social-icon').height(jQuery('.social-icon').width());
}
function formSubmit(id) {
	document.getElementById(id).submit();
}
$.fn.scrollIntoView = function(padding, duration, easing) {
    jQuery('html,body').animate({
        scrollTop: this.offset().top-padding
    }, duration, easing);
    return this;
};
function startLoadingBar() {
	// only add progress bar if added yet.
	jQuery("#loading-bar").show();
	jQuery("#loading-bar").width((50 + Math.random() * 30) + "%");
}
function stopLoadingBar() {
	//End loading animation
	jQuery("#loading-bar").width("101%").delay(200).fadeOut(400, function() {
		jQuery(this).width("0");
	});
}
function pauseSong() {
	jQuery("#sound-player").jPlayer('pause');
}
function repeatSong(type) {
	// Type 0: No repeat
	// Type 1: Repeat
	if(type == 1) {
		jQuery('#repeat-song').html('1');
	} else {
		jQuery('#repeat-song').html('0');
	}
}
function nextSong(id) {
	// If shuffle is turned on and the user is on a playlist page
	if(jQuery('.shuffle-button-active').length) {
		// Select a random track from the page excluding the last played track
		var trackList = [];

		jQuery('.song-container').not('.current-song').each( function ( index ) {
			trackList.push(jQuery(this).find('.track').attr('id'));
		});

		var nextSong = jQuery('#'+trackList[Math.floor(Math.random()*trackList.length)]);
	} else {
		// Get the next song element
		var nextSong = jQuery('.current-song').closest('#track'+id).next().find('.track');
	}

	// Get the next song element id
	var nextId = nextSong.attr('id');

	// If one is available, move to the next track
	if(nextId) {
		document.getElementById(nextId).click();
	}
}
function prevnext(type) {
	// Type 1: Previous Track
	// Type 2: Next Track
	// Type 3: Auto new tracks load when last track
	var currentId = jQuery('.current-song').attr('id');

	var nextSong = jQuery('.current-song').closest('#'+currentId).next().find('.track');
	var nextId = nextSong.attr('id');

	if(type == 3) {
		// If there's no next track available
		if(!nextId) {
			// If currently on the pages that have tracks with "Load More" buttons
			if(window.location.search.indexOf('a=stream') > -1 || window.location.search.indexOf('a=explore') > -1 || (window.location.search.indexOf('a=profile') > -1 && window.location.search.indexOf('r=subscriptions') == -1) || (window.location.search.indexOf('a=profile') > -1 && window.location.search.indexOf('r=subscribers') == -1) || (window.location.search.indexOf('a=profile') > -1 && window.location.search.indexOf('r=playlists') == -1) || (window.location.search.indexOf('a=search') > -1 && window.location.search.indexOf('&filter=tracks') > -1) || window.location.href.indexOf(baseUrl+'/stream') > -1 || window.location.href.indexOf(baseUrl+'/explore') > -1 || (window.location.href.indexOf(baseUrl+'/profile') > -1 && ['about', 'subscriptions', 'subscribers', 'playlists'].indexOf(window.location.pathname.split("/").pop()) == -1) || (window.location.href.indexOf(baseUrl+'/search') > -1 && ['tracks'].indexOf(window.location.pathname.split("/").pop()) > -1 && ['filter'].indexOf(window.location.pathname.split("/").pop()) > -1)) {
				jQuery('#infinite-load').click();
			}
		}
		return false;
	}
	var prevSong = jQuery('.current-song').closest('#'+currentId).prev().find('.track');
	var prevId = prevSong.attr('id');

	if(prevId) {
		jQuery('#prev-button').removeClass('prev-button-disabled');
		jQuery('#prev-button').attr('onclick', 'prevnext(1)');
		if(type == 1) {
			document.getElementById(prevId).click();
			return;
		}
	} else {
		jQuery('#prev-button').addClass('prev-button-disabled');
		jQuery('#prev-button').removeAttr('onclick');
	}

	if(nextId) {
		jQuery('#next-button').removeClass('next-button-disabled');
		jQuery('#next-button').attr('onclick', 'prevnext(2)');
		if(type == 2) {
			document.getElementById(nextId).click();
			return;
		}
	} else {
		jQuery('#next-button').addClass('next-button-disabled');
		jQuery('#next-button').removeAttr('onclick');
	}
}
function shuffle() {
	if(jQuery('.shuffle-button').hasClass('shuffle-button-active')) {
		jQuery('.shuffle-button').removeClass('shuffle-button-active');
	} else {
		jQuery('.shuffle-button').addClass('shuffle-button-active');
	}
}
jQuery(function() {
	jQuery("body").on("click", "a[rel='loadpage']", function(e) {

		// Get the link location that was clicked
		liveLoad(jQuery(this).attr('href'), 0, null);

		return false;
	});
});
// Override the back button to get the ajax content via the back content */
jQuery(window).on('popstate', function(ev) {
	liveLoad(location.href, 0, null);
});
function liveLoad(pageurl, type, parameters) {
	// page url = request url
	// type = 1: POST; 0: GET;
	// parameters: serialized params
	startLoadingBar();

	if(type == 1) {
		var type = "POST";
	} else {
		var type = "GET";
	}

	// Request the page
	$.ajax({url: pageurl, type: type, data: parameters, success: function(data) {
		var result = jQuery.parseJSON(data);
		// Show the content
		jQuery('#content').html(result.content);
		// Stop the loading bar
		stopLoadingBar();
		// Set the new title tag
		document.title = result.title;
		// Scroll the document at the top of the page
		jQuery(document).scrollTop(0);
		// Reload functions
		reload();// Update the Track Information
		updateTrackInfo(nowPlaying);
	}});

	// Store the url to the last page accessed
	if(pageurl != window.location) {
		window.history.pushState({path:pageurl}, '', pageurl);
	}
	return false;
}
function cookie_law() {
	// The number of days
	var duration = 30;

	// Create a date
	var d = new Date();
	d.setTime(d.getTime() + (duration*24*60*60*1000));

	// Generate the expiration date
	var expires = d.toUTCString();

	// Set the cookie
	document.cookie="cookie_law=1; expires=" + expires;

	// Hide the banner
	var banner = document.getElementById("cookie-law-banner");
	fade(banner);
}
function fade(element) {
	// Default opacity (matches the CSS one)
	var op = 0.85;
	var timer = setInterval(function() {
		if(op <= 0.1) {
			clearInterval(timer);
			element.style.display = 'none';
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;
	}, 25);
}