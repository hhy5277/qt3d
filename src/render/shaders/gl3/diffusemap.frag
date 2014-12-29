#version 150 core

// TODO: Replace with a uniform block
uniform vec4 lightPosition = vec4(0.0, 0.0, 0.0, 1.0);
uniform vec3 lightIntensity = vec3(1.0, 1.0, 1.0);

// TODO: Replace with a struct
uniform vec3 ka;            // Ambient reflectivity
uniform vec3 ks;            // Specular reflectivity
uniform float shininess;    // Specular shininess factor

uniform sampler2D diffuseTexture;

in vec3 position;
in vec3 normal;
in vec2 texCoord;

out vec4 fragColor;

vec3 adsModel( const in vec3 pos, const in vec3 n )
{
    // Calculate the vector from the light to the fragment
    vec3 s = normalize( vec3( lightPosition ) - pos );

    // Calculate the vector from the fragment to the eye position
    // (origin since this is in "eye" or "camera" space)
    vec3 v = normalize( -pos );

    // Reflect the light beam using the normal at this fragment
    vec3 r = reflect( -s, n );

    // Calculate the diffuse component
    float diffuse = max( dot( s, n ), 0.0 );

    // Calculate the specular component
    float specular = 0.0;
    if ( dot( s, n ) > 0.0 )
        specular = pow( max( dot( r, v ), 0.0 ), shininess );

    // Lookup diffuse color
    vec3 diffuseColor = texture( diffuseTexture, texCoord ).rgb;

    // Combine the ambient, diffuse and specular contributions
    return lightIntensity * ( ( ka + diffuse ) * diffuseColor + ks * specular );
}

void main()
{
    fragColor = vec4( adsModel( position, normalize( normal ) ), 1.0 );
    //fragColor = vec4( texCoord.s, texCoord.t, 0.0, 1.0 );
}
