<?php
/**
 * Plugin Name:       Engeteles – Frotas Experience
 * Description:       Landing page Frotas Experience em páginas inteiras (sem tema): a página principal, Termos de uso e Política de privacidade. Fica no endereço configurado em Configurações › Frotas Experience (padrão: /frotas-experience/). Não interfere nas outras páginas do site.
 * Version:           1.0.0
 * Author:            Engeteles
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Text Domain:       engeteles-frotas-experience
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ENGETELES_FROTAS_EXPERIENCE_VERSION', '1.0.0' );
define( 'ENGETELES_FROTAS_EXPERIENCE_DIR', plugin_dir_path( __FILE__ ) );
define( 'ENGETELES_FROTAS_EXPERIENCE_URL', plugin_dir_url( __FILE__ ) );
define( 'ENGETELES_FROTAS_EXPERIENCE_OPTION', 'engeteles_frotas_experience_slug' );
define( 'ENGETELES_FROTAS_EXPERIENCE_DEFAULT_SLUG', 'frotas-experience' );

/**
 * Endereço base das páginas (ex.: frotas-experience → engeteles.com.br/frotas-experience/).
 */
function engeteles_frotas_experience_get_slug() {
	$slug = sanitize_title( (string) get_option( ENGETELES_FROTAS_EXPERIENCE_OPTION, ENGETELES_FROTAS_EXPERIENCE_DEFAULT_SLUG ) );
	return '' !== $slug ? $slug : ENGETELES_FROTAS_EXPERIENCE_DEFAULT_SLUG;
}

/**
 * Páginas do pacote: caminho relativo ao slug => arquivo HTML em site/.
 */
function engeteles_frotas_experience_routes() {
	$file   = ENGETELES_FROTAS_EXPERIENCE_DIR . 'site/routes.php';
	$routes = is_readable( $file ) ? include $file : array();
	return is_array( $routes ) ? $routes : array();
}

/**
 * Atende /frotas-experience/, /frotas-experience/termos-de-uso.html e /frotas-experience/politica-de-privacidade.html
 * antes do WordPress montar a página, sem carregar o tema.
 */
function engeteles_frotas_experience_parse_request( $wp ) {
	if ( is_admin() ) {
		return;
	}
	$slug    = engeteles_frotas_experience_get_slug();
	$request = trim( (string) $wp->request, '/' );
	if ( $request !== $slug && 0 !== strpos( $request, $slug . '/' ) ) {
		return;
	}
	$sub    = trim( substr( $request, strlen( $slug ) ), '/' );
	$routes = engeteles_frotas_experience_routes();
	if ( ! isset( $routes[ $sub ] ) ) {
		// Arquivos pedidos por scripts no endereço do site (ex.: /frotas-experience/assets/...).
		engeteles_frotas_experience_serve_file( $sub );
		return; // Outros endereços continuam com o WordPress (ex.: 404 normal).
	}

	$file = ENGETELES_FROTAS_EXPERIENCE_DIR . 'site/' . $routes[ $sub ];
	if ( ! is_readable( $file ) ) {
		return;
	}

	$assets = untrailingslashit( set_url_scheme( ENGETELES_FROTAS_EXPERIENCE_URL . 'site' ) );
	$home   = untrailingslashit( home_url( '/' . $slug ) );
	$html   = str_replace(
		array( '{{ENGETELES_FROTAS_EXPERIENCE_ASSETS}}', '{{ENGETELES_FROTAS_EXPERIENCE_HOME}}' ),
		array( $assets, $home ),
		(string) file_get_contents( $file )
	);

	status_header( 200 );
	nocache_headers();
	header( 'Content-Type: text/html; charset=utf-8' );
	echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML estático do próprio plugin.
	exit;
}
add_action( 'parse_request', 'engeteles_frotas_experience_parse_request', 0 );

/**
 * Entrega um arquivo do pacote (imagem, fonte, CSS, JS) pedido pelo endereço do site.
 * Só arquivos dentro de site/ e com extensões conhecidas.
 */
