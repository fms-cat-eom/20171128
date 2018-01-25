#define BLOCK_SIZE 16

#define PI 3.14159265

precision highp float;

uniform vec2 resolution;

uniform sampler2D sampler0;

// ------

vec3 rgb2yuv( vec3 rgb ) {
  return vec3(
    0.299 * rgb.x + 0.587 * rgb.y + 0.114 * rgb.z,
    -0.148736 * rgb.x - 0.331264 * rgb.y + 0.5 * rgb.z,
    0.5 * rgb.x - 0.418688 * rgb.y - 0.081312 * rgb.z
  );
}

void main() {
  vec2 blockOrigin = 0.5 + floor( gl_FragCoord.xy / float( BLOCK_SIZE ) ) * float( BLOCK_SIZE );
  vec2 uv = gl_FragCoord.xy / resolution;

  vec2 freq = floor( mod( gl_FragCoord.xy, float( BLOCK_SIZE ) ) ) / float( BLOCK_SIZE ) * PI;
  float factor = ( freq.x == 0.0 ? 1.0 : 2.0 ) * ( freq.y == 0.0 ? 1.0 : 2.0 ) / float( BLOCK_SIZE * BLOCK_SIZE );

  vec3 sum = vec3( 0.0 );
  for ( int iy = 0; iy < BLOCK_SIZE; iy ++ ) {
    for ( int ix = 0; ix < BLOCK_SIZE; ix ++ ) {
      vec2 delta = vec2( float( ix ), float( iy ) ) + 0.5;
      float wave = cos( delta.x * freq.x ) * cos( delta.y * freq.y );

      vec3 val = texture2D( sampler0, ( blockOrigin + delta - 0.5 ) / resolution ).xyz;
      sum += wave * factor * rgb2yuv( val );
    }
  }

  gl_FragColor = vec4( sum, 1.0 );
}