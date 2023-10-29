import { useState } from "react";

const SingleCard = ({ card, handleChoice, flipped }) => {

    const ChoiceChange = () => {
        handleChoice(card);
    }
    console.log(flipped);
    return (
        <>
            <div className='card' >
                <div className={flipped ? 'flipped' : ''}>

                    <img className='card-img' src={card.src} alt='card' />

                    <img className='cover' src='/img/cover.png' alt='cover' onClick={() => ChoiceChange()} />

                </div>
            </div >
        </>
    );
}

export default SingleCard;
