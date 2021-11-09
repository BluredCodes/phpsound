<?php
error_reporting(0);

$CONF = $TMPL = array();

// The MySQL credentials
$CONF['host'] = 'remotemysql.com';
$CONF['user'] = 'j5X1G5y42a';
$CONF['pass'] = 'BGfjx6DsBu';
$CONF['name'] = 'j5X1G5y42a';

// The Installation URL
$CONF['url'] = 'https://reprisee.herokuapp.com';

// The Notifications e-mail
$CONF['email'] = 'droidcv1@gmail.com';

// The themes directory
$CONF['theme_path'] = 'themes';

$action = array('admin'			=> 'admin',
				'explore'		=> 'explore',
				'stream'		=> 'stream',
				'history'       => 'history',
				'settings'		=> 'settings',
				'messages'		=> 'messages',
				'track'			=> 'track',
				'playlist'		=> 'playlist',
				'upload'		=> 'upload',
				'recover'		=> 'recover',
				'profile'		=> 'profile',
				'stats'			=> 'stats',
				'pro'			=> 'pro',
				'notifications'	=> 'notifications',
				'search'		=> 'search',
				'page'			=> 'page',
				'welcome'		=> 'welcome'
				);
				
define('COOKIE_PATH', preg_replace('|https?://[^/]+|i', '', $CONF['url']).'/');
?>
