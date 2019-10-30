#ifdef GL_ES
precision mediump float;
#endif

// get our varyings
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

// the uniform we declared inside our javascript
uniform float uTime;
uniform float uScrollEffect;

// our texture sampler (default name, to use a different name please refer to the documentation)
uniform sampler2D uSampler0;

void main() {
    // get our texture coords
    vec2 textureCoord = vTextureCoord;

    // displace our pixels along both axis based on our time uniform and texture UVs
    // this will create a kind of water surface effect
    // try to comment a line or change the constants to see how it changes the effect
    // reminder : textures coords are ranging from 0.0 to 1.0 on both axis
    const float PI = 3.141592;

    // textureCoord.x += (
    //     sin(textureCoord.x * 10.0 + ((uTime * (PI / 3.0)) * 0.031))
    //     + sin(textureCoord.y * 10.0 + ((uTime * (PI / 2.489)) * 0.017))
    //     ) * 0.0075;

    // textureCoord.y += (
    //     sin(textureCoord.y * 20.0 + ((uTime * (PI / 2.023)) * 0.023))
    //     + sin(textureCoord.x * 20.0 + ((uTime * (PI / 3.1254)) * 0.037))
    //     ) * 0.0125;

    vec2 red_channel = textureCoord;
    vec2 green_channel = textureCoord;
    vec2 blue_channel = textureCoord;

    red_channel.y += uScrollEffect * 0.004;
    blue_channel.y -= uScrollEffect * 0.003;

    vec3 channel_shift = vec3(texture2D(uSampler0, red_channel).r, texture2D(uSampler0, green_channel).g, texture2D(uSampler0, blue_channel).b);

    gl_FragColor = vec4(channel_shift, 1.0);
}