// https://www.robinwieruch.de/react-hooks-fetch-data
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

import axios from 'axios'

import { baseURLAPI, unitsAPI, langAPI } from './URLAPI'


const useWeatherAPI = () => {
    const history = useHistory();
    const [cityAPI, setCityAPI] = useState('')

    // const keyAPI = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
    const keyAPI = '19bf54806da80afdc27f3660b45b2382'

    const [apiDataCurrentWeather, setApiDataCurrentWeather] = useState(null)
    const [isLoadingCurrentWeather, setIsLoadingCurrentWeather] = useState(false)
    const [isErrorCurrentWeather, setIsErrorCurrentWeather] = useState(false)

    const [apiDataForecastWeek, setApiDataForecastWeek] = useState(null)
    const [isLoadingForecastWeek, setIsLoadingForecastWeek] = useState(false)
    const [isErrorForecastWeek, setIsErrorForecastWeek] = useState(false)

    React.useEffect(() => {
        const fetchDataCurrentWeather = async () => {
            setIsErrorCurrentWeather(false)
            setIsLoadingCurrentWeather(true)
            try {
                const result = await axios(
                    'https://' + baseURLAPI + 'weather?q=' + cityAPI + '&APPID=' + keyAPI + '&units=' + unitsAPI + '&lang=' + langAPI
                )
                setApiDataCurrentWeather(result.data)
                fetchDataWeek()
            } catch (error) {
                setIsErrorCurrentWeather(true)
            }
            setIsLoadingCurrentWeather(false)
        }

        const fetchDataWeek = async () => {
            setIsErrorForecastWeek(false)
            setIsLoadingForecastWeek(true)
            try {
                const result = await axios(
                    'https://' + baseURLAPI + 'forecast?q=' + cityAPI + '&APPID=' + keyAPI + '&units=' + unitsAPI + '&lang=' + langAPI
                )
                setApiDataForecastWeek(result.data)
            } catch (error) {
                setIsErrorForecastWeek(true)
            }
            setIsLoadingForecastWeek(false)
            history.push({pathname: '/' + cityAPI})
        }

        cityAPI !== '' && fetchDataCurrentWeather()
    }, [cityAPI, keyAPI, history])

    return [{
        apiDataCurrentWeather,
        isLoadingCurrentWeather,
        isErrorCurrentWeather,
        apiDataForecastWeek,
        isLoadingForecastWeek,
        isErrorForecastWeek,
        }, setCityAPI
    ]
}

export default useWeatherAPI