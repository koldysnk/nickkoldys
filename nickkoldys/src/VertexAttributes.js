export class VertexAttribute {
    constructor(gl,name, nvertices, ncomponents, floats) {
      this.gl = gl
      this.name = name;
      this.nvertices = nvertices;
      this.ncomponents = ncomponents;
  
      this.buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(floats), this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }
  
    destroy() {
      this.gl.deleteBuffer(this.buffer);
    }
  }
  
  export class VertexAttributes {
    constructor(gl) {
      this.gl = gl
      this.nvertices = -1;
      this.indexBuffer = null;
      this.attributes = [];
    }
  
    addAttribute(name, nvertices, ncomponents, floats) {
      if (this.nvertices >= 0 && nvertices != this.nvertices) {
        throw "Attributes must have same number of vertices.";
      }
  
      this.nvertices = nvertices;
      let attribute = new VertexAttribute(this.gl,name, nvertices, ncomponents, floats);
      this.attributes.push(attribute);
    }
  
    addIndices(ints) {
      this.indexCount = ints.length;
      this.indexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(ints), this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }
  
    destroy() {
      for (let attribute of this.attributes) {
        attribute.destroy();
      }
  
      if (this.indexBuffer) {
        this.gl.deleteBuffer(this.indexBuffer);
      }
    }
  
    [Symbol.iterator]() {
      return this.attributes.values();
    }
  
    get vertexCount() {
      return this.nvertices;
    }
  }