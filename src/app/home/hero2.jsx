"use client"

import axios from "axios";
import Card from "../components/card";
import { baseUrl } from "../api/api";


const Hero2 = () => {
    return (
        <div className="px-8 mt-6">
            <div className="w-[1]">
                <Card />
            </div>
        </div>
    );
}

export default Hero2;