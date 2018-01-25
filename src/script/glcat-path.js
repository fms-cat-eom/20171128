const glslify = require( 'glslify' );

let requiredFields = ( object, nanithefuck, fields ) => {
  fields.map( field => {
    if ( typeof object[ field ] === "undefined" ) {
      throw "GLCat-Path: " + field + " is required for " + nanithefuck;
    }
  } );
};

let Path = class {
  constructor( glCat ) {
    let it = this;

    it.glCat = glCat;
    it.gl = glCat.gl;

    it.paths = {};
    it.globalFunc = () => {};
    it.prev = null;
  }

  add( paths ) {
    let it = this;

    for ( let name in paths ) {
      let path = paths[ name ];
      requiredFields( path, "path object", [
        "width",
        "height",
        "vert",
        "frag",
        "blend",
        "func"
      ] );
      it.paths[ name ] = path;
      
      path.framebuffer = it.glCat.createFloatFramebuffer( path.width, path.height );
      path.program = it.glCat.createProgram( path.vert, path.frag );
    }
  }

  render( name, out ) {
    let it = this;

    let path = it.paths[ name ];
    
    it.gl.viewport( 0, 0, path.width, path.height );
    it.glCat.useProgram( path.program );
    it.gl.bindFramebuffer( it.gl.FRAMEBUFFER, typeof out !== "undefined" ? out : path.framebuffer.framebuffer );
    it.gl.blendFunc( ...path.blend );
    if ( path.clear ) { it.glCat.clear( ...path.clear ); }

    it.glCat.uniform2fv( 'resolution', [ path.width, path.height ] );
    it.globalFunc();
    path.func();

    it.prev = name;
  }

  setGlobalFunc( func ) { this.globalFunc = func; }

  fb( name ) { return this.paths[ name ].framebuffer; }
};

export default Path;