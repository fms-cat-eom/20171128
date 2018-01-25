#define BLOCK_SIZE 16

#define lofi(i,j) floor((i)/(j)+.5)*(j)
#define PI 3.14159265

precision highp float;

uniform vec2 resolution;

uniform float dataLofi;
uniform float dataThreshold;
uniform float highFreqMultiplier;

uniform sampler2D sampler0;

// ------

vec3 yuv2rgb( vec3 yuv ) {
  return vec3(
    yuv.x + 1.402 * yuv.z,
    yuv.x - 0.344136 * yuv.y - 0.714136 * yuv.z,
    yuv.x + 1.772 * yuv.y
  );
}

void main() {
  vec2 blockOrigin = 0.5 + floor( gl_FragCoord.xy / float( BLOCK_SIZE ) ) * float( BLOCK_SIZE );
  vec2 uv = gl_FragCoord.xy / resolution;

  vec2 delta = mod( gl_FragCoord.xy, float( BLOCK_SIZE ) );
  
  vec3 sum = vec3( 0.0 );
  for ( int iy = 0; iy < BLOCK_SIZE; iy ++ ) {
    for ( int ix = 0; ix < BLOCK_SIZE; ix ++ ) {
      vec2 fdelta = vec2( float( ix ), float( iy ) );
      float wave = (
        cos( delta.x * fdelta.x / float( BLOCK_SIZE ) * PI ) *
        cos( delta.y * fdelta.y / float( BLOCK_SIZE ) * PI )
      );

      vec4 tex = texture2D( sampler0, ( blockOrigin + fdelta ) / resolution );
      vec3 val = tex.xyz;
      val = 0.0 < dataLofi ? lofi( val, dataLofi ) : val;
      val *= length( val ) < dataThreshold ? 0.0 : 1.0 + length( fdelta ) * highFreqMultiplier;
      sum += wave * val;
    }
  }

  gl_FragColor = vec4( yuv2rgb( sum ), 1.0 );
}