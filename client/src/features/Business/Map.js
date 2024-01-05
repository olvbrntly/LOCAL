const MapComponent = ({lat,lng}) =>{
  return(
    <iframe src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`} title="title-test" width="500" height="270" ></iframe>
  )
}

export default MapComponent