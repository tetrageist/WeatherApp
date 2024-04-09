import React, { useState, useEffect } from 'react';

const Search = ( { setLocation} ) => {
  const [strLoc, changeStrLoc] = useState("");
  const [strResp, changeStrResp] = useState( ( <div> ... </div> ) );
 // const [location, setLocation] = useState({});



  useEffect( () => {
    const fnClickOnPlace = ( magic ) => {
      fetch( "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?magicKey=" + magic +"&f=json" )
        .then( (response) => response.json() )
        .then( (json) => {
          if( json.locations && json.locations[0] )
          {
            const l = json.locations[0];
            console.log( l.feature.geometry.y + " " + l.feature.geometry.x );
            setLocation( {
              latitude: l.feature.geometry.y,
              longitude: l.feature.geometry.x,
            });
          }
          } );
    };

    fetch( "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&text=" + strLoc )
      .then( (response) => response.json() )
      .then( (json) => {
        const children = json.suggestions != null ? json.suggestions.map((val) => (
          <button id={val.magicKey} onClick={ e => fnClickOnPlace(e.target.id) } className='bg-primary rounded-2xl px-4 py-2 m-1 hover:rounded text-white hover:bg-blue-900 transition-all duration-400 ease-linear cursor-pointer shadow'>{val.text}</button>
        )) : ( <div></div> );
        changeStrResp( children );
      } );
  },[strLoc, setLocation])


  let ret = (
    <div className="px-6 py-4 pb-6 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 border rounded-xl pl-3 justify-center bg-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        
        <input
          className="border border-primary rounded-r-xl p-2"
          value={strLoc} onChange={ e => changeStrLoc( e.target.value ) }
          placeholder="search anywhere..."
        />
      </div>
      <div> { strResp } </div> 
    </div>
  );
  
  return ret;
};

export default Search;
