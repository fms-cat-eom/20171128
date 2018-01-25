import xorshift from './xorshift';
xorshift( 13487134006 );
import GLCat from './glcat';
import Path from './glcat-path';
import step from './step';
import Tweak from './tweak';
import Automaton from './automaton.min';
import octahedron from './octahedron';

const glslify = require( 'glslify' );

// ------

const clamp = ( _value, _min, _max ) => Math.min( Math.max( _value, _min ), _max );
const saturate = ( _value ) => clamp( _value, 0.0, 1.0 );

// ------

let automaton = new Automaton( {
  gui: divAutomaton,
  data: `
  {"rev":20170418,"length":1,"resolution":1000,"params":{"fillColor":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]}],"jpegLofi":[{"time":0,"value":0.08,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.07277628032345013,"value":0.017867414724212716,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.28320210169087895,"value":0.022463702227524474,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.374,"value":0.16183035714286176,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.46704614498767205,"value":0.1441592261904756,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.5444743935309974,"value":0.005580357142856679,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.588,"value":-0.03833407447451492,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.589,"value":0.27340145338149413,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.6765498652291105,"value":0.009300595238094782,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.7343950940700167,"value":0.07791329650169415,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.7887889973803287,"value":0.02964746263700102,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.9029649595687331,"value":0.05557735761002003,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0.08,"mode":2,"params":{},"mods":[false,false,false,false]}],"pixelsortThreshold":[{"time":0,"value":0.13449212937127983,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":0.43526785714284966,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.376,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.5006012855069459,"value":0.46953084763840414,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.6361185983827493,"value":0.3222656250000019,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.7035040431266847,"value":0.8747209821428589,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.8274932614555256,"value":0.4070172991071378,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0.15610810858862767,"mode":2,"params":{},"mods":[false,false,false,false]}],"jpegHigh":[{"time":0,"value":-0.22,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.04043126684636118,"value":0.022001834142777177,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.1470199046236782,"value":0.034113909267499354,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.29110512129380056,"value":0.0915708996000687,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.4393530997304582,"value":0.696672712053576,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.5876010781671159,"value":0.3124999999999998,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.5886010781671159,"value":2.2983649231138674,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.6657681940700808,"value":-0.2455357142857109,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.7088948787061995,"value":0.6994047619047654,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.7574123989218329,"value":0.6845238095238129,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.8500566037735848,"value":0.006909200123372539,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.9649595687331537,"value":0.0018898646036798472,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":-0.22,"mode":2,"params":{},"mods":[false,false,false,false]}],"どうするよ":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.7,"value":0.06696428571428747,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.85,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"cameraZ":[{"time":0,"value":10,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.2,"value":26.833,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.3746630727762803,"value":5.225,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.589,"value":8.730484644571932,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.59,"value":15.40765853155225,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.6495956873315363,"value":8.57142857142857,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.8095687331536388,"value":96.1904761904762,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":10,"mode":4,"params":{"rate":4000,"damp":1},"mods":[false,false,false,false]}],"altColor":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.2,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.307277628032345,"value":-7.142857142857146,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"cameraRot":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.7196765498652291,"value":1.623193650018556,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.81,"value":5.658929007393972,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":4,"params":{"rate":3000,"damp":1},"mods":[false,false,false,false]}],"loadingScaleX":[{"time":0,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.5013477088948787,"value":3.3333333333333393,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.54177897574124,"value":2.142857142857146,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]}],"loadingScaleY":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.4690026954177898,"value":-0.5952380952380913,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.5390835579514824,"value":-2.499999999999991,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.5983827493261457,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}]},"gui":{"snap":{"enable":false,"bpm":120,"offset":0}}}
`
} );
let auto = automaton.auto;

// ------

let width = 1080;
let height = 1080;
canvas.width = width;
canvas.height = height;

let gl = canvas.getContext( 'webgl' );
let glCat = new GLCat( gl );
let path = new Path( glCat );

// ------

let tweak = new Tweak( divTweak );

// ------

let oct = octahedron( 0 );

// ------

let totalFrame = 0;
let frame = 0;
let frames = 200;
let time = 0.0;
let init = true;
let secs = 1.0;
let deltaTime = 0.0;

let timeUpdate = () => {
  let reset = false;

  totalFrame ++;
  frame ++;
  if ( frames <= frame ) {
    frame = 0;
    reset = true;
  }
  
  let prevTime = time;
  time = secs * frame / frames;
  deltaTime = ( time + ( reset ? secs : 0.0 ) ) - prevTime;

  init = false;
};

// ------

let particlePixels = 4;
let particlesSqrt = 128;
let particles = particlesSqrt * particlesSqrt;
let vertsPerParticle = oct.pos.length / 3;

let vboQuad = glCat.createVertexbuffer( [ -1, -1, 1, -1, -1, 1, 1, 1 ] );

