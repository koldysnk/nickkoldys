export class VertexArray {
    constructor(program, attributes, gl) {
      this.gl = gl
      this.vertexArray = this.gl.createVertexArray();
      this.attributes = attributes;
  
      this.gl.bindVertexArray(this.vertexArray);
      for (let attribute of attributes) {
        let location = program.getAttributeLocation(attribute.name);
        if (location < 0) {
          console.log(`${attribute.name} is not used in the shader.`);
        } else {
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attribute.buffer);
          this.gl.vertexAttribPointer(location, attribute.ncomponents, this.gl.FLOAT, false, 0, 0);
          this.gl.enableVertexAttribArray(location);
        }
      }
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, attributes.indexBuffer);
  
      this.unbind();
    }
  
    bind() {
      this.gl.bindVertexArray(this.vertexArray);
      this.isBound = true;
    }
  
    destroy() {
      this.gl.deleteVertexArray(this.vertexArray);
    }
  
    unbind() {
      this.gl.bindVertexArray(null);
      this.isBound = false;
    }
  
    drawSequence(mode) {
      this.gl.drawArrays(mode, 0, this.attributes.vertexCount);
    }
  
    drawIndexed(mode) {
      // this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.indexBuffer);
      this.gl.drawElements(mode, this.attributes.indexCount, this.gl.UNSIGNED_INT, 0);
    }
  }