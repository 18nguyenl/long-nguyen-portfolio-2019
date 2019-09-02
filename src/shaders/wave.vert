#ifdef GL_ES
precision mediump float;
#endif

// those are the mandatory attributes that the lib sets
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

// those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float uTime;
uniform float uPower;

// if you want to pass your vertex and texture coords to the fragment shader
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

void main() {
    vec3 vertexPosition = aVertexPosition;

    float rippleEffect = 0.1 * pow(vertexPosition.x, 2.0) * (uTime / 20.0) * uPower / 20.0;
      // vertexPosition.x += rippleEffect / 20.0;
      vertexPosition.y += rippleEffect / 30.0 - uPower / 150.0;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    // set the varyings
    vTextureCoord = aTextureCoord;
    vVertexPosition = vertexPosition;
}