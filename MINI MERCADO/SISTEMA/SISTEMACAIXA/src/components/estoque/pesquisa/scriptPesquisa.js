import axios from "axios";
import { useState } from "react";
export default function useScripPesquisa() {

    const url_base = 'http://localhost:3001/';
    const [mensagem, set_mensagem] = useState("")
    const [value, set_value] = useState("")


    const handlePesquisar = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${url_base}search-products?query=${value}`);
            if (response.status === 200) {
                // console.log(response.data.products)
                //    set_table(response.data.products)
                //    console.log(response.data.products)
            } else {
                // set_mensagem(response.data.products)
                console.log(response.data.message)
            }
        } catch (error) {
            set_mensagem(error.response.data.message)
            console.log(error)
        }
    };

    const inputChange = (value) => {
        set_mensagem('');
        if (value.length >= 0) { }
    };

    return { handlePesquisar, inputChange, mensagem, value, set_value, }
}