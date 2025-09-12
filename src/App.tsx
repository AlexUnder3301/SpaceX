import { useEffect, useReducer, memo, useCallback } from 'react'
import LaunchCard from './LaunchCard/LaunchCard'
import LaunchModal from './LaunchModal/LaunchModal'
import { MantineProvider } from '@mantine/core'
import './App.css'
import ky from 'ky'
import '@mantine/core/styles.css';
import type { ReducerActionType, LaunchType, StateType, ServerLaunchResponse} from './types'

const reducer = (state: StateType, {type, payload}: ReducerActionType) => {
  switch (type) {
    case 'setShowModal':
      return {
        ...state,
        showModal: payload
      };
    case 'setCurrentLaunch':
      return {
        ...state,
        currentLaunch: payload
      };
    case 'setLaunches':
      return {
        ...state,
        launches: payload
      };
    case 'setIsLoading':
      return {
        ...state,
        isLoading: payload
      };
    case 'setError': 
      return {
        ...state,
        error: payload
      }
    default:
      return state;
  }
}

const initialState = {
  currentLaunch: null,
  showModal: false,
  launches: [],
  isLoading: true,
  error: false
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currentLaunch, showModal, launches, isLoading, error } = state
  const MemoizedLaunchCard = memo(LaunchCard);

const getData = useCallback(async () => {
    try {
      const data = await ky.get('https://api.spacexdata.com/v3/launches?launch_year=2020')
      .json<ServerLaunchResponse[]>()

      const launches: LaunchType[] = data.map((item) => {
      return {
        patch: item.links?.mission_patch,
        smallPatch: item.links?.mission_patch_small,
        name: item.mission_name,
        rocket: item.rocket?.rocket_name,
        details: item.details
      }
    })

        dispatch({type: 'setLaunches', payload: launches})
        dispatch({type: 'setError', payload: false})
        dispatch({type: 'setIsLoading', payload: false})
      } catch {
        dispatch({type: 'setIsLoading', payload: false})
        dispatch({type: 'setError', payload: true})
      }
    }, [])

  useEffect(() => {
    getData()
  }, [getData])
  
  const handleModalSwitch = () => {
    dispatch({type: 'setShowModal', payload: !showModal})
  }

  const handleModalOpen = (name: string) => {
    const currentLaunchObj = launches.find(item => item.name === name)
    
    if (currentLaunchObj) {
      dispatch({type: 'setCurrentLaunch', payload: currentLaunchObj})
      handleModalSwitch()
    }
  }
  
  const handleRetry = () => {
    dispatch({type: 'setIsLoading', payload: true})
    getData()
  }

  return (
    <MantineProvider>
      {isLoading ? (
       <div>Loading...</div>
       ) : error ? (
        <div>
          <h3>An error occured while requesting data</h3>
          <button className='retry-button' onClick={() => {handleRetry()}}>Retry</button>
        </div>
       ) : (
        <div>
          <h1>SpaceX Launches 2020</h1>
          <div className='container'>
          {launches.map((item) => {
            return <MemoizedLaunchCard handleModalOpen={handleModalOpen} key={item.name} patch={item.smallPatch} name={item.name} rocketName={item.rocket} />
          })}   
          </div>
      
          {showModal && currentLaunch && <LaunchModal onClick={handleModalSwitch} patch={currentLaunch.patch} name={currentLaunch.name} rocket={currentLaunch.rocket} details={currentLaunch.details} /> }
        </div>
       )}
      
    </MantineProvider>
  )
}

export default App
