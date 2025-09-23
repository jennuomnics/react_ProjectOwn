import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

import api from '../axios'
import axios, { isAxiosError } from "axios";



interface childElements {
    children:React.ReactNode
}

interface FlatContextType {
  flats: flatsSchema[];
  isLoading: boolean;
  error: string;
  getFlats: () => Promise<void>;
  addFlat: (newFlat: flatsSchema) => Promise<void>;
  updateFlat: (updateFlat: flatsSchema) => Promise<void>;
  deleteFlat: (id: number) => Promise<void>;
}


export interface flatsSchema {
    id?:number,
    title:string,
    location:string,
    description:string,
    imageUrl:string,
    price:number
}

interface flatsStructure {
    flats:flatsSchema[],
    isLoading:boolean,
    error:string,
    
}

const initialState = {
    flats:[],
    isLoading:false,
    error:''
}



type Action = {type:'addPlots',payload:flatsSchema[]} | {type:'addPlot',payload:flatsSchema} 
| {type:'deletePlot',payload:number}
| {type:'updatePlot',payload:flatsSchema}
| {type:'loading'}
| {type:'error',payload:string}


const flatContext = createContext<FlatContextType | null >(null);

const reducer = (state:flatsStructure,action:Action) => {
    switch (action.type) {
      case "addPlots":
        return { ...state, flats: action.payload };
      case "addPlot":
        return { ...state, flats: [...state.flats,action.payload] };
      case "deletePlot":
        return {
          ...state,
          flats: state.flats.filter((item) => item.id !== action.payload),
        };
      case "updatePlot":
        return {
          ...state,
          flats: state.flats.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...action.payload,
              };
            }
            return item;
          }),
        };
      case "loading":
        return { ...state, isLoading: !state.isLoading };
      case "error":
        return { ...state, error: action.payload };
      default:
        throw new Error("switch Case Does not matched");
    }
}

const FlatContext = ({children}:childElements) => {

    const [state,dispatch] = useReducer(reducer,initialState)


    const getFlats = async():Promise<void> => {
        try{
            const response = await api.get('/flats')
            dispatch({type:'addPlots',payload:response.data})
           
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
            dispatch({type:'error',payload:error.response?.data?.message})
            
            }
        }
    }

    const addFlat = async(newFlat:flatsSchema):Promise<void> => {
        try {
            const response = await api.post('/flats',newFlat)
            dispatch({type:'addPlot',payload:response.data})
             toast.success("Flat Had Successfully");
        }
        catch(error) {
             if(axios.isAxiosError(error)) {
            dispatch({type:'error',payload:error.response?.data?.message})
            toast.success("Error Occured while Adding the File");
            }
        }
    }

    const deleteFlat = async(id:number):Promise<void> => {
         try {
            const response = await api.delete(`/flats/${id}`)
            dispatch({type:'deletePlot',payload:id})
            toast.success("Flat has Deleted ");
        }
        catch(error) {
             if(axios.isAxiosError(error)) {
            dispatch({type:'error',payload:error.response?.data?.message})
            toast.error("Error has Occured while deleting flat");
            }
        }
    }

    const updateFlat = async(updateFlat:flatsSchema):Promise<void> => {
         try {
            const response = await api.put(`/flats/${updateFlat.id}`,updateFlat)
            dispatch({type:'updatePlot',payload:updateFlat})
            toast.success("Flat has updated");
        }
        catch(error) {
             if(axios.isAxiosError(error)) {
            dispatch({type:'error',payload:error.response?.data?.message})
             toast.success("error Occured while updating the File");
            }
        }
    }



   return (
    <flatContext.Provider
        value={{
            ...state,
            getFlats,
            addFlat,
            updateFlat,
            deleteFlat
        }}
    >
        {children}
    </flatContext.Provider>
   )
}


const useFlats = () => {
    const useConsumer = useContext(flatContext)
     if (!useConsumer) {
       throw new Error("useFlats must be used within a FlatProvider");
     }
    return useConsumer
}

export {FlatContext,useFlats}