let vboTube = glCat.createVertexbuffer( ( () => {
  let ret = [];
  for ( let iy = 0; iy < 33; iy ++ ) {
    for ( let ix = 0; ix < 32; ix ++ ) {
      // AWFUL CODE START
      ret.push( 10.0 * Math.cos( ix * Math.PI * 2.0 / 32.0 ) );
      ret.push( 10.0 * Math.sin( ix * Math.PI * 2.0 / 32.0 ) );
      ret.push( 40.0 * ( iy - 16.0 ) / 16.0 );

      ret.push( 10.0 * Math.cos( ( ix + 1 ) * Math.PI * 2.0 / 32.0 ) );
      ret.push( 10.0 * Math.sin( ( ix + 1 ) * Math.PI * 2.0 / 32.0 ) );
      ret.push( 40.0 * ( iy - 16.0 ) / 16.0 );

      ret.push( 10.0 * Math.cos( ix * Math.PI * 2.0 / 32.0 ) );
      ret.push( 10.0 * Math.sin( ix * Math.PI * 2.0 / 32.0 ) );
      ret.push( 40.0 * ( iy - 16.0 ) / 16.0 );

      ret.push( 10.0 * Math.cos( ix * Math.PI * 2.0 / 32.0 ) );
      ret.push( 10.0 * Math.sin( ix * Math.PI * 2.0 / 32.0 ) );
      ret.push( 40.0 * ( ( iy + 1 ) - 16.0 ) / 16.0 );
      // AWFUL CODE END
    }
  }
  return ret;
} )() );

let vboParticle = glCat.createVertexbuffer( ( () => {
  let ret = [];
  for ( let i = 0; i < particlesSqrt * particlesSqrt * vertsPerParticle; i ++ ) {
    let ix = Math.floor( i / vertsPerParticle ) % particlesSqrt;
    let iy = Math.floor( i / particlesSqrt / vertsPerParticle );
    let iz = i % vertsPerParticle;
    
    ret.push( ix * particlePixels );
    ret.push( iy );
    ret.push( iz );
  }
  return ret;
} )() );

// ------

let textureRandomSize = 256;

let textureRandomUpdate = ( _tex ) => {
  glCat.setTextureFromArray( _tex, textureRandomSize, textureRandomSize, ( () => {
    let len = textureRandomSize * textureRandomSize * 4;
    let ret = new Uint8Array( len );
    for ( let i = 0; i < len; i ++ ) {
      ret[ i ] = Math.floor( xorshift() * 256.0 );
    }
    return ret;
  } )() );
};

let textureRandomStatic = glCat.createTexture();
glCat.textureWrap( textureRandomStatic, gl.REPEAT );
textureRandomUpdate( textureRandomStatic );

let textureRandom = glCat.createTexture();
glCat.textureWrap( textureRandom, gl.REPEAT );

let textureOctahedronPos = glCat.createTexture();
glCat.setTextureFromFloatArray( textureOctahedronPos, oct.pos.length / 3, 1, ( () => {
  let ret = [];
  for ( let i = 0; i < oct.pos.length / 3; i ++ ) {
    ret[ i * 4 + 0 ] = oct.pos[ i * 3 + 0 ];
    ret[ i * 4 + 1 ] = oct.pos[ i * 3 + 1 ];
    ret[ i * 4 + 2 ] = oct.pos[ i * 3 + 2 ];
    ret[ i * 4 + 3 ] = 1.0;
  }
  return ret;
} )() );

let textureOctahedronNor = glCat.createTexture();
glCat.setTextureFromFloatArray( textureOctahedronNor, oct.nor.length / 3, 1, ( () => {
  let ret = [];
  for ( let i = 0; i < oct.nor.length / 3; i ++ ) {
    ret[ i * 4 + 0 ] = oct.nor[ i * 3 + 0 ];
    ret[ i * 4 + 1 ] = oct.nor[ i * 3 + 1 ];
    ret[ i * 4 + 2 ] = oct.nor[ i * 3 + 2 ];
    ret[ i * 4 + 3 ] = 1.0;
  }
  return ret;
} )() );

// ------

let renderA = document.createElement( 'a' );

let saveFrame = () => {
  renderA.href = canvas.toDataURL( 'image/jpeg' );
  renderA.download = ( '0000' + totalFrame ).slice( -5 ) + '.jpg';
  renderA.click();
};

// ------

let mouseX = 0.0;
let mouseY = 0.0;

// ------

let cameraPos = [ 0.0, 0.0, 5.0 ];
let cameraRot = 0.0;
let cameraFov = 60.0;

// ------

let bgColor = [ 0.8, 0.02, 0.06, 1.0 ];
let fgColor = [ 0.0, 0.0, 0.0, 1.0 ];

// ------

path.setGlobalFunc( () => {
  glCat.uniform1i( 'init', init );
  glCat.uniform1f( 'time', time );
  glCat.uniform1f( 'deltaTime', deltaTime );
  glCat.uniform3fv( 'cameraPos', cameraPos );
  glCat.uniform1f( 'cameraRot', cameraRot );
  glCat.uniform1f( 'cameraFov', cameraFov );
  glCat.uniform1f( 'particlesSqrt', particlesSqrt );
  glCat.uniform1f( 'particlePixels', particlePixels );
  glCat.uniform1f( 'frame', frame % frames );
  glCat.uniform1f( 'frames', frames );
  glCat.uniform1i( 'blockSize', 8 );
  glCat.uniform1f( 'vertsPerParticle', vertsPerParticle );
} );

