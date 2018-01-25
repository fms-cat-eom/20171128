#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform vec2 loadingScale;

uniform sampler2D sampler0;

// ------

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = ( gl_FragCoord.xy * 2.0 - resolution ) / resolution.y;
  float vig = 1.14 - length( p - 0.5 ) * 0.4;

  vec3 tex = vec3(
    texture2D( sampler0, ( uv - 0.5 ) * 0.900 + 0.5 ).x,
    texture2D( sampler0, ( uv - 0.5 ) * 0.950 + 0.5 ).y,
    texture2D( sampler0, ( uv - 0.5 ) * 1.000 + 0.5 ).z
  );
  tex = mix(
    vec3( 0.0 ),
    tex,
    vig
  );

  vec3 col = pow( tex.xyz, vec3( 1.0 / 2.2 ) );
  col = vec3(
    smoothstep( -0.1, 1.1, col.x ),
    smoothstep( 0.0, 1.0, col.y ),
    smoothstep( -0.3, 1.3, col.z )
  );

  if ( loadingScale.x != 0.0 && loadingScale.y != 0.0 ) {
    vec2 lp = p / loadingScale;
    float loadingShape = smoothstep( 0.06, 0.05, abs( length( lp ) - 0.28 ) );
    float at = 0.5 + 0.5 * atan( lp.y, lp.x ) / PI;
    float loadingColor = mod( -4.0 * time - at, 1.0 );
    col = mix(
      col,
      vec3( loadingColor ),
      loadingShape
    );
  }

  gl_FragColor = vec4( col, 1.0 );
}