function engeteles_frotas_experience_serve_file( $sub ) {
	$types = array(
		'css'   => 'text/css; charset=utf-8',
		'js'    => 'application/javascript; charset=utf-8',
		'json'  => 'application/json',
		'png'   => 'image/png',
		'jpg'   => 'image/jpeg',
		'jpeg'  => 'image/jpeg',
		'gif'   => 'image/gif',
		'webp'  => 'image/webp',
		'avif'  => 'image/avif',
		'svg'   => 'image/svg+xml',
		'ico'   => 'image/x-icon',
		'woff'  => 'font/woff',
		'woff2' => 'font/woff2',
		'ttf'   => 'font/ttf',
		'eot'   => 'application/vnd.ms-fontobject',
	);
	$root = realpath( ENGETELES_FROTAS_EXPERIENCE_DIR . 'site' );
	$path = realpath( ENGETELES_FROTAS_EXPERIENCE_DIR . 'site/' . $sub );
	if ( ! $root || ! $path || 0 !== strpos( $path, $root . DIRECTORY_SEPARATOR ) || ! is_file( $path ) ) {
		return;
	}
	$ext  = strtolower( pathinfo( $path, PATHINFO_EXTENSION ) );
	$type = isset( $types[ $ext ] ) ? $types[ $ext ] : ( preg_match( '/^q[a-z0-9]+$/', $ext ) ? $types['js'] : '' );
	if ( '' === $type ) {
		return;
	}
	status_header( 200 );
	header( 'Content-Type: ' . $type );
	header( 'Content-Length: ' . filesize( $path ) );
	header( 'Cache-Control: public, max-age=31536000, immutable' );
	readfile( $path );
	exit;
}


/**
 * Configurações › Frotas Experience (troca do endereço).
 */
function engeteles_frotas_experience_register_settings() {
	register_setting(
		'engeteles_frotas_experience',
		ENGETELES_FROTAS_EXPERIENCE_OPTION,
		array(
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_title',
			'default'           => ENGETELES_FROTAS_EXPERIENCE_DEFAULT_SLUG,
		)
	);
}
add_action( 'admin_init', 'engeteles_frotas_experience_register_settings' );

function engeteles_frotas_experience_add_settings_page() {
	add_options_page( 'Frotas Experience', 'Frotas Experience', 'manage_options', 'engeteles-frotas-experience', 'engeteles_frotas_experience_settings_page' );
}
add_action( 'admin_menu', 'engeteles_frotas_experience_add_settings_page' );

function engeteles_frotas_experience_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$slug   = engeteles_frotas_experience_get_slug();
	$routes = engeteles_frotas_experience_routes();
	?>
	<div class="wrap">
		<h1>Frotas Experience</h1>
		<form method="post" action="options.php">
			<?php settings_fields( 'engeteles_frotas_experience' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="engeteles_frotas_experience_slug">Endereço</label></th>
					<td>
						<code><?php echo esc_html( trailingslashit( home_url() ) ); ?></code>
						<input name="<?php echo esc_attr( ENGETELES_FROTAS_EXPERIENCE_OPTION ); ?>" id="engeteles_frotas_experience_slug" type="text" class="regular-text" value="<?php echo esc_attr( $slug ); ?>">
						<p class="description">Não precisa criar páginas no WordPress: o plugin atende esses endereços sozinho. Evite usar o endereço de uma página que já existe.</p>
						<ul>
							<?php foreach ( array_keys( $routes ) as $sub ) : ?>
								<?php if ( 'index.html' === $sub || ( preg_match( '/\.html$/', $sub ) === 0 && '' !== $sub && isset( $routes[ $sub . '.html' ] ) ) ) { continue; } ?>
								<?php $url = home_url( '/' . $slug . '/' . $sub ); ?>
								<li><a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener"><?php echo esc_html( $url ); ?></a></li>
							<?php endforeach; ?>
						</ul>
					</td>
				</tr>
			</table>
			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

function engeteles_frotas_experience_action_links( $links ) {
	array_unshift( $links, '<a href="' . esc_url( admin_url( 'options-general.php?page=engeteles-frotas-experience' ) ) . '">Configurações</a>' );
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'engeteles_frotas_experience_action_links' );
