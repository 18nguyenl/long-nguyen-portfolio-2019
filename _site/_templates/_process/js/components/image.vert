precision mediump float;
        
attribute vec3 normal;
attribute vec3 position;

varying vec3 vPosition;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;
uniform float uScrollEffect;

void main() {
  vec4 clipSpace = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vec2 uv = ((clipSpace.xy / clipSpace.w) + 1.0) / 2.0;
  vec4 pos = modelMatrix * vec4(position, 1.0);

  // pos.y += sin(pos.x + uTime * 50.) * 0.075;

  float rippleEffect = (0.125 * cos(1.5 * pos.x + uTime * 5.)) * (uScrollEffect / 40.0);
  // pos.x += rippleEffect / 20.0;
  pos.y += rippleEffect - (uScrollEffect * 0.005);

  gl_Position = projectionMatrix * viewMatrix * pos;

  vPosition = position;
}