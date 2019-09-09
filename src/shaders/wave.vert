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

    float rippleEffect = -( cos(1.5 * vertexPosition.x) + sin(vertexPosition.y * 12.3)) * (uPower / 25.0);
      // vertexPosition.x += rippleEffect / 20.0;
      vertexPosition.y += rippleEffect / 4.0 - (uPower / 50.0);

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    // set the varyings
    vTextureCoord = aTextureCoord;
    vVertexPosition = vertexPosition;
}