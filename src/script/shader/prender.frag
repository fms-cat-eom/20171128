#define PARTICLE_LIFE_SPEED 2.0

#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

precision highp float;

varying float vLen;

uniform vec3 color;

// ------

void main() {
  gl_FragColor = vec4( mix(
    vec3( 0.0, 0.0, 0.0 ),
    color,
    exp( -0.01 * vLen )
  ), 1.0 );
}