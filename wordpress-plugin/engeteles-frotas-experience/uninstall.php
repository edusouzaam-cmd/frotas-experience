<?php
// Remove só a configuração do plugin.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}
delete_option( 'engeteles_frotas_experience_slug' );
