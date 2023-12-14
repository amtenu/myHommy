import { useState } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {GOOGLE_PLACES_KEY} from '../../config/config'

export default function AdForm({ action, type }) {
  const [ad,setAd]=useState({
    photos:[],
    uploading:false,
    price:'',
    address:'',
    bedroom:'', 
    bathroom:'',
    carPark:'',
    landsize:'',
    basement:false,
    garage:false,
    title:'',
    description:'',
    loading:false
  })
  return (
    <>
      <p>This is ad create form</p>
      {action}/{type}
    </>
  );
}