path.add( {
  particlesComputeReturn: {
    width: particlesSqrt * particlePixels,
    height: particlesSqrt,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/return.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'texture', path.fb( "particlesCompute" ).texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },

  particlesCompute: {
    width: particlesSqrt * particlePixels,
    height: particlesSqrt,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/particles-compute.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'textureReturn', path.fb( "particlesComputeReturn" ).texture, 0 );
      glCat.uniformTexture( 'textureRandom', textureRandom, 1 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  particlesRender: {
    width: width,
    height: height,
    vert: glslify( './shader/particles-render.vert' ),
    frag: glslify( './shader/particles-render.frag' ),
    blend: [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ],
    func: () => {
      glCat.clear( ...bgColor );

      glCat.attribute( 'vuv', vboParticle, 3 );
      glCat.uniform1i( 'depth', false );
      glCat.uniform2fv( 'resolutionPcompute', [ particlesSqrt * particlePixels, particlesSqrt ] );
      glCat.uniformTexture( 'texturePcompute', path.fb( "particlesCompute" ).texture, 0 );
      glCat.uniformTexture( 'textureOctahedronPos', textureOctahedronPos, 1 );
      glCat.uniformTexture( 'textureOctahedronNor', textureOctahedronNor, 2 );

      glCat.uniform4fv( 'fgColor', fgColor );
      glCat.uniform4fv( 'bgColor', bgColor );
      gl.drawArrays( gl.TRIANGLES, 0, particles * vertsPerParticle );
    }
  },
  
  おたくはすぐポストエフェクトを挿す: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/post.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform2fv( 'loadingScale', [ auto( 'loadingScaleX' ), auto( 'loadingScaleY' ) ] );
      glCat.uniformTexture( 'sampler0', path.fb( path.prev ).texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  jpegCosine: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/jpeg-cosine.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'sampler0', path.fb( path.prev ).texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
    
  jpegRender: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/jpeg-render.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1f( 'highFreqMultiplier', auto( "jpegHigh" ) );
      // glCat.uniform1f( 'dataThreshold', 0.04 );
      glCat.uniform1f( 'dataLofi', auto( "jpegLofi" ) );
      glCat.uniformTexture( 'sampler0', path.fb( path.prev ).texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  pixelsortCompare: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/pixelsort-compare.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1f( 'threshold', auto( "pixelsortThreshold" ) );
      glCat.uniformTexture( 'sampler0', path.fb( path.prev ).texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  pixelsortRender: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/pixelsort-render.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'sampler0', path.fb( "jpegRender" ).texture, 0 );
      glCat.uniformTexture( 'samplerMap', path.fb( path.prev ).texture, 1 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
} );

// ------

let updateUI = () => {
  let now = new Date();
  let deadline = new Date( 2017, 10, 28, 0, 0 );

  divCountdown.innerText = "Deadline: " + Math.floor( ( deadline - now ) / 1000 );

  divFrame.innerText = "Frames: " + totalFrame;
};

// ------

let update = () => {
  if ( frame % frames === 0 ) { xorshift( 79017846734887343443 ); }

  if ( !tweak.checkbox( 'play', { value: true } ) ) {
    setTimeout( update, 10 );
    return;
  }
  
  textureRandomUpdate( textureRandom );
  
  automaton.update( time );

  path.render( "particlesComputeReturn" );
  path.render( "particlesCompute" );
  path.render( "particlesRender" );
  path.render( "おたくはすぐポストエフェクトを挿す" );
  path.render( "jpegCosine" );
  if ( 0.0 !== auto( "どうするよ" ) ) {
    path.render( "pixelsortCompare" );
    path.render( "jpegCosine" );
  }
  path.render( "jpegRender" );
  path.render( "pixelsortCompare" );
  path.render( "pixelsortRender", null );

  cameraPos = [
    auto( 'cameraZ' ) * Math.sin( auto( 'cameraRot' ) ),
    0.0,
    auto( 'cameraZ' ) * Math.cos( auto( 'cameraRot' ) )
  ];

  bgColor = [
    0.72 * ( 1.0 - auto( 'altColor' ) ),
    0.02 * ( 1.0 - auto( 'altColor' ) ),
    0.06 * ( 1.0 - auto( 'altColor' ) ),
    1.0
  ];

  fgColor = [
    0.5 * auto( 'altColor' ),
    0.5 * auto( 'altColor' ),
    0.5 * auto( 'altColor' ),
    1.0
  ];

  updateUI();

  timeUpdate();

  if ( tweak.checkbox( 'save', { value: false } ) ) {
    saveFrame();
  }
  
  requestAnimationFrame( update );
};

// ------

step( {
  0: ( done ) => {
    update();
  }
} );

window.addEventListener( 'keydown', ( _e ) => {
  if ( _e.which === 27 ) {
    tweak.checkbox( 'play', { set: false } );
  }
} );

window.addEventListener( 'mousemove', event => {
  mouseX = event.clientX;
  mouseY = event.clientY;
} );