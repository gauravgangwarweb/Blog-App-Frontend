"use client"

import React, { use, useEffect, useState } from "react";

const Hero1 = () => {
    const [quote, setQuote] = useState(undefined)
    const quotesArray = [
        "Embrace the beauty of imperfection, for it is through our flaws that we find authenticity.",
        "The greatest adventure begins when you step outside your comfort zone and explore the unknown.",
        "In a world full of noise, be the voice that resonates with truth and inspires change.",
        "Success is not measured by the number of followers, but by the impact you have on their lives.",
        "Dare to dream, and then work tirelessly to turn those dreams into reality.",
        "Embrace failure as a stepping stone to success, for it is in our mistakes that we learn and grow.",
        "Find your passion, chase it with determination, and watch your dreams turn into a captivating reality.",
        "Every story has the power to touch hearts and change lives. Share yours with the world.",
        "Be a beacon of light in a world that sometimes feels dark. Inspire others with your words and actions.",
        "In a world of comparisons, find your unique voice and let it shine brightly through your writing.",
        "Seek inspiration in the ordinary, for there is beauty to be found in the simplest moments of life.",
        "The pen is mightier than the sword. Use your words to ignite change and create a better world.",
        "Your story matters. Share it bravely, for your words have the power to touch hearts and change lives.",
        "Don't be afraid to stand out from the crowd. Be authentically yourself, and let your blog reflect your true essence.",
    ]

    const randomQuote = (arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length)

        return arr[randomIndex]
    }

    useEffect(() => {
        const temp = randomQuote(quotesArray)
        setQuote(temp)
    })

    return (
        <div className="px-8 pt-24">
            <div className="w-[1] h-[75vh] cover hidden md:flex justify-start items-center pl-5">
                <p className="text-[30px] w-[65%] caveat text-center">"{quote}"</p>
                <div></div>
            </div>
        </div>
    );
}

export default Hero1;