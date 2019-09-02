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

// if you want to pass your vertex and texture coords to the fragment shader
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

void main() {
    vec3 vertexPosition = aVertexPosition;

    float rippleEffect = cos(vertexPosition.x * uTime / 10.0) / 3.0;
    float rippleEffect2 = cos(vertexPosition.y * uTime / 10.0) / 10.0;

    // vertexPosition.y += rippleEffect / 10.0;
    // vertexPosition.x += rippleEffect2 / 5.0;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    // set the varyings
    vTextureCoord = aTextureCoord;
    vVertexPosition = vertexPosition;
}