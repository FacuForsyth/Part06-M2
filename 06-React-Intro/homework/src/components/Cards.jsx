import React from 'react'
import Card from './Card'

export default function Cards(props) {
  // acá va tu código
  // tip, podés usar un map
  if(!props.cities){
    return <h1>No hay ciudades disponibles</h1>
  }
  return (
    <div>
      {
        props.cities && props.cities.map(city => (    //si existe props.cities && = se va a ejecutar el map
          <Card
            key={city.id}     //react siempre pide un key
            max={city.main.temp_max}  // sale de App.js pero hay que cambiar por la funcion city
            min={city.main.temp_min}
            name={city.name}
            img={city.weather[0].icon}
            onClose={() => alert(city.name)}
          />
        ))  
      }
    </div>
  )
};