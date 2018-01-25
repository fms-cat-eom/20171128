#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

attribute vec3 vuv;

varying vec3 vPos;
varying float vLen;
varying vec3 vCol;
varying float vLife;

uniform vec2 resolution;
uniform vec2 resolutionPcompute;
uniform vec3 cameraPos;
uniform float cameraRot;
uniform float cameraFov;
uniform float vertsPerParticle;

uniform sampler2D texturePcompute;
uniform sampler2D textureOctahedronPos;
uniform sampler2D textureOctahedronNor;

// ------

mat2 rotate2D( float _t ) {
  return mat2( cos( _t ), sin( _t ), -sin( _t ), cos( _t ) );
}

mat4 lookAt( vec3 _pos, vec3 _tar, vec3 _air, float _rot ) {
  vec3 dir = normalize( _tar - _pos );
  vec3 sid = normalize( cross( dir, _air ) );
  vec3 top = normalize( cross( sid, dir ) );
  sid = cos( _rot ) * sid + sin( _rot ) * top;
  top = normalize( cross( sid, dir ) );
  return mat4(
    sid.x, top.x, dir.x, 0.0,
    sid.y, top.y, dir.y, 0.0,
    sid.z, top.z, dir.z, 0.0,
    - sid.x * _pos.x - sid.y * _pos.y - sid.z * _pos.z,
    - top.x * _pos.x - top.y * _pos.y - top.z * _pos.z,
    - dir.x * _pos.x - dir.y * _pos.y - dir.z * _pos.z,
    1.0
  );
}

mat4 perspective( float _fov, float _aspect, float _near, float _far ) {
  float p = 1.0 / tan( _fov * PI / 180.0 / 2.0 );
  float d = _far / ( _far - _near );
  return mat4(
    p / _aspect, 0.0, 0.0, 0.0,
    0.0, p, 0.0, 0.0,
    0.0, 0.0, d, 1.0,
    0.0, 0.0, -_near * d, 0.0
  );
}

// ------

void main() {
  vec2 puv = ( vuv.xy + 0.5 ) / resolutionPcompute;
  vec2 dppix = vec2( 1.0 ) / resolutionPcompute; 

  vec4 pos = texture2D( texturePcompute, puv );
  vec4 vel = texture2D( texturePcompute, puv + dppix * V.yx );
  vec4 rot = texture2D( texturePcompute, puv + dppix * V.yx * 2.0 );
  vec4 other = texture2D( texturePcompute, puv + dppix * V.yx * 3.0 );

  mat4 matP = perspective( cameraFov, resolution.x / resolution.y, 0.01, 100.0 );
  mat4 matV = lookAt( cameraPos, vec3( 0.0, 0.0, 0.0 ), V.xyx, cameraRot );

  vPos = pos.xyz;
  vLen = length( pos.xyz - cameraPos );
  vCol = other.xyz;
  vLife = pos.w;

  vec3 objVert = pos.w * texture2D( textureOctahedronPos, vec2( ( 0.5 + vuv.z ) / vertsPerParticle, 0.5 ) ).xyz;

  objVert *= 0.3 * ( 0.5 + 0.5 * vel.w ) * ( 1.0 - exp( -5.0 * pos.w ) ) * pos.w;
  objVert *= 1.0 - exp( -max( 0.0, length( pos.xyz - cameraPos ) - 0.5 ) );
  objVert.yz = rotate2D( rot.x ) * objVert.yz;
  objVert.zx = rotate2D( rot.y ) * objVert.zx;

  pos.xyz += objVert;

  vec4 outPos = matP * matV * vec4( pos.xyz, 1.0 );
  gl_Position = outPos;
}