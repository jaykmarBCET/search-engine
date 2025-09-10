import type { AIAnswerResponse, MovieResult } from '@/types/types'
import {create} from 'zustand'
import axios from 'axios';
interface SearchEngineInfo{
    answer:string|null;
    movieResult:MovieResult[] | [];
    image:string | null;
    webSearchResponse:AIAnswerResponse| null;
    isLoading:boolean;
    searchQuery:(query:string)=>Promise<void>;
}

type SearchEngineResponse =
  | string
  | {
      movieSearchData?: MovieResult[];
      webSearchData?: AIAnswerResponse;
      image?:string;
    };

export const useSearchEngine = create<SearchEngineInfo>((set)=>({
    answer:null,
    movieResult:[],
    webSearchResponse:null,
    image:null,
    isLoading:false,
    searchQuery:async(query)=>{
        set({isLoading:true})
        try {
            const response = await axios.get<SearchEngineResponse>(`https://x2l757-3000.csb.app/search-engine?query=${encodeURI(query)}`)

            if(response.status>=400){
                throw Error("Search Time Error")
            }
            set({answer:"",webSearchResponse:null,movieResult:[],image:null})
            if(typeof response.data === 'string'){
                set({answer:response.data})
                return
            }

            if(response.data.movieSearchData){
                set({movieResult:response.data.movieSearchData})
            }
            if(response.data.webSearchData){
                set({webSearchResponse:response.data.webSearchData})
            }
            if(response.data.image){
                set({image:response.data.image})
            }

            
        } catch (error) {
            console.log(error)
        }finally{
            set({isLoading:false})
        }

    }
}))