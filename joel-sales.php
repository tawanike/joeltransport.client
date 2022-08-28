<?php
/*
   Plugin Name: Sales Notification
   Plugin URI: https://mmogomedia.com/wordpress/plugins
   description: Notifying the parties on successful booking
   Version: 1.0.0
   Author: Mmogo Media
   Author URI: https://mmogomedia.com
   License: MIT License

*/

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Invalid request.' );
}

// make the plugin depend on the Booking plugin activation

function jt_sales_populate(){
 // booking plugin will send email with url with query string
 // check for id & step in the query string
 // lookup form id in the database
jt_sales_quotes_table(/*id*/);
 // populate the current page with the returned data
}

function jt_sales_quotes_table(/*id*/) {
   // return the contents of the table with the id
}

function jt_sales_update(/*id*/){;
jt_sales_update_db(/*id*/);
jt_sales_send_email(/*id*/);
}

function jt_sales_send_email(/*id*/){
 $pdf = jt_sales_create_pdf(/*data*/);
 $xls = jt_sales_create_xls(/*data*/);
 // send email with pdf & xls attachments
}

function jt_sales_create_pdf(/*data*/){
 //create pdf based on data
  //return pdf file?
}

function jt_sales_create_xls(/*data*/){
 //...
 //return xsl file?
}

function jt_sales_update_db(/*id*/){
 // update form with the id
}

