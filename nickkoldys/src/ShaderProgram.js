export class ShaderProgram {
    constructor(vertexSource, fragmentSource,gl, version = 300, precision = 'mediump') {
      this.gl = gl

      // Compile.
      this.vertexShader = this.compileSource(this.gl.VERTEX_SHADER, `#version ${version} es\n${vertexSource}`);
      this.fragmentShader = this.compileSource(this.gl.FRAGMENT_SHADER, `#version ${version} es\nprecision ${precision} float;\n${fragmentSource}`);
  
      // Link.
      this.program = this.gl.createProgram();
      this.gl.attachShader(this.program, this.vertexShader);
      this.gl.attachShader(this.program, this.fragmentShader);
      this.gl.linkProgram(this.program);
  
      let isOkay = this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS);
      if (!isOkay) {
        let message = this.gl.getProgramInfoLog(this.program);
        this.gl.deleteProgram(this.program);
        throw message;
      }
  
      // Query uniforms.
      this.uniforms = {};
      let nuniforms = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < nuniforms; ++i) {
        let uniform = this.gl.getActiveUniform(this.program, i);
        let location = this.gl.getUniformLocation(this.program, uniform.name);
        this.uniforms[uniform.name] = location;
      }
  
      this.unbind();
    }
  
    destroy() {
      this.gl.deleteShader(this.vertexShader);
      this.gl.deleteShader(this.fragmentShader);
      this.gl.deleteProgram(this.program);
    }
  
    compileSource(type, source) {
      let shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
  
      let isOkay = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
      if (!isOkay) {
        let message = this.gl.getShaderInfoLog(shader);
        this.gl.deleteShader(shader);
        throw message;
      }
  
      return shader;
    }
  
    getAttributeLocation(name) {
      return this.gl.getAttribLocation(this.program, name);
    }
  
    bind() {
      this.gl.useProgram(this.program);
      this.isBound = true;
    }
  
    unbind() {
      this.gl.useProgram(null);
      this.isBound = false;
    }
  
    setUniformMatrix4(name, matrix) {
      this.gl.uniformMatrix4fv(this.uniforms[name], false, matrix.toBuffer());
    }
  
    setUniform1f(name, value) {
      this.gl.uniform1f(this.uniforms[name], value);
    }
  
    setUniform2f(name, a, b) {
      this.gl.uniform2f(this.uniforms[name], a, b);
    }
  }
  