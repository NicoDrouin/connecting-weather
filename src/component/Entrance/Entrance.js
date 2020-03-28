import React from 'react'

import CityInput from '../CityInput'


const Entrance = ({
        currentCity,
        setCurrentCity,
        apiDataCurrentDay,
        isLoadingCurrentDay,
        isErrorCurrentDay,
        doFetch
    }) => {

    return (
        <main className='entrance'>
            <section className='search-box'>
                <CityInput
                    currentCity = {currentCity}
                    setCurrentCity = {setCurrentCity}
                    doFetch = {doFetch}
                />
                <p className='error-messages'>
                    {isErrorCurrentDay && 'Erreur! Vérifiez votre aurtograffe !!!'}
                </p>
            </section>
            {/* {isLoadingCurrentDay ? 'isLoadingCurrentDay' : 'isNotLoadingCurrentDay'}<br/> */}
        </main>
    )
}

export default Entrance